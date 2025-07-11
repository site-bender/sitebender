CREATE TABLE invitation (
	"id" UUID PRIMARY KEY,
	"account" UUID NOT NULL REFERENCES account(id),
	"emailAddress" "EmailAddress" NOT NULL,
	"name" VARCHAR(255),
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE invitation IS 'Invitations sent by an account to ask people to join the application.';
COMMENT ON COLUMN invitation."id" IS 'The unique identifier for this invitation record.';
COMMENT ON COLUMN invitation."account" IS 'The ID for the account that sent the invitation.';
COMMENT ON COLUMN invitation."emailAddress" IS 'The email address to which the invitation was sent. Required';
COMMENT ON COLUMN invitation."name" IS 'A friendly name for the invited person, optionally.';
COMMENT ON COLUMN invitation."dateCreated" IS 'The date and time when the invitation record was created in the database.';
COMMENT ON COLUMN invitation."dateModified" IS 'The date and time when the invitation record was last modified in the database.';

ALTER TABLE invitation ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own invitations
CREATE POLICY "Allow users to view own invitations"
ON invitation FOR SELECT
TO public
USING (account IN (
    SELECT id FROM account WHERE owner = auth.uid()
));

-- Allow users to create invitations
CREATE POLICY "Allow users to create invitations"
ON invitation FOR INSERT
TO public
WITH CHECK (account IN (
    SELECT id FROM account WHERE owner = auth.uid()
));

-- Allow users to delete their own invitations
CREATE POLICY "Allow users to delete own invitations"
ON invitation FOR DELETE
TO public
USING (account IN (
    SELECT id FROM account WHERE owner = auth.uid()
));
