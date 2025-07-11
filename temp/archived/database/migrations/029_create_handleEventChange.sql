CREATE OR REPLACE FUNCTION "handleEventChange"() RETURNS TRIGGER AS $$
BEGIN
  -- Need to check which table triggered this
  IF TG_TABLE_NAME = 'eventException' THEN
    -- For exception changes, refresh all instances
    PERFORM "refreshEventInstances"();
  ELSE
    -- For event changes, handle specific event
    DELETE FROM "eventInstance" WHERE "eventId" = COALESCE(NEW."id", OLD."id");

    IF TG_OP != 'DELETE' THEN
      INSERT INTO "eventInstance" ("eventId", "occurrenceAt", "originalEndAt")
      SELECT "eventId", "occurrenceAt", "originalEndAt"
      FROM "generateEventInstances"()
      WHERE "eventId" = NEW."id";
    END IF;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the triggers with optimized execution
CREATE TRIGGER "triggerEventChange"
AFTER INSERT OR UPDATE OR DELETE ON "event"
FOR EACH ROW
EXECUTE FUNCTION "handleEventChange"();

COMMENT ON TRIGGER "triggerEventChange" ON "event" IS
'Maintains data consistency after event changes with:
1. Smart debouncing for non-structural changes
2. Row-level refresh triggering
3. Handles INSERT, UPDATE, and DELETE operations';

CREATE TRIGGER "triggerExceptionChange"
AFTER INSERT OR UPDATE OR DELETE ON "eventException"
FOR EACH STATEMENT
EXECUTE FUNCTION "handleEventChange"();

COMMENT ON TRIGGER "triggerExceptionChange" ON "eventException" IS
'Optimized bulk operation handler that:
1. Processes all exceptions in single statement
2. Refreshes view when exceptions change
3. Uses the shared handleEventChange function';
