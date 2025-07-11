CREATE TABLE "webAuthnCredential" (
    "id" UUID PRIMARY KEY,
    "account" UUID NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    "credential" BYTEA NOT NULL,
    "publicKey" BYTEA NOT NULL,
    "credentialName" VARCHAR(255),
    "counter" BIGINT NOT NULL DEFAULT 0,
    "transports" TEXT[],
    "lastUsed" TIMESTAMP WITH TIME ZONE,
    "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "dateModified" TIMESTAMP WITH TIME ZONE,
    UNIQUE("account", "credential")
);

COMMENT ON TABLE "webAuthnCredential" IS 'WebAuthn credentials registered by users for passwordless authentication.';
COMMENT ON COLUMN "webAuthnCredential"."id" IS 'Unique identifier for the credential record.';
COMMENT ON COLUMN "webAuthnCredential"."account" IS 'The account this credential belongs to.';
COMMENT ON COLUMN "webAuthnCredential"."credential" IS 'The WebAuthn credential ID as provided by the authenticator.';
COMMENT ON COLUMN "webAuthnCredential"."publicKey" IS 'The public key associated with this credential.';
COMMENT ON COLUMN "webAuthnCredential"."credentialName" IS 'A user-friendly name for this credential (e.g., "Work laptop").';
COMMENT ON COLUMN "webAuthnCredential"."counter" IS 'The signature counter used to detect cloned authenticators.';
COMMENT ON COLUMN "webAuthnCredential"."transports" IS 'The supported transports for this credential (e.g., usb, nfc, ble, internal).';
COMMENT ON COLUMN "webAuthnCredential"."lastUsed" IS 'When this credential was last used for authentication.';
COMMENT ON COLUMN "webAuthnCredential"."dateCreated" IS 'When this credential was registered.';
COMMENT ON COLUMN "webAuthnCredential"."dateModified" IS 'When this credential record was last modified.';

ALTER TABLE "webAuthnCredential" ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_webauthn_account ON "webAuthnCredential"(account);
CREATE INDEX idx_webauthn_credential ON "webAuthnCredential"("credential");

COMMENT ON INDEX idx_webauthn_account IS 'Index for looking up credentials by account.';
COMMENT ON INDEX idx_webauthn_credential IS 'Index for looking up credentials by credential ID.';

-- Users can view their own credentials
CREATE POLICY "User view own WebAuthn credentials"
ON "webAuthnCredential" FOR SELECT
TO public
USING (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
);

-- Users can create credentials for themselves
CREATE POLICY "User create own WebAuthn credentials"
ON "webAuthnCredential" FOR INSERT
TO public
WITH CHECK (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
);

-- Users can update their own credentials (e.g., counter, name)
CREATE POLICY "User update own WebAuthn credentials"
ON "webAuthnCredential" FOR UPDATE
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

-- Users can delete their own credentials
CREATE POLICY "User delete own WebAuthn credentials"
ON "webAuthnCredential" FOR DELETE
TO public
USING (
    account IN (
        SELECT id FROM account WHERE owner = auth.uid()
    )
);

-- Superusers can access all credentials (for admin purposes)
CREATE POLICY "Superuser access all WebAuthn credentials"
ON "webAuthnCredential" FOR ALL
TO public
USING (
    "isSuperuser"(auth.uid()) = true
)
WITH CHECK (
    "isSuperuser"(auth.uid()) = true
);
