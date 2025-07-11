CREATE TABLE registrant (
	"id" UUID PRIMARY KEY,
	"emailAddress" "EmailAddress" UNIQUE NOT NULL,
	"expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
	"name" VARCHAR(255) NOT NULL,
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE registrant IS 'Temporary storage for user registration data.';
COMMENT ON COLUMN registrant."id" IS 'The unique identifier for this registrant record.';
COMMENT ON COLUMN registrant."emailAddress" IS 'The email address provided during registration.';
COMMENT ON COLUMN registrant."expiresAt" IS 'When this registration entry expires (default 24 hours after creation).';
COMMENT ON COLUMN registrant."name" IS 'The name provided during registration.';
COMMENT ON COLUMN registrant."dateCreated" IS 'The date and time when the registration record was created.';
COMMENT ON COLUMN registrant."dateModified" IS 'The date and time when the registration record was last modified.';

ALTER TABLE registrant ENABLE ROW LEVEL SECURITY;

-- Allow public to insert registrants for signup functionality
CREATE POLICY "Public insert registrants"
ON registrant FOR INSERT
TO public
WITH CHECK (true);

-- Allow superusers to view registrants
CREATE POLICY "Superuser select registrants"
ON registrant FOR SELECT
TO public
USING ("isSuperuser"(auth.uid()) = true);

-- Allow superusers to delete registrants
CREATE POLICY "Superuser delete registrants"
ON registrant FOR DELETE
TO public
USING ("isSuperuser"(auth.uid()) = true);
