CREATE TABLE "phoneNumber" (
	"id" UUID PRIMARY KEY,
	"person" UUID REFERENCES person(id) ON DELETE CASCADE,
	"countryCode" VARCHAR(8) NOT NULL,
	"lineNumber" VARCHAR(32) NOT NULL,
	"deviceType" "PhoneType" NOT NULL,
	"isPersonal" BOOLEAN NOT NULL DEFAULT false,
	"isWork" BOOLEAN NOT NULL DEFAULT false,
	"channels" "CommunicationChannel"[] NOT NULL DEFAULT '{}',
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE,
	UNIQUE(person, "countryCode", "lineNumber")
);

COMMENT ON TABLE "phoneNumber" IS 'Phone numbers associated with persons.';
COMMENT ON COLUMN "phoneNumber"."id" IS 'The unique identifier for this phone number record.';
COMMENT ON COLUMN "phoneNumber"."person" IS 'The person this phone number belongs to.';
COMMENT ON COLUMN "phoneNumber"."countryCode" IS 'The country code portion of the phone number.';
COMMENT ON COLUMN "phoneNumber"."lineNumber" IS 'The local portion of the phone number.';
COMMENT ON COLUMN "phoneNumber"."deviceType" IS 'The type of phone (mobile, landline, etc.).';
COMMENT ON COLUMN "phoneNumber"."isPersonal" IS 'Whether this phone is used for personal purposes.';
COMMENT ON COLUMN "phoneNumber"."isWork" IS 'Whether this phone is used for work purposes.';
COMMENT ON COLUMN "phoneNumber"."channels" IS 'The communication channels available for this phone number.';
COMMENT ON COLUMN "phoneNumber"."dateCreated" IS 'The date and time when this phone number record was created.';
COMMENT ON COLUMN "phoneNumber"."dateModified" IS 'The date and time when this phone number record was last modified.';

-- Add phone number reference to registrant
ALTER TABLE registrant ADD COLUMN "phoneNumber" UUID REFERENCES "phoneNumber"(id);
COMMENT ON COLUMN registrant."phoneNumber" IS 'Optional reference to a phone number provided during registration.';

ALTER TABLE "phoneNumber" ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_phoneNumber_person ON "phoneNumber"(person);

COMMENT ON INDEX idx_phoneNumber_person IS 'Index on phoneNumber.person for faster lookups by person.';

-- Allow users to view phone numbers of accessible persons
CREATE POLICY "Allow users to view phone numbers of accessible persons"
ON "phoneNumber" FOR SELECT
TO public
USING (
    "isSuperuser"(auth.uid()) OR
    person IN (
        -- Person owns an account
        SELECT owner FROM account WHERE owner = auth.uid()
        UNION
        -- Person is subject of a public memoir
        SELECT about FROM memoir WHERE audience = 'public'
        UNION
        -- Person is subject of user's memoir
        SELECT about FROM memoir
        WHERE accountable IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
    )
);

-- Allow users to create phone numbers for themselves
CREATE POLICY "Allow users to create phone numbers for self"
ON "phoneNumber" FOR INSERT
TO public
WITH CHECK (
    "isSuperuser"(auth.uid()) OR
    person IN (
        SELECT owner FROM account WHERE owner = auth.uid()
    )
);

-- Allow users to update their own phone numbers
CREATE POLICY "Allow users to update own phone numbers"
ON "phoneNumber" FOR UPDATE
TO public
USING (
    "isSuperuser"(auth.uid()) OR
    person IN (
        SELECT owner FROM account WHERE owner = auth.uid()
    )
)
WITH CHECK (
    "isSuperuser"(auth.uid()) OR
    person IN (
        SELECT owner FROM account WHERE owner = auth.uid()
    )
);

-- Allow users to delete their own phone numbers
CREATE POLICY "Allow users to delete own phone numbers"
ON "phoneNumber" FOR DELETE
TO public
USING (
    "isSuperuser"(auth.uid()) OR
    person IN (
        SELECT owner FROM account WHERE owner = auth.uid()
    )
);
