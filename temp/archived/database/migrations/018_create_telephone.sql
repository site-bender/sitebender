CREATE TABLE telephone (
    "account" UUID NOT NULL,
    "phoneNumber" UUID NOT NULL,
    "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "dateModified" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("account", "phoneNumber"),
    FOREIGN KEY ("account") REFERENCES "account"(id),
    FOREIGN KEY ("phoneNumber") REFERENCES "phoneNumber"(id)
);

COMMENT ON TABLE telephone IS 'Mapping table for accounts and phone numbers.';
COMMENT ON COLUMN telephone."account" IS 'The ID of the account.';
COMMENT ON COLUMN telephone."phoneNumber" IS 'The ID of the phone number.';
COMMENT ON COLUMN telephone."dateCreated" IS 'The date and time when the record was created.';
COMMENT ON COLUMN telephone."dateModified" IS 'The date and time when the record was last modified.';

ALTER TABLE telephone ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_telephone_account ON telephone(account);

COMMENT ON INDEX idx_telephone_account IS 'Index on telephone.account for faster lookups by account.';

-- Add policies for telephone mapping table
CREATE POLICY "Allow users to view own telephone mappings"
ON telephone FOR SELECT
TO public
USING (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
);

-- Allow users to create telephone mappings
CREATE POLICY "Allow users to create telephone mappings"
ON telephone FOR INSERT
TO public
WITH CHECK (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
);

-- Allow users to update their own telephone mappings
CREATE POLICY "Allow users to update telephone mappings"
ON telephone FOR UPDATE
TO public
USING (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
)
WITH CHECK (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
);

-- Allow users to delete their own telephone mappings
CREATE POLICY "Allow users to delete telephone mappings"
ON telephone FOR DELETE
TO public
USING (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
);
