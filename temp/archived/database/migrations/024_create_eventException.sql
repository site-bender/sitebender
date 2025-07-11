-- Exception table with CASCADE delete
CREATE TABLE "eventException" (
  "id" UUID PRIMARY KEY,
  "eventId" UUID NOT NULL REFERENCES "event"("id") ON DELETE CASCADE,
  "originalOccurrenceAt" TIMESTAMPTZ NOT NULL,
  "newStartAt" TIMESTAMPTZ,
  "newEndAt" TIMESTAMPTZ,
  "modifiedProperties" JSONB DEFAULT '{}',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT "validException" CHECK (
    ("newStartAt" IS NULL AND "newEndAt" IS NULL) OR -- Cancellation
    ("newStartAt" IS NOT NULL AND "newEndAt" IS NOT NULL) -- Reschedule
  ),

  CONSTRAINT "unique_event_occurrence" UNIQUE ("eventId", "originalOccurrenceAt")
);

-- Table comment
COMMENT ON TABLE "eventException" IS
'Stores modifications to specific occurrences of recurring events.
Includes cancellations (null times), reschedules, and property overrides.';

-- Column comments
COMMENT ON COLUMN "eventException"."id" IS 'Primary key, UUIDv4';
COMMENT ON COLUMN "eventException"."eventId" IS 'Reference to parent recurring event';
COMMENT ON COLUMN "eventException"."originalOccurrenceAt" IS 'Original UTC time of the modified instance';
COMMENT ON COLUMN "eventException"."newStartAt" IS 'Rescheduled start time (null if cancelled)';
COMMENT ON COLUMN "eventException"."newEndAt" IS 'Rescheduled end time (null if cancelled)';
COMMENT ON COLUMN "eventException"."modifiedProperties" IS 'JSON overrides for this instance (location, description, etc.)';
COMMENT ON COLUMN "eventException"."createdAt" IS 'When the exception was created';

-- Constraint comments
COMMENT ON CONSTRAINT "validException" ON "eventException" IS
'Ensures exceptions are either complete cancellations (null times) or proper reschedules (both times set)';

COMMENT ON CONSTRAINT "unique_event_occurrence" ON "eventException" IS
'Prevents duplicate exceptions for the same event occurrence';

-- Indexes
CREATE INDEX "idx_eventException_event" ON "eventException" ("eventId");

CREATE INDEX "idx_eventException_originalTime" ON "eventException" ("originalOccurrenceAt");

CREATE INDEX "idx_eventException_newTimeRange" ON "eventException" ("newStartAt", "newEndAt")
WHERE "newStartAt" IS NOT NULL;

CREATE INDEX "idx_eventException_created" ON "eventException" ("createdAt");

-- GIN index for JSONB searching
CREATE INDEX "idx_eventException_metadata" ON "eventException" USING GIN ("modifiedProperties");

-- Partial index for cancellations
CREATE INDEX "idx_eventException_cancellations" ON "eventException" ("eventId")
WHERE "newStartAt" IS NULL;

-- Enable RLS
ALTER TABLE "eventException" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for eventException table
CREATE POLICY "Users can view exceptions for accessible events" ON "eventException"
FOR SELECT USING (
    "eventId" IN (
        SELECT id FROM "event"
        WHERE "memoir" IN (
            SELECT id FROM memoir
            WHERE audience = 'public'
            OR accountable IN (SELECT id FROM account WHERE owner = auth.uid())
            OR id IN (
                SELECT memoir FROM moderator
                WHERE account IN (SELECT id FROM account WHERE owner = auth.uid())
                AND (dateEnded IS NULL OR dateEnded > NOW())
            )
        )
    )
);

CREATE POLICY "Users can create exceptions for own events" ON "eventException"
FOR INSERT WITH CHECK (
    "eventId" IN (
        SELECT id FROM "event"
        WHERE "memoir" IN (
            SELECT id FROM memoir
            WHERE accountable IN (SELECT id FROM account WHERE owner = auth.uid())
        )
    )
);

CREATE POLICY "Users can update exceptions for own events" ON "eventException"
FOR UPDATE USING (
    "eventId" IN (
        SELECT id FROM "event"
        WHERE "memoir" IN (
            SELECT id FROM memoir
            WHERE accountable IN (SELECT id FROM account WHERE owner = auth.uid())
        )
    )
);

CREATE POLICY "Users can delete exceptions for own events" ON "eventException"
FOR DELETE USING (
    "eventId" IN (
        SELECT id FROM "event"
        WHERE "memoir" IN (
            SELECT id FROM memoir
            WHERE accountable IN (SELECT id FROM account WHERE owner = auth.uid())
        )
    )
);
