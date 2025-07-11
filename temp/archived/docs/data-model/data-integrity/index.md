# Data Integrity

How we ensure data consistency, validation, and constraints through PostgreSQL's advanced type system.

## Philosophy

**Constraints at the Source**: We enforce data integrity rules directly in the database rather than only in application code. This creates a bulletproof foundation that protects data regardless of how it's accessed.

## Implementation Strategies

### Custom Domains

We define reusable data types that carry validation rules across the entire schema:

```sql
-- Email validation at the type level
CREATE DOMAIN email_address AS TEXT
  CHECK (VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- URL validation with protocol enforcement
CREATE DOMAIN web_url AS TEXT
  CHECK (VALUE ~* '^https?://[^\s/$.?#].[^\s]*$');
```

**Benefits:**
- Reusable validation across multiple tables
- Impossible to store invalid data
- Self-documenting schema
- Automatic TypeScript type generation

### Enum Types

Controlled vocabularies that prevent invalid state combinations:

```sql
CREATE TYPE content_status AS ENUM ('draft', 'review', 'published', 'archived');
CREATE TYPE user_role AS ENUM ('reader', 'author', 'editor', 'admin');
```

**Why Enums?**
- Compile-time checking in generated TypeScript
- Database-level constraint enforcement
- Clear, finite set of valid values
- Efficient storage and indexing

### Check Constraints

Complex validation rules that span multiple columns:

```sql
-- Ensure valid date ranges
ALTER TABLE events ADD CONSTRAINT valid_date_range 
  CHECK (start_date <= end_date);

-- Ensure positive quantities
ALTER TABLE inventory ADD CONSTRAINT positive_quantity
  CHECK (quantity >= 0);
```

### Foreign Key Relationships

Referential integrity that prevents orphaned data:

```sql
-- Cascade deletes appropriately
ALTER TABLE comments ADD CONSTRAINT fk_post
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE;

-- Restrict deletes when data would be orphaned  
ALTER TABLE posts ADD CONSTRAINT fk_author
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT;
```

## Generated Type Safety

When `pg-to-ts` processes our schema, these constraints become compile-time guarantees:

```typescript
// Auto-generated from domains
type EmailAddress = string & { readonly __brand: 'EmailAddress' };
type WebUrl = string & { readonly __brand: 'WebUrl' };

// Auto-generated from enums
type ContentStatus = 'draft' | 'review' | 'published' | 'archived';
type UserRole = 'reader' | 'author' | 'editor' | 'admin';

// Auto-generated interfaces with constraint validation
interface User {
  id: string;
  email: EmailAddress;  // Can't be invalid email
  role: UserRole;       // Can't be invalid role
  createdAt: Date;
}
```

## Validation Patterns

### Comprehensive Comments

Every constraint includes documentation explaining its purpose:

```sql
-- Document the business rule
ALTER TABLE users ADD CONSTRAINT unique_email 
  UNIQUE (email);
COMMENT ON CONSTRAINT unique_email ON users IS 
  'Prevents duplicate user accounts with the same email address';
```

### Progressive Enhancement

Start with basic constraints, add complexity as needs emerge:

1. **Basic Types**: Start with standard PostgreSQL types
2. **Add Domains**: Create custom types for repeated patterns
3. **Add Enums**: Define controlled vocabularies
4. **Add Constraints**: Implement complex business rules
5. **Add Triggers**: Handle dynamic validation and updates

## Testing Data Integrity

Our testing methodology validates both constraint enforcement and error handling:

```typescript
// Test that constraints work
test('rejects invalid email addresses', async () => {
  await expect(
    createUser({ email: 'invalid-email' })
  ).rejects.toThrow('violates check constraint');
});

// Test that valid data works
test('accepts valid user data', async () => {
  const user = await createUser({
    email: 'test@example.com',
    role: 'reader'
  });
  expect(user.id).toBeDefined();
});
```

> **📖 Related Documentation**  
> - **[Testing Methodology](../../testing-methodology/index.md)** - How we test database constraints
> - **[Data Lifecycle](../data-lifecycle/index.md)** - How constraints affect CRUD operations
> - **[Access Control](../access-control/index.md)** - Security constraints and RLS policies
