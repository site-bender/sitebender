CREATE OR REPLACE FUNCTION "generateEventInstances"() RETURNS TABLE (
  "eventId" UUID,
  "occurrenceAt" TIMESTAMPTZ,
  "originalEndAt" TIMESTAMPTZ
) AS $$
  const now = new Date();
  const windowEnd = new Date();
  windowEnd.setMonth(now.getMonth() + 3);

  const results = [];

  // Include non-recurring events that fall within window
  const singleEvents = plv8.execute(
    `SELECT "id", "startAt", "endAt"
     FROM "event"
     WHERE "isRecurring" = false
     AND "startAt" BETWEEN $1 AND $2`,
    [now.toISOString(), windowEnd.toISOString()]
  );

  singleEvents.forEach(event => {
    results.push({
      eventId: event.id,
      occurrenceAt: event.startAt,
      originalEndAt: event.endAt
    });
  });

  // TODO: Add recurring event processing once RRULE solution is implemented
  // For now, just log that recurring events exist but aren't processed
  const recurringEvents = plv8.execute(
    `SELECT COUNT(*) as count FROM "event" WHERE "isRecurring" = true`
  );

  if (recurringEvents[0].count > 0) {
    plv8.elog(NOTICE, `Found ${recurringEvents[0].count} recurring events - expansion not yet implemented`);
  }

  return results;
$$ LANGUAGE plv8 SECURITY DEFINER SET search_path = public;

-- Function-level comment
COMMENT ON FUNCTION "generateEventInstances" IS
'Generates concrete event instances for a 3-month window.
Currently handles non-recurring events only.
TODO: Add RRULE expansion for recurring events.

Output columns:
- eventId: Reference to parent event
- occurrenceAt: Scheduled instance time (UTC)
- originalEndAt: Calculated end time (UTC) before exceptions';
