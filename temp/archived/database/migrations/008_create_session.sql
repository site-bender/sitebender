CREATE TABLE session (
	"id" UUID PRIMARY KEY,
	"account" UUID NOT NULL REFERENCES account(id),
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateLoggedOut" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE session IS 'User sessions (logins).';
COMMENT ON COLUMN session."id" IS 'The unique identifier for this session record.';
COMMENT ON COLUMN session."account" IS 'The ID for the account that logged in.';
COMMENT ON COLUMN session."dateCreated" IS 'The date and time when the account logged in.';
COMMENT ON COLUMN session."dateLoggedOut" IS 'The date and time when the account logged out, if it did.';

ALTER TABLE session ENABLE ROW LEVEL SECURITY;

-- Allow public to insert sessions (e.g., during login)
CREATE POLICY "Public insert sessions"
ON session FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to view their own sessions
CREATE POLICY "User select own sessions"
ON session FOR SELECT
TO public
USING (account IN (SELECT id FROM account WHERE owner = auth.uid()));

-- Allow users to update their own sessions
CREATE POLICY "User update own sessions"
ON session FOR UPDATE
TO public
USING (account IN (SELECT id FROM account WHERE owner = auth.uid()))
WITH CHECK (account IN (SELECT id FROM account WHERE owner = auth.uid()));
