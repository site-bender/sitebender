CREATE TABLE anecdote (
	"id" UUID PRIMARY KEY,
	"account" UUID NOT NULL REFERENCES account(id),
	"memoir" UUID NOT NULL REFERENCES memoir(id),
	"contentRating" "ContentRating" NOT NULL DEFAULT 'general',
	"creativeWorkStatus" "CreativeWorkStatus" NOT NULL DEFAULT 'draft',
	"inLanguage" "Language" NOT NULL DEFAULT 'en',
	"text" TEXT,
	"keywords" varchar(255)[],
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE,
	"datePublished" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE anecdote IS 'An anecdote relating to a specific memoir.';
COMMENT ON COLUMN anecdote."id" IS 'The unique identifier for this anecdote record.';
COMMENT ON COLUMN anecdote."account" IS 'The ID for the account that created the anecdote.';
COMMENT ON COLUMN anecdote."memoir" IS 'The ID for the memoir that is the subject of the anecdote.';
COMMENT ON COLUMN anecdote."contentRating" IS 'Whether suitable for general audiences (the default) or adults only.';
COMMENT ON COLUMN anecdote."creativeWorkStatus" IS 'The current status of the anecdote. Defaults to "draft".';
COMMENT ON COLUMN anecdote."inLanguage" IS 'The language of the anecdote. Defaults to "en".';
COMMENT ON COLUMN anecdote."text" IS 'The textual content of the anecdote.';
COMMENT ON COLUMN anecdote."keywords" IS 'An array of keywords that apply to the anecdote.';
COMMENT ON COLUMN anecdote."dateCreated" IS 'The date and time when the anecdote record was created in the database.';
COMMENT ON COLUMN anecdote."dateModified" IS 'The date and time when the anecdote record was last modified in the database.';
COMMENT ON COLUMN anecdote."datePublished" IS 'The date and time when the anecdote was published and made public.';

ALTER TABLE anecdote ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_anecdote_memoir ON anecdote(memoir);
CREATE INDEX idx_anecdote_account ON anecdote(account);
CREATE INDEX idx_anecdote_status ON anecdote("creativeWorkStatus");

COMMENT ON INDEX idx_anecdote_memoir IS 'Index on anecdote.memoir for faster lookups by memoir.';
COMMENT ON INDEX idx_anecdote_account IS 'Index on anecdote.account for faster lookups by account.';
COMMENT ON INDEX idx_anecdote_status IS 'Index on anecdote.creativeWorkStatus for faster lookups by creativeWorkStatus.';

-- Allow users to create anecdotes
CREATE POLICY "User insert anecdotes"
ON anecdote FOR INSERT
TO public
WITH CHECK (account IN (SELECT id FROM account WHERE owner = auth.uid()));

-- Allow users to update their own anecdotes
CREATE POLICY "User update anecdotes"
ON anecdote FOR UPDATE
TO public
USING (account IN (SELECT id FROM account WHERE owner = auth.uid()))
WITH CHECK (account IN (SELECT id FROM account WHERE owner = auth.uid()));

-- Allow users to delete their own anecdotes
CREATE POLICY "User delete anecdotes"
ON anecdote FOR DELETE
TO public
USING (account IN (SELECT id FROM account WHERE owner = auth.uid()));
