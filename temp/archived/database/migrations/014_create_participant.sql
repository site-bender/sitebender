CREATE TABLE participant (
	action UUID NOT NULL REFERENCES action(id),
	person UUID NOT NULL REFERENCES person(id),
	PRIMARY KEY (action, person)
);

COMMENT ON TABLE participant IS 'A participant in an action.';
COMMENT ON COLUMN participant.action IS 'The ID for the action associated with this participant.';
COMMENT ON COLUMN participant.person IS 'The ID for the person associated with this participant.';

ALTER TABLE participant ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_participant_action ON participant(action);
CREATE INDEX idx_participant_person ON participant(person);

COMMENT ON INDEX idx_participant_action IS 'Index on participant.action for faster lookups by action.';
COMMENT ON INDEX idx_participant_person IS 'Index on participant.person for faster lookups by person.';

-- Allow users to view participants only in their own actions
CREATE POLICY "Allow users to view participants in own actions"
ON participant FOR SELECT
TO public
USING (
    action IN (
        SELECT id FROM action
        WHERE agent IN (
            SELECT id FROM session
            WHERE account IN (SELECT id FROM account WHERE owner = auth.uid())
        )
    )
);

-- Allow users to create participants in their own actions
CREATE POLICY "Allow users to create participants in own actions"
ON participant FOR INSERT
TO public
WITH CHECK (action IN (
    SELECT id FROM action WHERE agent IN (
        SELECT id FROM session WHERE account IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
    )
));
