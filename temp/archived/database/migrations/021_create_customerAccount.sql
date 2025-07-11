-- Create customer-account relationship table for managing B2B relationships
CREATE TABLE "customerAccount" (
    "customerId" UUID NOT NULL REFERENCES customer(id),
    "accountId" UUID NOT NULL REFERENCES account(id),
    "role" VARCHAR(50) NOT NULL DEFAULT 'editor',
    "dateAuthorized" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "dateRevoked" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("customerId", "accountId")
);

COMMENT ON TABLE "customerAccount" IS 'Junction table for customer-account relationships and permissions.';
COMMENT ON COLUMN "customerAccount"."customerId" IS 'Reference to the customer.';
COMMENT ON COLUMN "customerAccount"."accountId" IS 'Reference to the authorized account.';
COMMENT ON COLUMN "customerAccount"."role" IS 'Permission level: admin, editor, or viewer.';
COMMENT ON COLUMN "customerAccount"."dateAuthorized" IS 'When this authorization was granted.';
COMMENT ON COLUMN "customerAccount"."dateRevoked" IS 'When this authorization was revoked (if applicable).';

CREATE INDEX idx_customerAccount_customerId ON "customerAccount"("customerId");
CREATE INDEX idx_customerAccount_accountId ON "customerAccount"("accountId");
CREATE INDEX idx_customerAccount_role ON "customerAccount"("role");

COMMENT ON INDEX idx_customerAccount_customerId IS 'Index on customerAccount.customerId for faster lookups by customer.';
COMMENT ON INDEX idx_customerAccount_accountId IS 'Index on customerAccount.accountId for faster lookups by account.';
COMMENT ON INDEX idx_customerAccount_role IS 'Index on customerAccount.role for faster lookups by role.';

ALTER TABLE customer ENABLE ROW LEVEL SECURITY;
ALTER TABLE "customerAccount" ENABLE ROW LEVEL SECURITY;

-- RLS policies for customerAccount table
CREATE POLICY "Users can view their own customer relationships" ON "customerAccount"
FOR SELECT USING (
    "isSuperuser"(auth.uid()) OR
    "accountId" IN (SELECT id FROM account WHERE owner = auth.uid())
);

CREATE POLICY "Customer admins and super users can authorize new accounts" ON "customerAccount"
FOR INSERT WITH CHECK (
    "isSuperuser"(auth.uid()) OR
    "customerId" IN (
        SELECT "customerId"
        FROM "customerAccount"
        WHERE "accountId" IN (SELECT id FROM account WHERE owner = auth.uid())
        AND "role" = 'admin'
        AND "dateRevoked" IS NULL
    )
);

CREATE POLICY "Customer admins and super users can update relationships" ON "customerAccount"
FOR UPDATE USING (
    "isSuperuser"(auth.uid()) OR
    "customerId" IN (
        SELECT "customerId"
        FROM "customerAccount"
        WHERE "accountId" IN (SELECT id FROM account WHERE owner = auth.uid())
        AND "role" = 'admin'
        AND "dateRevoked" IS NULL
    )
);

CREATE POLICY "Customer admins and super users can revoke relationships" ON "customerAccount"
FOR DELETE USING (
    "isSuperuser"(auth.uid()) OR
    "customerId" IN (
        SELECT "customerId"
        FROM "customerAccount"
        WHERE "accountId" IN (SELECT id FROM account WHERE owner = auth.uid())
        AND "role" = 'admin'
        AND "dateRevoked" IS NULL
    )
);

-- Update RLS for customer

-- RLS policies for customer table
CREATE POLICY "Users can view customers they are associated with" ON customer
FOR SELECT USING (
    "isSuperuser"(auth.uid()) OR
    id IN (
        SELECT "customerId"
        FROM "customerAccount"
        WHERE "accountId" IN (SELECT id FROM account WHERE owner = auth.uid())
        AND "dateRevoked" IS NULL
    )
);

CREATE POLICY "Customer admins and super users can update customers" ON customer
FOR UPDATE USING (
    "isSuperuser"(auth.uid()) OR
    id IN (
        SELECT "customerId"
        FROM "customerAccount"
        WHERE "accountId" IN (SELECT id FROM account WHERE owner = auth.uid())
        AND "role" = 'admin'
        AND "dateRevoked" IS NULL
    )
);
