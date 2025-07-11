CREATE TABLE memoir (
	"id" UUID PRIMARY KEY,
	"accountable" UUID NOT NULL REFERENCES account(id),
	"about" UUID NOT NULL REFERENCES person(id),
	"abstract" TEXT,
	"audience" "Audience" NOT NULL DEFAULT 'public',
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE,
	"datePublished" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE memoir IS 'The essential object for A Storied Life: a memoir.';
COMMENT ON COLUMN memoir."id" IS 'The unique identifier for this memoir record.';
COMMENT ON COLUMN memoir."accountable" IS 'The ID for the account that owns the memoir.';
COMMENT ON COLUMN memoir."about" IS 'The ID for the person who is the subject of the memoir.';
COMMENT ON COLUMN memoir."abstract" IS 'A short description of the memoir and the subject.';
COMMENT ON COLUMN memoir."audience" IS 'The expected audience, either "general" or "adult".';
COMMENT ON COLUMN memoir."dateCreated" IS 'The date and time when the memoir record was created in the database.';
COMMENT ON COLUMN memoir."dateModified" IS 'The date and time when the memoir record was last modified in the database.';
COMMENT ON COLUMN memoir."datePublished" IS 'The date and time when the memoir was published and made public.';

ALTER TABLE memoir ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_memoir_accountable ON memoir(accountable);
CREATE INDEX idx_memoir_about ON memoir(about);

COMMENT ON INDEX idx_memoir_accountable IS 'Index on memoir.accountable for faster lookups by accountable account.';
COMMENT ON INDEX idx_memoir_about IS 'Index on memoir.about for faster lookups by subject person.';

-- Public memoirs are visible to everyone (no joins or subqueries)
CREATE POLICY "Select public memoirs"
ON memoir FOR SELECT
TO public
USING (audience = 'public');

-- Simple direct policy for users' own memoirs without complex joins
CREATE POLICY "Select own memoirs"
ON memoir FOR SELECT
TO authenticated
USING (accountable IN (
  SELECT id FROM account WHERE owner = auth.uid()
));

-- Simple policy for inserting memoirs
CREATE POLICY "Insert memoirs"
ON memoir FOR INSERT
TO authenticated
WITH CHECK (accountable IN (
  SELECT id FROM account WHERE owner = auth.uid()
));

-- Simple policy for updating memoirs
CREATE POLICY "Update memoirs"
ON memoir FOR UPDATE
TO authenticated
USING (accountable IN (
  SELECT id FROM account WHERE owner = auth.uid()
))
WITH CHECK (accountable IN (
  SELECT id FROM account WHERE owner = auth.uid()
));

-- Simple policy for deleting memoirs
CREATE POLICY "Delete memoirs"
ON memoir FOR DELETE
TO authenticated
USING (accountable IN (
  SELECT id FROM account WHERE owner = auth.uid()
));
