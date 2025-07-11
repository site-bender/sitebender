# Development Guidelines

This document covers development practices, code structure, and implementation patterns. For core philosophy and principles, see [essentials.md](./essentials.md). For testing practices, see [testing.md](./testing.md). For deployment, see [deployment.md](./deployment.md).

## Development Workflow

### BDD Process - THE FUNDAMENTAL PRACTICE

**CRITICAL**: BDD is not optional. Every feature, every bug fix, every change MUST follow this process:

Follow Red-Green-Refactor strictly:

1. **Red**: Write a failing test for the desired behavior. NO PRODUCTION CODE until you have a failing test.
2. **Green**: Write the MINIMUM code to make the test pass. Resist the urge to write more than needed.
3. **Refactor**: Assess the code for improvement opportunities. If refactoring would add value, clean up the code while keeping tests green. If the code is already clean and expressive, move on.

**Common BDD Violations to Avoid:**

- Writing production code without a failing test first
- Writing multiple tests before making the first one pass
- Writing more production code than needed to pass the current test
- Skipping the refactor assessment step when code could be improved
- Adding functionality "while you're there" without a test driving it

**Remember**: If you're typing production code and there isn't a failing test demanding that code, you're not doing BDD.

#### BDD Example Workflow

```typescript
// Step 1: Red - Start with the simplest behavior
describe("Order processing", () => {
  it("should calculate total with shipping cost", () => {
    const order = createOrder({
      items: [{ price: 30, quantity: 1 }],
      shippingCost: 5.99,
    });

    const processed = processOrder(order);

    expect(processed.total).toBe(35.99);
    expect(processed.shippingCost).toBe(5.99);
  });
});

// Step 2: Green - Minimal implementation
const processOrder = (order: Order): ProcessedOrder => {
  const itemsTotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    ...order,
    shippingCost: order.shippingCost,
    total: itemsTotal + order.shippingCost,
  };
};

// Step 3: Red - Add test for free shipping behavior
describe("Order processing", () => {
  it("should calculate total with shipping cost", () => {
    // ... existing test
  });

  it("should apply free shipping for orders over £50", () => {
    const order = createOrder({
      items: [{ price: 60, quantity: 1 }],
      shippingCost: 5.99,
    });

    const processed = processOrder(order);

    expect(processed.shippingCost).toBe(0);
    expect(processed.total).toBe(60);
  });
});

// Step 4: Green - NOW we can add the conditional because both paths are tested
const processOrder = (order: Order): ProcessedOrder => {
  const itemsTotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = itemsTotal > 50 ? 0 : order.shippingCost;

  return {
    ...order,
    shippingCost,
    total: itemsTotal + shippingCost,
  };
};

// Step 5: Add edge case tests to ensure 100% behavior coverage
describe("Order processing", () => {
  // ... existing tests

  it("should charge shipping for orders exactly at £50", () => {
    const order = createOrder({
      items: [{ price: 50, quantity: 1 }],
      shippingCost: 5.99,
    });

    const processed = processOrder(order);

    expect(processed.shippingCost).toBe(5.99);
    expect(processed.total).toBe(55.99);
  });
});

// Step 6: Refactor - Extract constants and improve readability
const FREE_SHIPPING_THRESHOLD = 50;

const calculateItemsTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const qualifiesForFreeShipping = (itemsTotal: number): boolean => {
  return itemsTotal > FREE_SHIPPING_THRESHOLD;
};

const processOrder = (order: Order): ProcessedOrder => {
  const itemsTotal = calculateItemsTotal(order.items);
  const shippingCost = qualifiesForFreeShipping(itemsTotal)
    ? 0
    : order.shippingCost;

  return {
    ...order,
    shippingCost,
    total: itemsTotal + shippingCost,
  };
};
```

### Refactoring - The Critical Third Step

Evaluating refactoring opportunities is not optional - it's the third step in the BDD cycle. After achieving a green state and committing your work, you MUST assess whether the code can be improved. However, only refactor if there's clear value - if the code is already clean and expresses intent well, move on to the next test.

#### What is Refactoring?

Refactoring means changing the internal structure of code without changing its external behavior. The public API remains unchanged, all tests continue to pass, but the code becomes cleaner, more maintainable, or more efficient. Remember: only refactor when it genuinely improves the code - not all code needs refactoring.

#### When to Refactor

- **Always assess after green**: Once tests pass, before moving to the next test, evaluate if refactoring would add value
- **When you see duplication**: But understand what duplication really means (see DRY below)
- **When names could be clearer**: Variable names, function names, or type names that don't clearly express intent
- **When structure could be simpler**: Complex conditional logic, deeply nested code, or long functions
- **When patterns emerge**: After implementing several similar features, useful abstractions may become apparent

**Remember**: Not all code needs refactoring. If the code is already clean, expressive, and well-structured, commit and move on. Refactoring should improve the code - don't change things just for the sake of change.

#### Refactoring Guidelines

##### 1. Commit Before Refactoring

Always commit your working code before starting any refactoring. This gives you a safe point to return to:

```bash
git add .
git commit -m "feat: add payment validation"
# Now safe to refactor
```

##### 2. Look for Useful Abstractions Based on Semantic Meaning

Create abstractions only when code shares the same semantic meaning and purpose. Don't abstract based on structural similarity alone - **duplicate code is far cheaper than the wrong abstraction**.

```typescript
// Similar structure, DIFFERENT semantic meaning - DO NOT ABSTRACT
const validatePaymentAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000;
};

const validateTransferAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000;
};

// These might have the same structure today, but they represent different
// business concepts that will likely evolve independently.
// Payment limits might change based on fraud rules.
// Transfer limits might change based on account type.
// Abstracting them couples unrelated business rules.

// Similar structure, SAME semantic meaning - SAFE TO ABSTRACT
const formatUserDisplayName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

const formatCustomerDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`.trim();
};

const formatEmployeeDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`.trim();
};

// These all represent the same concept: "how we format a person's name for display"
// They share semantic meaning, not just structure
const formatPersonDisplayName = (
  firstName: string,
  lastName: string
): string => {
  return `${firstName} ${lastName}`.trim();
};
```

**Questions to ask before abstracting:**

- Do these code blocks represent the same concept or different concepts that happen to look similar?
- If the business rules for one change, should the others change too?
- Would a developer reading this abstraction understand why these things are grouped together?
- Am I abstracting based on what the code IS (structure) or what it MEANS (semantics)?

**Remember**: It's much easier to create an abstraction later when the semantic relationship becomes clear than to undo a bad abstraction that couples unrelated concepts.

##### 3. Understanding DRY - It's About Knowledge, Not Code

DRY (Don't Repeat Yourself) is about not duplicating **knowledge** in the system, not about eliminating all code that looks similar.

```typescript
// This is NOT a DRY violation - different knowledge despite similar code
const validateUserAge = (age: number): boolean => {
  return age >= 18 && age <= 100;
};

const validateProductRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5;
};

const validateYearsOfExperience = (years: number): boolean => {
  return years >= 0 && years <= 50;
};

// These functions have similar structure (checking numeric ranges), but they
// represent completely different business rules:
// - User age has legal requirements (18+) and practical limits (100)
// - Product ratings follow a 1-5 star system
// - Years of experience starts at 0 with a reasonable upper bound
// Abstracting them couples unrelated business concepts and makes future
// changes harder. What if ratings change to 1-10? What if legal age changes?

// This IS a DRY violation - same knowledge in multiple places
const calculateOrderTotal = (order: Order): number => {
  const itemsTotal = order.items.reduce((sum, item) => sum + item.price, 0);
  return itemsTotal + shippingCost;
};

const getOrderSummaryShipping = (itemsTotal: number): number => {
  return itemsTotal > 50 ? 0 : 5.99; // Same knowledge!
};

const calculateShippingRate = (orderAmount: number): number => {
  return orderAmount > 50 ? 0 : 5.99; // Same knowledge duplicated!
};

// Extract the shared knowledge
const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_COST = 5.99;

const calculateShippingCost = (orderAmount: number): number => {
  return orderAmount > FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
};
```

## Code Structure

### Functional Programming

I follow a "functional light" approach:

- **No data mutation** - work with immutable data structures
- **Pure functions** wherever possible
- **Composition** as the primary mechanism for code reuse
- Avoid heavy FP abstractions (no need for complex monads, lenses, etc.) unless there is a clear advantage to using them
- Use array methods (`map`, `filter`, `reduce`) over imperative loops
  - When we need a built-in method, such as `Array.prototype.map`, we will create a custom *curried* (where practicable) utility function in `src/utilities`
  - Example:

```typescript
const map =
	<T, U>(mapper: (value: T) => U) =>
	(arr: Array<T>): Array<U> =>
		arr.map(mapper)

export default map
```

#### Examples of Functional Patterns

```typescript
// Good - Pure function with immutable updates. Note that it is curried properly.
const applyDiscount = (discountPercent: number) => (order: Order): Order => {
  return {
    ...order,
    items: order.items.map((item) => ({
      ...item,
      price: item.price * (1 - discountPercent / 100),
    })),
    totalPrice: order.items.reduce(
      (sum, item) => sum + item.price * (1 - discountPercent / 100),
      0
    ),
  };
};

// Good - Composition over complex logic
// Prefer pipe to compose for readability
const processOrder = (order: Order): ProcessedOrder => {
  return pipe(
    order,
    validateOrder,
    applyPromotions,
    calculateTax,
    assignWarehouse
  );
};

// When heavy FP abstractions ARE appropriate:
// - Complex async flows that benefit from Task/IO types
// - Error handling chains that benefit from Result/Either types
// Example with Result type for complex error handling:
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

// Note that the use of pipe contributes to easy readability
const chainPaymentOperations = (
  payment: Payment
): Result<Receipt, PaymentError> => {
  return pipe(
    validatePayment(payment),
    chain(authorizePayment),
    chain(capturePayment),
    map(generateReceipt)
  );
};
```

### Currying Guidelines

**When to Use Currying:**

- **Configuration functions**: When you need to create specialized versions of a function
- **Utility functions**: Array/object manipulation functions that benefit from partial application
- **Event handlers**: When you need to bind specific parameters
- **Validation functions**: When building reusable validators

**When NOT to Curry:**

- **Simple data transformations**: Single-use functions with all parameters available
- **Database operations**: Functions that use all parameters in a single operation
- **Complex business logic**: Functions where partial application doesn't add clarity

**Currying Structure:**

```typescript
// ✅ GOOD - Clear currying pattern
const filterByStatus = (status: OrderStatus) => (orders: Order[]): Order[] => {
  return orders.filter(order => order.status === status);
};

const findPendingOrders = filterByStatus('pending');
const findCompletedOrders = filterByStatus('completed');

// ✅ GOOD - Multi-parameter currying
const updateUserField = 
  (field: keyof User) => 
  (value: unknown) => 
  (user: User): User => ({
    ...user,
    [field]: value,
  });

const updateUserEmail = updateUserField('email');
const setUserActive = updateUserField('isActive')(true);

// ❌ AVOID - Unnecessary currying for simple operations
const addNumbers = (a: number) => (b: number): number => a + b; // Just use: (a: number, b: number) => a + b

// ❌ AVOID - Currying complex functions that don't benefit from partial application
// This should use an options object instead
const processPaymentWithCurrying = 
  (amount: number) => 
  (card: CreditCard) => 
  (customer: Customer) => 
  (merchantId: string): Promise<PaymentResult> => {
    // Complex payment logic here
  };
```

**Utility Function Currying:**

```typescript
// Standard array utilities (create these in src/utilities/)
const map = <T, U>(mapper: (value: T) => U) => (arr: T[]): U[] => 
  arr.map(mapper);

const filter = <T>(predicate: (value: T) => boolean) => (arr: T[]): T[] => 
  arr.filter(predicate);

const find = <T>(predicate: (value: T) => boolean) => (arr: T[]): T | undefined => 
  arr.find(predicate);

// Object utilities
const pick = <T, K extends keyof T>(keys: K[]) => (obj: T): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
};

// Usage examples
const getActiveUsers = filter((user: User) => user.isActive);
const getUserEmails = map((user: User) => user.email);
const pickUserInfo = pick(['id', 'email', 'name'] as const);
```

### Code Structure Guidelines

- **No nested if/else statements** - use early returns, guard clauses, or composition
- **Avoid deep nesting** in general (max 2 levels)
- Keep functions small and focused on a *single responsibility*
  - Twenty lines is a good target for *maximum* function length, but longer is possible if it remains clear and focused.
- Prefer flat, readable code over clever abstractions

### Prefer Options Objects

Use options objects for function parameters as the default pattern. Only use positional parameters when there's a clear, compelling reason (e.g., single-parameter pure functions, well-established conventions like `map(item => item.value)`).

**But** avoid options objects for very simple functions where a single parameter is sufficient. And curry utility functions as appropriate. And options object should probably be the first parameter in a curried function, so we can partially apply it and then reuse it later. Naturally, the object to which we apply the function (e.g, an array) should be the last parameter.

```typescript
// Avoid: Multiple positional parameters
const createPayment = (
  amount: number,
  currency: string,
  cardId: string,
  customerId: string,
  description?: string,
  metadata?: Record<string, unknown>,
  idempotencyKey?: string
): Payment => {
  // implementation
};

// Calling it is unclear
const payment = createPayment(
  100,
  "GBP",
  "card_123",
  "cust_456",
  undefined,
  { orderId: "order_789" },
  "key_123"
);

// Good: Options object with clear property names
type CreatePaymentOptions = {
  amount: number;
  currency: string;
  cardId: string;
  customerId: string;
  description?: string;
  metadata?: Record<string, unknown>;
  idempotencyKey?: string;
};

const createPayment = (options: CreatePaymentOptions): Payment => {
  const {
    amount,
    currency,
    cardId,
    customerId,
    description,
    metadata,
    idempotencyKey,
  } = options;

  // implementation
};

// Clear and readable at call site
const payment = createPayment({
  amount: 100,
  currency: "GBP",
  cardId: "card_123",
  customerId: "cust_456",
  metadata: { orderId: "order_789" },
  idempotencyKey: "key_123",
});

// Acceptable: Single parameter for simple transforms
const double = (n: number): number => n * 2;
const getName = (user: User): string => user.name;

// Acceptable: Well-established patterns
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
const users = fetchUsers();
const names = users.map((user) => user.name);
```

**Guidelines for options objects:**

- Default to options objects unless there's a specific reason not to
- Always use for functions with optional parameters
- Destructure options at the start of the function for clarity
- Provide sensible defaults using destructuring
- Keep related options grouped (e.g., all shipping options together)
- Consider breaking very large options objects into nested groups

**When positional parameters are acceptable:**

- Single-parameter pure functions
- Well-established functional patterns (map, filter, reduce callbacks)
- Mathematical operations where order is conventional

But remember to curry!

## TypeScript Guidelines

### Strict Mode Requirements

```json
// tsconfig.json or deno.json compilerOptions
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

- **No `any`** - ever. Use `unknown` if type is truly unknown
- **No type assertions** (`as SomeType`) *unless absolutely necessary* with clear justification
- **No `@ts-ignore`** or `@ts-expect-error` without *explicit* explanation
- These rules apply to test code as well as production code

### Type Definitions

- **Prefer `type` over `interface`** in all cases
- Use explicit typing where it aids clarity, but leverage inference where appropriate
- Utilize utility types effectively (`Pick`, `Omit`, `Partial`, `Required`, etc.)
- Create domain-specific types (e.g., `UserId`, `PaymentId`) for type safety
- Use PostgreSQL domains and constraints as the single source of truth for data validation
- Generate TypeScript types from database schema to maintain consistency

```typescript
// Good - Generated from PostgreSQL domains
type URL = string & { readonly __brand: 'URL' };
type EmailAddress = string & { readonly __brand: 'EmailAddress' };
type UserId = string & { readonly __brand: 'UserId' };

// Avoid - Manually defined types that can drift from database
type UserId = string;
type PaymentAmount = number;
```

#### Database-First Development with PostgreSQL Domains

Always define your data constraints in the database first, then derive types and validation from them:

```sql
-- Define domains in PostgreSQL - single source of truth for validation
CREATE DOMAIN "URL" AS VARCHAR(8192)
CHECK (VALUE ~ '^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$');

CREATE DOMAIN "EmailAddress" AS VARCHAR(254)
CHECK (VALUE ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

CREATE DOMAIN "UserId" AS UUID;

-- Use domains in table definitions
CREATE TABLE users (
  id "UserId" PRIMARY KEY DEFAULT gen_random_uuid(),
  email "EmailAddress" NOT NULL UNIQUE,
  website "URL",
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

```typescript
// Generated types from database schema introspection (via pg-to-ts)
type URL = string & { readonly __brand: 'URL' };
type EmailAddress = string & { readonly __brand: 'EmailAddress' };
type UserId = string & { readonly __brand: 'UserId' };

type User = {
  id: UserId;
  email: EmailAddress;
  website?: URL;
  createdAt: Date;
};

// Server-side database operations with postgres.js
import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";
import type { User } from "../types/database/index.ts";

const sql = postgres(Deno.env.get("DATABASE_URL")!);

const getUserById = async (id: UserId): Promise<User | null> => {
  const [user] = await sql<User[]>`
    SELECT id, email, website, created_at
    FROM "users" 
    WHERE id = ${id}
    LIMIT 1
  `;
  return user || null;
};

// Client-side validation extracted from database constraints
// (Optional - for progressive enhancement before server validation)
const validateEmail = (email: string): email is EmailAddress => {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
};

const validateURL = (url: string): url is URL => {
  return /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(url);
};
```

#### Database Schema as Single Source of Truth

The database schema drives everything in the application:

1. **Database Schema**: PostgreSQL domains and constraints define validation rules (single source of truth)
2. **Type Generation**: TypeScript types generated from database via pg-to-ts introspection
3. **Runtime Validation**: PostgreSQL enforces all validation through domains/constraints/triggers
4. **Type Safety**: postgres.js provides compile-time type checking for queries
5. **Client Validation**: Optional progressive enhancement using patterns extracted from database constraints

**Key Insight**: PostgreSQL IS the validation layer. No separate validation library needed.

```sql
-- Database enforces validation
INSERT INTO users (email) VALUES ('invalid-email'); 
-- ERROR: new row for relation "users" violates check constraint "email_check"

-- postgres.js catches this as a typed error
try {
  await createUser({ email: 'invalid-email' });
} catch (error) {
  // Handle constraint violation with full type information
}
```

### Type Generation Process

**Database-First Type Generation:**

- PostgreSQL domains and constraints define the authoritative data validation rules
- TypeScript types are generated from the database schema using pg-to-ts (Deno-compatible)
- Generated types live in `src/types/database/index.ts` (auto-generated, never manually edited)
- Database schema changes trigger automatic type regeneration during build
- All application code uses these generated types exclusively

**Type Generation Workflow:**

```bash
# Generate types directly from database schema using pg-to-ts
deno run --allow-net --allow-write https://esm.sh/pg-to-ts@latest \
  -c $DATABASE_URL \
  -o ./src/types/database/index.ts
```

**Using Generated Types:**

```typescript
import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";
import type { User, PaymentRequest } from "../types/database/index.ts";

const sql = postgres(Deno.env.get("DATABASE_URL")!);

// Type-safe queries using generated types directly
const getUserById = async (id: string): Promise<User | null> => {
  const [user] = await sql<User[]>`
    SELECT id, email, website, created_at
    FROM "users" 
    WHERE id = ${id}
    LIMIT 1
  `;
  return user || null;
};

// Insert with type safety from database schema
const createPaymentRequest = async (data: PaymentRequest): Promise<PaymentRequest> => {
  const [payment] = await sql<PaymentRequest[]>`
    INSERT INTO "payment_requests" (amount, card_account_id, source)
    VALUES (${data.amount}, ${data.cardAccountId}, ${data.source})
    RETURNING *
  `;
  return payment;
};

// Validation happens at database level through domains/constraints
// No need for separate validation layer
```

**Integration with Build Process:**

- Type generation runs as part of the build pipeline
- CI/CD fails if types are out of sync with database schema
- Local development includes type checking against current schema
- No manual type definitions for database entities

**CRITICAL**: Tests must use real types generated from the database schema, not redefine their own.

```typescript
// ❌ WRONG - Defining types in test files
type ProjectSchema = {
  id: string;
  workspaceId: string;
  ownerId: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

// ✅ CORRECT - Import types from the generated schema package
import { type Project } from "@/types/database/index.ts";
```

**Why this matters:**

- **Type Safety**: Ensures tests use the same types as production code derived from database
- **Consistency**: Changes to database schema automatically propagate to tests through regeneration
- **Maintainability**: Single source of truth for data structures in the database
- **Prevents Drift**: Tests can't accidentally diverge from real database schema

**Implementation:**

- All domain types should be generated from database schema introspection
- Test files should import types from the generated location
- If a type isn't generated yet, update the schema generation rather than duplicating it
- Mock data factories should use the real types derived from real database schema

```typescript
// ✅ CORRECT - Test factories using real database-generated types
import { type Project } from "@/types/database/index.ts";

const getMockProject = (overrides?: Partial<Project>): Project => {
  const baseProject = {
    id: "proj_123" as ProjectId,
    workspaceId: "ws_456" as WorkspaceId,
    ownerId: "user_789" as UserId,
    name: "Test Project",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const projectData = { ...baseProject, ...overrides };

  // Type validation happens at database level when inserted
  return projectData;
};
```

## Validation Strategy: Database-First

**Core Principle**: PostgreSQL domains and constraints are the single source of truth for all data validation.

**Architecture**: Edge functions handle all external service validation before data reaches the client, making additional validation layers unnecessary.

**Validation Approach:**
- ❌ **No separate validation libraries needed** - PostgreSQL handles all validation
- ❌ **No form validation libraries** - Extract patterns from database constraints instead  
- ❌ **No schema validation libraries** - Use pg-to-ts database introspection
- ❌ **No server-side validation libraries** - Let database constraints handle validation
- ❌ **No client-side validation libraries** - Edge functions validate external services before client interaction

**Recommended Approach:**
```typescript
// ✅ GOOD - Let database handle validation
const createUser = async (userData: CreateUserRequest): Promise<User> => {
  try {
    const [user] = await sql<User[]>`
      INSERT INTO "users" (email, name)
      VALUES (${userData.email}, ${userData.name})
      RETURNING *
    `;
    return user;
  } catch (error) {
    // Handle constraint violations with meaningful error messages
    if (error.constraint === 'users_email_check') {
      throw new ValidationError('Invalid email format');
    }
    throw error;
  }
};

// Database-first validation - no additional libraries needed
```

## Build Process with Deno

**Project Configuration:**

Use `deno.json` for project configuration and task definitions:

```json
{
  "name": "@dasl/app",
  "version": "1.0.0",
  "exports": "./src/main.ts",
  "tasks": {
    "build": "deno run --allow-all scripts/build/index.ts",
    "build:types": "deno run --allow-net --allow-write https://esm.sh/pg-to-ts@latest -c $DATABASE_URL -o ./src/types/database/index.ts",
    "dev": "deno run --allow-all --watch scripts/dev/index.ts",
    "test": "deno test --allow-all src/",
    "test:watch": "deno test --allow-all --watch src/",
    "test:cov": "deno test --allow-all --coverage=coverage src/",
    "lint": "deno lint src/ scripts/",
    "fmt": "deno fmt src/ scripts/",
    "fmt:check": "deno fmt --check src/ scripts/",
    "check": "deno check src/**/*.ts scripts/**/*.ts",
    "serve": "deno run --allow-all dist/server.js"
  },
  "imports": {
    "@/": "./src/",
    "@/types/": "./src/types/",
    "@/components/": "./src/components/",
    "@/utilities/": "./src/utilities/"
  },
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx",
    "jsxImportSource": "@/types/jsx.d.ts"
  },
  "lint": {
    "rules": {
      "tags": ["recommended"],
      "include": ["ban-untagged-todo"]
    }
  },
  "fmt": {
    "useTabs": true,
    "lineWidth": 100,
    "indentWidth": 2,
    "semiColons": true,
    "singleQuote": false,
    "proseWrap": "preserve"
  }
}
```

**Development Workflow:**

```bash
# Install Deno (if not already installed)
curl -fsSL https://deno.land/install.sh | sh

# Generate types from database
deno task build:types

# Start development server with file watching
deno task dev

# Run tests with coverage
deno task test:cov

# Build for production
deno task build

# Format and lint
deno task fmt
deno task lint
deno task check
```

**Build Pipeline Integration:**

```bash
#!/bin/bash
# CI/CD Pipeline Script

# 1. Type Safety Check
deno task check || exit 1

# 2. Generate types from database
deno task build:types || exit 1

# 3. Verify types are up to date
git diff --exit-code src/types/database/index.ts || {
  echo "Database types are out of sync!"
  exit 1
}

# 4. Run tests with coverage
deno task test:cov || exit 1

# 5. Lint and format check
deno task lint || exit 1
deno task fmt:check || exit 1

# 6. Build application
deno task build || exit 1
```

## No Comments in Code

Code should be self-documenting through clear naming and structure. Comments indicate that the code itself is not clear enough.

```typescript
// Avoid: Comments explaining what the code does
const calculateDiscount = (price: number) => (customer: Customer): number => {
  // Check if customer is premium
  if (customer.tier === "premium") {
    // Apply 20% discount for premium customers
    return price * 0.8;
  }
  // Regular customers get 10% discount
  return price * 0.9;
};

// Good: Self-documenting code with clear names
const PREMIUM_DISCOUNT_MULTIPLIER = 0.8;
const STANDARD_DISCOUNT_MULTIPLIER = 0.9;

const isPremiumCustomer = (customer: Customer): boolean => {
  return customer.tier === "premium";
};

const calculateDiscount = (price: number) => (customer: Customer): number => {
  const discountMultiplier = isPremiumCustomer(customer)
    ? PREMIUM_DISCOUNT_MULTIPLIER
    : STANDARD_DISCOUNT_MULTIPLIER;

  return price * discountMultiplier;
};

// Avoid: Complex logic with comments
const processPayment = (payment: Payment): ProcessedPayment => {
  // First validate the payment
  if (!validatePayment(payment)) {
    throw new Error("Invalid payment");
  }

  // Check if we need to apply 3D secure
  if (payment.amount > 100 && payment.card.type === "credit") {
    // Apply 3D secure for credit cards over £100
    const securePayment = apply3DSecure(payment);
    // Process the secure payment
    return executePayment(securePayment);
  }

  // Process the payment
  return executePayment(payment);
};

// Good: Extract to well-named functions
const requires3DSecure = (payment: Payment): boolean => {
  const SECURE_PAYMENT_THRESHOLD = 100;
  return (
    payment.amount > SECURE_PAYMENT_THRESHOLD && payment.card.type === "credit"
  );
};

const processPayment = (payment: Payment): ProcessedPayment => {
  if (!validatePayment(payment)) {
    throw new PaymentValidationError("Invalid payment");
  }

  const securedPayment = requires3DSecure(payment)
    ? apply3DSecure(payment)
    : payment;

  return executePayment(securedPayment);
};
```

**Exception**: JSDoc comments for public APIs are acceptable when generating documentation, but the code should still be self-explanatory without them.

### Function Export and Declaration Policy

- All named functions must be exported as default using `export default function functionName(...) {}`.
- Use anonymous functions only for small inline callbacks or when returning a function from another function.
- Curried functions should use arrow function syntax and be exported as default.
- **Group all single-line const assignments at the top (as practicable), then a blank line. Add blank lines around any multiline blocks (if, loops, etc.), but not at the start or end of a block.**
