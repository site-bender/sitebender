CREATE TABLE person (
	id UUID PRIMARY KEY,
	"alternateName" TEXT UNIQUE NOT NULL,
	"givenName" TEXT,
	"familyName" TEXT,
	"additionalName" TEXT,
	"honorificPrefix" TEXT[],
	"honorificSuffix" TEXT[],
	"description" TEXT,
	"image" "URL",
	"url" "URL",
	"birthDate" DATE,
	"birthPlace" TEXT,
	"deathDate" DATE,
	"deathPlace" TEXT,
	"pronouns" TEXT[],
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE person IS 'Persons in or mentioned in the app.';
COMMENT ON COLUMN person."id" IS 'The unique identifier for this person record.';
COMMENT ON COLUMN person."alternateName" IS 'A unique username for the person.';
COMMENT ON COLUMN person."givenName" IS 'The given name of the person.';
COMMENT ON COLUMN person."familyName" IS 'The family name of the person.';
COMMENT ON COLUMN person."additionalName" IS 'Middle names or other names for the person.';
COMMENT ON COLUMN person."honorificPrefix" IS 'Titles like Mr., Mrs., etc., for the person.';
COMMENT ON COLUMN person."honorificSuffix" IS 'Suffixes like Jr., Sr., etc., for the person.';
COMMENT ON COLUMN person."description" IS 'A bio for the person.';
COMMENT ON COLUMN person."image" IS 'An avatar or portrait image for the person.';
COMMENT ON COLUMN person."url" IS 'A personal website or profile page link for the person.';
COMMENT ON COLUMN person."birthDate" IS 'The birth date of the person.';
COMMENT ON COLUMN person."birthPlace" IS 'The place where the person was born.';
COMMENT ON COLUMN person."deathDate" IS 'The death date of the person.';
COMMENT ON COLUMN person."deathPlace" IS 'The place where the person died.';
COMMENT ON COLUMN person."pronouns" IS 'The pronouns this person prefers.';
COMMENT ON COLUMN person."dateCreated" IS 'The date and time when the record was created in the database.';
COMMENT ON COLUMN person."dateModified" IS 'The date and time when the record was last modified in the database.';

ALTER TABLE person ENABLE ROW LEVEL SECURITY;

-- Allow public to insert persons (e.g., during registration)
CREATE POLICY "Public insert persons"
ON person FOR INSERT
TO public
WITH CHECK (true);
