# Branded Types (Newtypes) Pattern

## Purpose

Branded types create distinct types from primitives without runtime cost, preventing accidental mixing of semantically different values that share the same underlying type.

## The Problem

TypeScript treats all strings as interchangeable:

```typescript
const userId: string = "user123"
const email: string = "user@example.com"
const postId: string = "post456"

function getUser(id: string) { ... }

getUser(email)  // TypeScript allows this! Wrong semantics, no error.
```

## The Solution

Create distinct types using intersection with a brand:

```typescript
type UserId = string & { readonly __brand: 'UserId' }
type Email = string & { readonly __brand: 'Email' }
type PostId = string & { readonly __brand: 'PostId' }

function getUser(id: UserId) { ... }

getUser(email)  // TypeScript ERROR: Email is not assignable to UserId
```

## Standard Pattern

### 1. Define the Brand

```typescript
// Simple brand (single primitive)
type UserId = string & { readonly __brand: 'UserId' }
type Age = number & { readonly __brand: 'Age' }

// Brand with additional validation info in the type
type Email = string & { readonly __brand: 'Email', readonly __validated: true }
```

### 2. Smart Constructor (Returns Result)

For simple brands that can fail validation:

```typescript
function userId(str: string): Result<UserId, ValidationError> {
  if (isNotEmpty(str) && lt(50)(length(str))) {
    return ok(str as UserId)
  }
  return error({
    _tag: 'ValidationError',
    field: 'userId',
    message: 'UserId must be 1-50 characters'
  })
}
```

For complex types with multiple validation rules, use Validation to accumulate errors:

```typescript
function emailAddress(s: string): Validation<Email, ValidationError> {
  const errors = [
    isEmpty(s) && { _tag: 'ValidationError', field: 'email', message: 'Email required' },
    doesNotInclude('@')(s) && { _tag: 'ValidationError', field: 'email', message: 'Email must contain @' },
    isLongerThan(255)(length(s)) && { _tag: 'ValidationError', field: 'email', message: 'Email too long' }
  ].filter(Boolean) as Array<ValidationError>
  
  return isNotEmpty(errors)
    ? failure(errors)
    : success(s as Email)
}
```

### 3. Unsafe Constructor (For Trusted Sources)

When reading from database or other trusted source where validation already occurred:

```typescript
function unsafeUserId(s: string): UserId {
  return s as UserId
}

// Usage: Reading from database (already validated on write)
const user = await db.query('SELECT id FROM users')
const id: UserId = unsafeUserId(user.id)
```

**Naming Convention**: Always prefix with `unsafe` to make the escape hatch explicit.

### 4. Unwrap to Raw Value

When you need the underlying primitive (for API responses, database queries, etc.):

```typescript
function unwrapUserId(id: UserId): string {
  return id as string
}

// Usage: Passing to external API
fetch(`/api/users/${unwrapUserId(userId)}`)
```

**Naming Convention**: Prefix with `unwrap` followed by the type name.

## Key Benefits

1. **Type Safety**: Can't accidentally pass Email where UserId is expected
2. **Zero Runtime Cost**: The brand doesn't exist at runtime, only compile time
3. **Self-Documenting**: Function signature shows exactly what type of value it expects
4. **Validation at Creation**: Once branded, the value is known to be valid

## Guidelines

### When to Use Branded Types

✅ **Use for domain identifiers**
- UserId, PostId, OrderId, etc.
- Prevents mixing different ID types

✅ **Use for validated primitives**
- Email, PhoneNumber, Url
- Validation happens once, type system enforces everywhere

✅ **Use for units and measurements**
- Meters, Kilometers, Seconds
- Prevents unit confusion bugs

✅ **Use for constrained values**
- NonEmptyString, PositiveNumber
- Type system enforces constraints

❌ **Don't use for temporary values**
- Intermediate calculations
- Internal implementation details

❌ **Don't over-brand**
- Not every string needs a brand
- Use for semantically distinct concepts only

### Validation Strategy

**Rule**: Validate at creation, trust the brand afterward.

```typescript
// At the boundary (user input, API response)
const userResult = userId(rawInput)  // Returns Result<UserId, Error>

// Inside the system, types guarantee validity
function getUser(id: UserId): Promise<Result<User, DbError>> {
  // No validation needed - id is already valid by type
  return findById(unUserId(id))(db)
}
```

### Composition

When a function needs multiple branded types:

```typescript
function transferMoney(from: AccountId) {
  return function transferMoneyWithFromAccountId(to: AccountId) {
    return function transferMoneyWithFromAccountIdAndToAccountId(
      amount: PositiveNumber
    ): Result<Transaction, TransferError> {
      // implementation here
    }
  }
}
```

The type signature makes requirements explicit.

## Integration with Toolsmith

### Proposed Location

```
libraries/toolsmith/src/
  types/
    branded/
      index.ts              # Core brand utilities
      userId/
        index.ts            # UserId type and smart constructor
      emailAddress/
        index.ts            # EmailAddress type and smart constructor
      positiveNumber/
        index.ts            # PositiveNumber type and smart constructor
```

### Required Utilities

Create generic helpers for working with branded types:

```typescript
// Generic brand type helper
type Brand<K, T> = K & { readonly __brand: T }

// Generic unsafe constructor
function unsafeBrand<K, T>(value: K): Brand<K, T> {
  return value as Brand<K, T>
}

// Generic unwrap
function unwrapBrand<K, T>(branded: Brand<K, T>): K {
  return branded as K
}

// Refinement predicates for validation
type Refinement<A, B extends A> = (a: A) => a is B

// Smart constructor from refinement
function refine<A, B extends A, E>(refinement: Refinement<A, B>) {
  return function refineWithRefinement(error: (a: A) => E) {
    return function refineWithRefinementAndError(a: A): Result<B, E> {
      return refinement(a) ? success(a) : failure(error(a))
    }
  }
}
```

## Examples

### User ID

```typescript
type UserId = Brand<string, 'UserId'>

function isValidUserId(str: string): str is UserId {
  return isNotEmpty(str) && isLongerThan(50)(str) && matches(/^[a-zA-Z0-9_-]+$/)(str)
}

function userId(str: string): Result<UserId, ValidationError> {
  return refine(isValidUserId)(
    function createUserIdError() {
      return { _tag: 'ValidationError', field: 'userId', message: 'Invalid user ID format' }
    }
  )(str)
}

const unsafeUserId = unsafeBrand<string, 'UserId'>
const unwrapUserId = unwrapBrand<string, 'UserId'>
```

### Email

```typescript
type EmailAddress = Brand<string, 'EmailAddress'>

function isValidEmailAddress(str: string): str is EmailAddress {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return isNotEmpty(str) && isNoLongerThan(255)(str)&& match(emailRegex)(str)
}

function emailAddress(str: string): Result<EmailAddress, ValidationError> {
  return refine(isValidEmailAddress)(
    function createEmailAddressError() {
      return { _tag: 'ValidationError', field: 'emailAddress', message: 'Invalid email address format' }
    }
  )(str)
}

const unsafeEmailAddress = unsafeBrand<string, 'EmailAddress'>
const unwrapEmailAddress = unwrapBrand<string, 'EmailAddress'>
```

### Positive Number

```typescript
type PositiveNumber = Brand<number, 'PositiveNumber'>

function isPositiveNumber(n: number): n is PositiveNumber {
  return gt(0)(n) && isFinite(n)
}

function positiveNumber(n: number): Result<PositiveNumber, ValidationError> {
  return refine(isPositiveNumber)(
    function createPositiveNumberError() {
      return { _tag: 'ValidationError', field: 'number', message: 'Number must be positive' }
    }
  )(n)
}

const unsafePositiveNumber = unsafeBrand<number, 'PositiveNumber'>
const unwrapPositiveNumber = unwrapBrand<number, 'PositiveNumber'>
```

## Anti-Patterns

❌ **Don't bypass smart constructors without "unsafe"**
```typescript
// WRONG - no validation, no "unsafe" in name
function userId(str: string): UserId {
  return str as UserId
}
```

❌ **Don't mix raw and branded types**
```typescript
// WRONG - accepting both defeats the purpose
function getUser(id: UserId | string) { ... }
```

❌ **Don't rebrand without validation**
```typescript
// WRONG - if validation already happened, use unsafe constructor
function convertEmailAddressToUserId(emailAddress: EmailAddress): UserId {
  return userId(unwrapEmailAddress(emailAddress))  // This will fail if emailAddress isn't valid userId format
}

// RIGHT - only if emailAddress format is valid userId format
function convertEmailAddressAddressToUserId(emailAddress: EmailAddress): UserId {
  return unsafeUserId(unwrapEmailAddress(emailAddress))
}
```

✅ **Do validate at boundaries**
```typescript
// RIGHT - validate user input
app.post('/users', async (req, res) => {
  const idResult = userId(req.body.id)
  
  return matchResult(
    function handleSuccess(id) {
      return createUser(id)
    }
  )(
    function handleError(err) {
      return res.status(400).json({ error: err.message })
    }
  )(idResult)
})
```

## Testing Strategy

Test the smart constructors:

```typescript
Deno.test('userId rejects empty string', () => {
  const result = userId('')
  
  assertEquals(result._tag, 'Err')
})

Deno.test('userId accepts valid format', () => {
  const result = userId('user_123')
  
  assertEquals(result._tag, 'Ok')
})
```

Don't test the type system itself—TypeScript guarantees brand separation.

## Migration Path

1. Identify domain concepts that are currently `string` or `number` but semantically distinct
2. Create branded types for these concepts
3. Add smart constructors with validation
4. Update function signatures to use branded types
5. Add validation at boundaries (API inputs, database reads from external sources)
6. Use unsafe constructors only for trusted internal sources

## Summary

Branded types provide compile-time safety without runtime cost. Follow the pattern:
1. Define brand with intersection type
2. Smart constructor validates and returns Result/Validation
3. Unsafe constructor for trusted sources (explicitly named)
4. Unwrap function for extracting raw value
5. Validate once at creation, trust the brand everywhere else
