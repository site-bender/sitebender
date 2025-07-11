CREATE TABLE annotation (
	"id" UUID PRIMARY KEY,
	"account" UUID NOT NULL REFERENCES account(id),
	"anecdote" UUID NOT NULL REFERENCES anecdote(id),
	"text" TEXT,
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE annotation IS 'An annotation relating to a specific anecdote.';
COMMENT ON COLUMN annotation."id" IS 'The unique identifier for this annotation record.';
COMMENT ON COLUMN annotation."account" IS 'The ID for the account that created the annotation.';
COMMENT ON COLUMN annotation."anecdote" IS 'The ID for the anecdote that is the subject of the annotation.';
COMMENT ON COLUMN annotation."text" IS 'The textual content of the annotation.';
COMMENT ON COLUMN annotation."dateCreated" IS 'The date and time when the annotation record was created in the database.';
COMMENT ON COLUMN annotation."dateModified" IS 'The date and time when the annotation record was last modified in the database.';

ALTER TABLE annotation ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_annotation_anecdote ON annotation(anecdote);
CREATE INDEX idx_annotation_account ON annotation(account);

COMMENT ON INDEX idx_annotation_anecdote IS 'Index on annotation.anecdote for faster lookups by anecdote.';
COMMENT ON INDEX idx_annotation_account IS 'Index on annotation.account for faster lookups by account.';

-- Allow users to create annotations
CREATE POLICY "Allow users to create annotations"
ON annotation FOR INSERT
TO public
WITH CHECK (account IN (
    SELECT id FROM account WHERE owner = auth.uid()
));

-- Allow users to update their own annotations
CREATE POLICY "User update annotations"
ON annotation FOR UPDATE
TO public
USING (account IN (
    SELECT id FROM account WHERE owner = auth.uid()
))
WITH CHECK (account IN (
    SELECT id FROM account WHERE owner = auth.uid()
));

-- Allow users to delete their own annotations
CREATE POLICY "User delete annotations"
ON annotation FOR DELETE
TO public
USING (account IN (
    SELECT id FROM account WHERE owner = auth.uid()
));
