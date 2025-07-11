CREATE TABLE account (
	"id" UUID PRIMARY KEY,
	"emailAddress" "EmailAddress" UNIQUE NOT NULL,
	"owner" UUID NOT NULL REFERENCES person(id),
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE account IS 'Accounts with log in privileges for this application.';
COMMENT ON COLUMN account."id" IS 'The unique identifier for this account record.';
COMMENT ON COLUMN account."emailAddress" IS 'A unique email address for this account. One account per email address.';
COMMENT ON COLUMN account."owner" IS 'The ID for the person that owns this account.';
COMMENT ON COLUMN account."dateCreated" IS 'The date and time when the record was created in the database.';
COMMENT ON COLUMN account."dateModified" IS 'The date and time when the record was last modified in the database.';

ALTER TABLE account ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_account_owner ON account(owner);

COMMENT ON INDEX idx_account_owner IS 'Index on account.owner for faster lookups by owner.';

-- Allow public to insert accounts during registration
CREATE POLICY "Public insert accounts"
ON account FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to view their own accounts
CREATE POLICY "User select own account"
ON account FOR SELECT
TO public
USING (auth.uid() = owner);

-- Allow users to update their own accounts
CREATE POLICY "User update own account"
ON account FOR UPDATE
TO public
USING (auth.uid() = owner)
WITH CHECK (auth.uid() = owner);

-- Update person table

-- Allow users to view their own person records
CREATE POLICY "User select own person"
ON person FOR SELECT
TO public
USING (id IN (SELECT owner FROM account WHERE owner = auth.uid()));

-- Allow users to update their own person records
CREATE POLICY "User update own person"
ON person FOR UPDATE
TO public
USING (id IN (SELECT owner FROM account WHERE owner = auth.uid()))
WITH CHECK (id IN (SELECT owner FROM account WHERE owner = auth.uid()));
