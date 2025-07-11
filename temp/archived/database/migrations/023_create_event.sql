-- Main event table with recurrence support
CREATE TABLE "event" (
  "id" UUID PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "startAt" TIMESTAMPTZ NOT NULL,
  "endAt" TIMESTAMPTZ NOT NULL,
  "timezone" TEXT NOT NULL,
  "isAllDay" BOOLEAN NOT NULL DEFAULT false,
  "isRecurring" BOOLEAN NOT NULL DEFAULT false,
  "rrule" TEXT,
  "rruleData" JSONB,
  "duration" INTERVAL,
  "dtstart" TIMESTAMPTZ,
  "until" TIMESTAMPTZ,
  "recurrenceEndsAt" TIMESTAMPTZ,
  "parentEvent" UUID REFERENCES "event"("id"),
  "memoir" UUID REFERENCES memoir(id) ON DELETE CASCADE,
  "extendedProperties" JSONB DEFAULT '{}',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT "validRecurrence" CHECK (
    ("isRecurring" = false AND "rrule" IS NULL AND "rruleData" IS NULL) OR
    ("isRecurring" = true AND ("rrule" IS NOT NULL OR "rruleData" IS NOT NULL))
  ),

  CONSTRAINT "validTimeRange" CHECK ("endAt" > "startAt")
);

-- Indexes for performance
CREATE INDEX "idx_event_start_time" ON "event" ("startAt");
CREATE INDEX "idx_event_timezone" ON "event" ("timezone");
CREATE INDEX "idx_event_recurring" ON "event" ("isRecurring") WHERE "isRecurring" = true;
CREATE INDEX "idx_event_memoir" ON "event" ("memoir");
CREATE INDEX "idx_event_rrule_data" ON "event" USING GIN ("rruleData") WHERE "isRecurring" = true;
CREATE INDEX "idx_event_until" ON "event" ("until") WHERE "until" IS NOT NULL;
CREATE INDEX "idx_event_dtstart" ON "event" ("dtstart") WHERE "dtstart" IS NOT NULL;

-- Table comment explaining purpose
COMMENT ON TABLE "event" IS
'Stores calendar events with support for simple and recurring instances.
Recurring events use iCalendar RRULE format (RFC 5545) for pattern definition.
All timestamps stored in UTC with original timezone preserved for display.';

-- Column comments
COMMENT ON COLUMN "event"."id" IS 'Primary key, UUIDv4';
COMMENT ON COLUMN "event"."title" IS 'Human-readable event title';
COMMENT ON COLUMN "event"."description" IS 'Optional detailed description';
COMMENT ON COLUMN "event"."startAt" IS 'UTC timestamp of event start';
COMMENT ON COLUMN "event"."endAt" IS 'UTC timestamp of event end';
COMMENT ON COLUMN "event"."timezone" IS 'IANA timezone (e.g. "America/New_York") for display';
COMMENT ON COLUMN "event"."isAllDay" IS 'Flag for all-day events';
COMMENT ON COLUMN "event"."isRecurring" IS 'Flag for recurring events';
COMMENT ON COLUMN "event"."rrule" IS 'iCalendar RRULE string for recurrence pattern';
COMMENT ON COLUMN "event"."rruleData" IS 'Parsed RRULE data as JSON for easier querying (freq, interval, byweekday, etc.)';
COMMENT ON COLUMN "event"."duration" IS 'Event duration calculated from endAt - startAt, used for recurring events';
COMMENT ON COLUMN "event"."dtstart" IS 'RRULE start date (may differ from startAt for display purposes)';
COMMENT ON COLUMN "event"."until" IS 'RRULE until date, extracted from RRULE for indexing';
COMMENT ON COLUMN "event"."recurrenceEndsAt" IS 'UTC timestamp when recurrence pattern ends';
COMMENT ON COLUMN "event"."parentEvent" IS 'Self-reference for event series/exceptions';
COMMENT ON COLUMN "event"."memoir" IS 'The memoir this event belongs to - establishes one-to-many relationship';
COMMENT ON COLUMN "event"."extendedProperties" IS 'Extended properties (locations, reminders, etc.)';
COMMENT ON COLUMN "event"."createdAt" IS 'Record creation timestamp';
COMMENT ON COLUMN "event"."updatedAt" IS 'Last modification timestamp';

-- Enable RLS
ALTER TABLE "event" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for event table
CREATE POLICY "Users can view events from accessible memoirs" ON "event"
FOR SELECT USING (
    "memoir" IN (
        SELECT id FROM memoir
        WHERE audience = 'public'
        OR accountable IN (SELECT id FROM account WHERE owner = auth.uid())
        OR id IN (
            SELECT memoir FROM moderator
            WHERE account IN (SELECT id FROM account WHERE owner = auth.uid())
            AND (dateEnded IS NULL OR dateEnded > NOW())
        )
    )
);

CREATE POLICY "Users can create events for own memoirs" ON "event"
FOR INSERT WITH CHECK (
    "memoir" IN (
        SELECT id FROM memoir
        WHERE accountable IN (SELECT id FROM account WHERE owner = auth.uid())
    )
);

CREATE POLICY "Users can update events in own memoirs" ON "event"
FOR UPDATE USING (
    "memoir" IN (
        SELECT id FROM memoir
        WHERE accountable IN (SELECT id FROM account WHERE owner = auth.uid())
    )
);

CREATE POLICY "Users can delete events from own memoirs" ON "event"
FOR DELETE USING (
    "memoir" IN (
        SELECT id FROM memoir
        WHERE accountable IN (SELECT id FROM account WHERE owner = auth.uid())
    )
);

-- Function to extract RRULE metadata
CREATE OR REPLACE FUNCTION "updateRRuleMetadata"() RETURNS TRIGGER AS $$
BEGIN
    IF NEW."rrule" IS NOT NULL AND NEW."isRecurring" = true THEN
        -- Calculate duration
        NEW."duration" = NEW."endAt" - NEW."startAt";

        -- Set dtstart (for RRULE this is typically the first occurrence)
        NEW."dtstart" = NEW."startAt";

        -- Extract UNTIL from RRULE string if present
        -- Simple regex extraction - business layer should populate rruleData with full parsing
        IF NEW."rrule" ~ 'UNTIL=([0-9]{8}T[0-9]{6}Z?)' THEN
            -- Extract and convert UNTIL value
            -- This is a simplified version - business layer should handle full parsing
            NEW."until" = NEW."recurrenceEndsAt";
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "triggerRRuleMetadata"
    BEFORE INSERT OR UPDATE ON "event"
    FOR EACH ROW
    EXECUTE FUNCTION "updateRRuleMetadata"();

COMMENT ON FUNCTION "updateRRuleMetadata" IS 'Automatically updates RRULE metadata fields when event is modified';
