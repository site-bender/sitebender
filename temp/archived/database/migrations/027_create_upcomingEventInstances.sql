CREATE MATERIALIZED VIEW "upcomingEventInstances" AS
SELECT
  i."eventId" AS "id",
  e."title",
  e."description",  -- ADD THIS LINE
  e."timezone",
  e."isAllDay",
  i."occurrenceAt",
  COALESCE(
    exc."newStartAt",
    i."occurrenceAt"
  ) AS "actualStartAt",
  COALESCE(
    exc."newEndAt",
    i."originalEndAt"
  ) AS "actualEndAt",
  exc."id" IS NOT NULL AS "isException",
  COALESCE(exc."modifiedProperties", '{}'::jsonb) AS "modifiedProperties"
FROM "eventInstance" i  -- Not FROM "generateEventInstances"() i
JOIN "event" e ON i."eventId" = e."id"
LEFT JOIN "eventException" exc ON
  exc."eventId" = i."eventId" AND
  exc."originalOccurrenceAt" = i."occurrenceAt"
WHERE i."occurrenceAt" BETWEEN NOW() - INTERVAL '1 day' AND NOW() + INTERVAL '3 months';

COMMENT ON MATERIALIZED VIEW "upcomingEventInstances" IS
'Pre-computed view of event instances within a 3-month window (plus 1 day buffer) with exception handling.
Currently includes non-recurring events only.
TODO: Add recurring event instances once RRULE expansion is implemented.

Structure:
  id - The parent event ID
  title - Event title from parent
  description - Event description from parent
  timezone - Original event timezone (e.g. "America/New_York")
  isAllDay - Flag for all-day events
  occurrenceAt - Originally scheduled time
  actualStartAt - Effective start time (including exceptions)
  actualEndAt - Effective end time (including exceptions)
  isException - Flag for modified instances
  modifiedProperties - JSON overrides for this instance

Data Lifecycle:
  - Includes events from 1 day ago to 3 months in future
  - Automatically refreshed via triggers on event changes
  - Optimized for calendar client consumption

Indexed on (id, occurrenceAt) for fast lookups';

CREATE UNIQUE INDEX "idxUpcomingInstances" ON "upcomingEventInstances"("id", "occurrenceAt");

COMMENT ON INDEX "idxUpcomingInstances" IS
'Unique index ensuring one instance per (event, occurrence) pair.
Enables fast lookups and prevents duplicate instances in view.';
