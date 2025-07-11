-- Add customer relationships to existing tables
ALTER TABLE memoir ADD COLUMN "customer" UUID REFERENCES customer(id);
COMMENT ON COLUMN memoir."customer" IS 'The customer this memoir belongs to (for B2B funeral home services).';

ALTER TABLE registrant ADD COLUMN "customer" UUID REFERENCES customer(id);
COMMENT ON COLUMN registrant."customer" IS 'Customer that this registration is associated with (for B2B users).';

-- Add indexes for the new foreign keys
CREATE INDEX idx_memoir_customer ON memoir("customer");
CREATE INDEX idx_registrant_customer ON registrant("customer");

COMMENT ON INDEX idx_memoir_customer IS 'Index on memoir.customer for faster lookups by customer.';
COMMENT ON INDEX idx_registrant_customer IS 'Index on registrant.customer for faster lookups by customer.';
