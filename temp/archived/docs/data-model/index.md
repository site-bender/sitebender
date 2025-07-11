# Data Model Documentation

This section documents the comprehensive PostgreSQL-based data model that serves as the single source of truth for all application types and data structures.

## Architecture Philosophy

**Database-First Type System**: Our PostgreSQL schema is the authoritative source for all TypeScript types. We use `pg-to-ts` (coming soon) to automatically generate TypeScript interfaces, ensuring perfect synchronization between database structure and application code.

### Key Principles

- **Schema as Truth**: The PostgreSQL schema defines all types, constraints, and relationships
- **Generated Types**: TypeScript types are auto-generated from the database schema
- **Rich Constraints**: Extensive use of domains, enums, and check constraints for data integrity
- **Descriptive Design**: Every table, column, and constraint includes comprehensive comments

## Type Generation Workflow

```bash
# When implemented, pg-to-ts will generate types like:
npm run generate-types  # or deno task generate-types

# This will scan the PostgreSQL schema and generate:
# src/types/generated/database.ts - All table interfaces
# src/types/generated/domains.ts  - Custom domain types  
# src/types/generated/enums.ts    - Database enums
```

**🚧 Implementation Status**: The pg-to-ts integration is planned for future implementation. The current database schema in `database/migrations/` is designed to support this workflow, with comprehensive domains, enums, and constraints that will generate rich TypeScript types.

**Why Database-First?**
- Eliminates type drift between database and application
- Leverages PostgreSQL's rich type system and constraints
- Ensures data integrity at the database level
- Enables confident refactoring with compile-time guarantees

## Documentation Sections

### [Data Integrity](./data-integrity/index.md)
How we ensure data consistency, validation, and constraints through PostgreSQL's type system, domains, and check constraints.

### [Access Control](./access-control/index.md) 
Row Level Security (RLS) policies, authentication patterns, and authorization strategies for securing data access.

### [Content Organization](./content-organization/index.md)
How we structure and categorize content, including hierarchical relationships and tagging systems.

### [User Identity](./user-identity/index.md)
User authentication, profile management, and identity verification approaches.

### [Activity Tracking](./activity-tracking/index.md)
Event logging, audit trails, and behavioral analytics captured through database triggers and functions.

### [Data Lifecycle](./data-lifecycle/index.md)
Data creation, updates, archival, and deletion patterns, including soft deletes and historical tracking.

## Adding New Types

When you need new data structures:

1. **Add to Database Schema**: Create new tables, domains, or enums in PostgreSQL migrations
2. **Run Type Generation**: Execute `pg-to-ts` to update TypeScript types
3. **Use Generated Types**: Import and use the auto-generated interfaces in your application code

```sql
-- Example: Adding a new domain in a migration
CREATE DOMAIN email_address AS TEXT
  CHECK (VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Example: Adding a new enum
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
```

After running type generation, these become available as TypeScript types:

```typescript
// Auto-generated from schema
interface User {
  id: string;           // UUID primary key
  email: EmailAddress;  // Custom domain type
  status: ContentStatus; // Enum type
  createdAt: Date;      // timestamptz
}
```

## Current Schema Overview

Our database includes:

- **UUID Primary Keys**: All tables use UUIDs for distributed-friendly identifiers
- **camelCase Naming**: Consistent JavaScript-friendly column naming
- **Rich Domains**: Custom types for emails, URLs, text content, etc.
- **Comprehensive Enums**: Status types, categories, and classification systems
- **Extensive Comments**: Self-documenting schema with detailed explanations
- **Row Level Security**: Fine-grained access control policies
- **Audit Functions**: Automatic tracking of data changes and user actions

> **📖 Related Documentation**  
> - **[Development Guidelines](../../README.md#development-guidelines)** - Database-first development principles
> - **[Testing Methodology](../testing-methodology/index.md)** - How we test database interactions
> - **[Project Setup](../project-setup/index.md)** - Database development environment setup
