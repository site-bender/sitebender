CREATE OR REPLACE FUNCTION "refreshEventInstances"() RETURNS VOID AS $$
BEGIN
  -- Clear all existing instances
  DELETE FROM "eventInstance";

  -- Regenerate all instances using the generation function
  INSERT INTO "eventInstance" ("eventId", "occurrenceAt", "originalEndAt")
  SELECT "eventId", "occurrenceAt", "originalEndAt"
  FROM "generateEventInstances"();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
