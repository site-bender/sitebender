-- Event instance table for computed calendar instances
CREATE TABLE "eventInstance" (
    "eventId" UUID NOT NULL REFERENCES "event"("id") ON DELETE CASCADE,
    "occurrenceAt" TIMESTAMPTZ NOT NULL,
    "originalEndAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY ("eventId", "occurrenceAt")
);

COMMENT ON TABLE "eventInstance" IS 'Computed instances of events within the 3-month rolling window. Automatically maintained by triggers when events change.';
COMMENT ON COLUMN "eventInstance"."eventId" IS 'Reference to the parent event that generated this instance.';
COMMENT ON COLUMN "eventInstance"."occurrenceAt" IS 'The scheduled start time for this specific event instance (UTC).';
COMMENT ON COLUMN "eventInstance"."originalEndAt" IS 'The calculated end time for this instance before any exceptions are applied (UTC).';
COMMENT ON COLUMN "eventInstance"."createdAt" IS 'When this instance record was computed and stored.';

-- Indexes for performance
CREATE INDEX idx_eventInstance_eventId ON "eventInstance"("eventId");
CREATE INDEX idx_eventInstance_occurrenceAt ON "eventInstance"("occurrenceAt");
CREATE INDEX idx_eventInstance_timeRange ON "eventInstance"("occurrenceAt", "originalEndAt");

COMMENT ON INDEX idx_eventInstance_eventId IS 'Index on eventInstance.eventId for faster lookups by parent event.';
COMMENT ON INDEX idx_eventInstance_occurrenceAt IS 'Index on eventInstance.occurrenceAt for chronological queries and calendar views.';
COMMENT ON INDEX idx_eventInstance_timeRange IS 'Composite index for time-range queries (finding events within a date range).';

-- Enable RLS
ALTER TABLE "eventInstance" ENABLE ROW LEVEL SECURITY;

-- RLS policies for eventInstance table
CREATE POLICY "Users can view instances from accessible events" ON "eventInstance"
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

-- Only system functions should insert/update/delete instances
-- Users interact with the parent event table, not instances directly
CREATE POLICY "Only system can modify instances" ON "eventInstance"
FOR ALL USING (false);

-- Allow the event management functions to bypass RLS
-- This will be used by generateEventInstances() and related functions
CREATE POLICY "System functions can manage instances" ON "eventInstance"
FOR ALL USING (current_setting('role', true) = 'service_role');
