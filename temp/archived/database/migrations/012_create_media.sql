CREATE TABLE media (
	"id" UUID PRIMARY KEY,
	"anecdote" UUID NOT NULL REFERENCES anecdote(id),
	"url" "URL",
	"type" "MediaObjectType" NOT NULL DEFAULT 'ImageObject',
	"dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	"dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE media IS 'A MediaObject associated with a specific anecdote.';
COMMENT ON COLUMN media."id" IS 'The unique identifier for this media record.';
COMMENT ON COLUMN media."anecdote" IS 'The ID for the anecdote with which the MediaObject is associated.';
COMMENT ON COLUMN media."url" IS 'The URL from which the MediaObject can be retrieved.';
COMMENT ON COLUMN media."type" IS 'The MediaObjectType of the MediaObject. Defaults to ImageObject.';
COMMENT ON COLUMN media."dateCreated" IS 'The date and time when the MediaObject record was created in the database.';
COMMENT ON COLUMN media."dateModified" IS 'The date and time when the MediaObject record was last modified in the database.';

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_media_anecdote ON media(anecdote);
CREATE INDEX idx_media_type ON media(type);

COMMENT ON INDEX idx_media_anecdote IS 'Index on media.anecdote for faster lookups by anecdote.';
COMMENT ON INDEX idx_media_type IS 'Index on media.type for faster lookups by type.';

-- Allow users to create media
CREATE POLICY "Allow users to create media"
ON media FOR INSERT
TO public
WITH CHECK (anecdote IN (
    SELECT id FROM anecdote WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));

-- Allow users to update their own media
CREATE POLICY "User update media"
ON media FOR UPDATE
TO public
USING (anecdote IN (
    SELECT id FROM anecdote WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
))
WITH CHECK (anecdote IN (
    SELECT id FROM anecdote WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));

-- Allow users to delete their own media
CREATE POLICY "User delete media"
ON media FOR DELETE
TO public
USING (anecdote IN (
    SELECT id FROM anecdote WHERE account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
));
