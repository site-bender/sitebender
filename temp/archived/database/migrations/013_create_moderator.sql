CREATE TABLE moderator (
	"id" UUID PRIMARY KEY,
	"account" UUID NOT NULL REFERENCES account(id),
	"memoir" UUID NOT NULL REFERENCES memoir(id),
	"dateStarted" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateEnded" TIMESTAMP WITH TIME ZONE,
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE moderator IS 'A moderator moderates a memoir.';
COMMENT ON COLUMN moderator."id" IS 'The unique identifier for this moderator record.';
COMMENT ON COLUMN moderator."account" IS 'The ID for the account of the moderator.';
COMMENT ON COLUMN moderator."memoir" IS 'The ID for the memoir moderated.';
COMMENT ON COLUMN moderator."dateStarted" IS 'The date and time when the moderator was authorized.';
COMMENT ON COLUMN moderator."dateEnded" IS 'The date and time when the moderator was suspended. Optional.';
COMMENT ON COLUMN moderator."dateCreated" IS 'The date and time when the moderator record was created in the database.';
COMMENT ON COLUMN moderator."dateModified" IS 'The date and time when the moderator record was last modified in the database.';

ALTER TABLE moderator ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_moderator_memoir ON moderator(memoir);

COMMENT ON INDEX idx_moderator_memoir IS 'Index on moderator.memoir for faster lookups by moderated memoir.';

-- Allow users to view moderators of their own memoirs
CREATE POLICY "Allow users to view moderators of own memoirs"
ON moderator FOR SELECT
TO public
USING (memoir IN (
    SELECT id FROM memoir
    WHERE "accountable" IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));

-- Allow users to create moderators for their own memoirs
CREATE POLICY "Allow users to create moderators for own memoirs"
ON moderator FOR INSERT
TO public
WITH CHECK (memoir IN (
    SELECT id FROM memoir
    WHERE "accountable" IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));

-- Allow users to update moderators of their own memoirs
CREATE POLICY "Allow users to update moderators of own memoirs"
ON moderator FOR UPDATE
TO public
USING (memoir IN (
    SELECT id FROM memoir
    WHERE "accountable" IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
))
WITH CHECK (memoir IN (
    SELECT id FROM memoir
    WHERE "accountable" IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));

-- Allow users to delete moderators from their own memoirs
CREATE POLICY "Allow users to delete moderators from own memoirs"
ON moderator FOR DELETE
TO public
USING (memoir IN (
    SELECT id FROM memoir
    WHERE "accountable" IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));

-- Update memoir table to allow moderators to view and manage memoirs

-- Add a separate moderator policy with minimal complexity
-- Instead of loading the complete moderator table with all its policies
CREATE POLICY "Moderator select memoirs"
ON memoir FOR SELECT
TO authenticated
USING (id IN (
  SELECT memoir FROM moderator
  WHERE account IN (SELECT id FROM account WHERE owner = auth.uid())
  AND (moderator."dateEnded" IS NULL OR moderator."dateEnded" > NOW())
));

-- Update anecdote table to allow users to view anecdotes from public, own, or moderated memoirs

-- Allow users to view anecdotes from public, own, or moderated memoirs
CREATE POLICY "User select anecdotes"
ON anecdote FOR SELECT
TO public
USING (
    memoir IN (
        SELECT id FROM memoir WHERE audience = 'public' OR
        accountable IN (SELECT id FROM account WHERE owner = auth.uid()) OR
        id IN (
            SELECT memoir FROM moderator
            WHERE account IN (SELECT id FROM account WHERE owner = auth.uid())
            AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
        )
    )
);

CREATE POLICY "Allow moderators to update moderated anecdotes"
ON anecdote FOR UPDATE
TO public
USING (memoir IN (
    SELECT memoir FROM moderator
    WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
    AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
))
WITH CHECK (memoir IN (
    SELECT memoir FROM moderator
    WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
    AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
));

-- Update annotation table to allow moderators to create annotations on moderated anecdotes

-- Allow users to view annotations on accessible anecdotes
CREATE POLICY "Allow users to view annotations on accessible anecdotes"
ON annotation FOR SELECT
TO public
USING (anecdote IN (
    SELECT id FROM anecdote WHERE memoir IN (
        SELECT id FROM memoir
        WHERE "audience" = 'public'
        OR "accountable" IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
        OR id IN (
            SELECT memoir FROM moderator
            WHERE account IN (
                SELECT id FROM account WHERE owner = auth.uid()
            )
            AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
        )
    )
));

CREATE POLICY "Allow moderators to create annotations on moderated anecdotes"
ON annotation FOR INSERT
TO public
WITH CHECK (anecdote IN (
    SELECT id FROM anecdote WHERE memoir IN (
        SELECT memoir FROM moderator
        WHERE account IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
        AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
    )
));

CREATE POLICY "Allow moderators to update annotations on moderated anecdotes"
ON annotation FOR UPDATE
TO public
USING (anecdote IN (
    SELECT id FROM anecdote WHERE memoir IN (
        SELECT memoir FROM moderator
        WHERE account IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
        AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
    )
))
WITH CHECK (anecdote IN (
    SELECT id FROM anecdote WHERE memoir IN (
        SELECT memoir FROM moderator
        WHERE account IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
        AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
    )
));

CREATE POLICY "Allow moderators to delete annotations on moderated anecdotes"
ON annotation FOR DELETE
TO public
USING (anecdote IN (
    SELECT id FROM anecdote WHERE memoir IN (
        SELECT memoir FROM moderator
        WHERE account IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
        AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
    )
));

-- Update media table to allow moderators to manage media on moderated anecdotes

-- Allow users to view media from accessible anecdotes
CREATE POLICY "Allow users to view media from accessible anecdotes"
ON media FOR SELECT
TO public
USING (anecdote IN (
    SELECT id FROM anecdote WHERE memoir IN (
        SELECT id FROM memoir
        WHERE "audience" = 'public'
        OR "accountable" IN (
            SELECT id FROM account WHERE owner = auth.uid()
        )
        OR id IN (
            SELECT memoir FROM moderator
            WHERE account IN (
                SELECT id FROM account WHERE owner = auth.uid()
            )
            AND ("dateEnded" IS NULL OR "dateEnded" > NOW())
        )
    )
));
