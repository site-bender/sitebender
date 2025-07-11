CREATE TABLE action (
	"id" UUID PRIMARY KEY,
	"agent" UUID NOT NULL REFERENCES session(id),
	"type" "ActionType" NOT NULL DEFAULT 'CreateAction',
	"startTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"endTime" TIMESTAMP WITH TIME ZONE,
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE action IS 'An action performed on the data.';
COMMENT ON COLUMN action."id" IS 'The unique identifier for this action record.';
COMMENT ON COLUMN action."agent" IS 'The ID for the account that acts.';
COMMENT ON COLUMN action."startTime" IS 'The date and time when the action started.';
COMMENT ON COLUMN action."type" IS 'The ActionType of the action. Defaults to CreateAction.';
COMMENT ON COLUMN action."endTime" IS 'The date and time when the action ended. Optional when in progress.';
COMMENT ON COLUMN action."dateCreated" IS 'The date and time when the action record was created in the database.';
COMMENT ON COLUMN action."dateModified" IS 'The date and time when the action record was last modified in the database.';

ALTER TABLE action ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_action_agent ON action(agent);
CREATE INDEX idx_action_type ON action(type);
CREATE INDEX idx_action_startTime ON action("startTime");

COMMENT ON INDEX idx_action_agent IS 'Index on action.agent for faster lookups by action agent.';
COMMENT ON INDEX idx_action_type IS 'Index on action.type for filtering by action type.';
COMMENT ON INDEX idx_action_startTime IS 'Index on action.startTime for chronological queries.';

-- Allow users to view their own actions
CREATE POLICY "Allow users to view own actions"
ON action FOR SELECT
TO public
USING (agent IN (
    SELECT id FROM session WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));

-- Allow users to create actions
CREATE POLICY "Allow users to create actions"
ON action FOR INSERT
TO public
WITH CHECK (agent IN (
    SELECT id FROM session WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));
