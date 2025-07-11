-- Create customer table for B2B funeral home clients
CREATE TABLE customer (
    "id" UUID PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "businessName" VARCHAR(255),
    "taxId" VARCHAR(50),
    "address" TEXT,
    "billingAddress" TEXT,
    "contactEmail" "EmailAddress" NOT NULL,
    "website" "URL",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "dateModified" TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE customer IS 'B2B customers (funeral homes) that use the service.';
COMMENT ON COLUMN customer."name" IS 'Primary contact name for the customer.';
COMMENT ON COLUMN customer."businessName" IS 'Legal business name of the funeral home.';
COMMENT ON COLUMN customer."taxId" IS 'Tax identification number for billing.';
COMMENT ON COLUMN customer."address" IS 'Physical address of the business.';
COMMENT ON COLUMN customer."billingAddress" IS 'Billing address if different from physical address.';
COMMENT ON COLUMN customer."contactEmail" IS 'Primary contact email for the customer.';
COMMENT ON COLUMN customer."website" IS 'Customer website URL.';
COMMENT ON COLUMN customer."isActive" IS 'Whether this customer account is currently active.';
COMMENT ON COLUMN customer."dateCreated" IS 'When this customer record was created.';
COMMENT ON COLUMN customer."dateModified" IS 'When this customer record was last modified.';

CREATE INDEX idx_customer_businessName ON customer("businessName");
CREATE INDEX idx_customer_contactEmail ON customer("contactEmail");

COMMENT ON INDEX idx_customer_businessName IS 'Index on customer.businessName for faster lookups by business name.';
COMMENT ON INDEX idx_customer_contactEmail IS 'Index on customer.contactEmail for faster lookups by contact email.';

ALTER TABLE customer ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only super users can create customers" ON customer
FOR INSERT WITH CHECK ("isSuperuser"(auth.uid()));

CREATE POLICY "Only super users can delete customers" ON customer
FOR DELETE USING ("isSuperuser"(auth.uid()));
