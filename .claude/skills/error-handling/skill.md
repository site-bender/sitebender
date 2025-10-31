---
name: error-handling
description: Patterns for error handling using Result<T,E> and Validation<T,E> monads. Never use try/catch/throw. Covers error type design, error constructors, and error composition. Use when handling errors or defining error types. Includes script for generating error types.
---

# Error Handling

## Core Principle

**Never use exceptions. All errors are values.**

Errors are not exceptional - they are expected outcomes that must be handled explicitly. Use Result<T,E> for operations that can fail, Validation<T,E> for collecting multiple errors, and discriminated unions for error types.

## When to Use This Skill

Use this skill when:
- Handling any operation that can fail
- Defining error types
- Creating error constructors
- Composing error-returning functions
- Validating data
- Working with external IO
- Converting exceptions to Results (at IO boundaries only)

**This skill is proactive** - Use it automatically when writing any fallible operation.

## Script Integration

**Generate error type:**
```bash
deno task new:error <ErrorTypeName>
```

This generates:
- Discriminated union error type definition
- Error constructor functions
- Type guards (isErrorType, isSpecificVariant)
- Usage examples

## Patterns

### Pattern 1: Result<E, T> for Fail-Fast Operations

Use Result for operations that should stop at the first error (sequential validation, fail-fast).

**When to use:** Smart constructors, parsing, single validation chains, operations where one failure makes continuation pointless

**Type Structure:**
```typescript
type Ok<T> = {
  readonly _tag: "Ok"
  readonly value: T
}

type Error<E> = {
  readonly _tag: "Error"
  readonly error: E
}

type Result<E, T> = Ok<T> | Error<E>
```

**Constructors:**
```typescript
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

// Success case
const result = ok(42)  // Ok<number>

// Failure case
const result = error({
  code: "INVALID_INPUT",
  field: "value",
  messages: ["The system needs a positive number."],
  received: -5,
  expected: "Positive number",
  suggestion: "Provide a number greater than zero",
  severity: "requirement",
})
```

**Example (Smart Constructor):**
```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isInteger from "@sitebender/toolsmith/predicates/isInteger/index.ts"

export default function integer(n: number): Result<ValidationError, Integer> {
  if (isInteger(n)) {
    return ok(n as Integer)
  }

  return error({
    code: "INTEGER_NOT_SAFE",
    field: "integer",
    messages: ["The system needs a whole number within the safe integer range."],
    received: n,
    expected: "Safe integer",
    suggestion: "Use a whole number between -9,007,199,254,740,991 and 9,007,199,254,740,991",
    constraints: {
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
    },
    severity: "requirement",
  })
}
```

**Example (Sequential Validation with Early Returns):**
```typescript
export default function emailAddress(
  email: string,
): Result<ValidationError, EmailAddress> {
  // Check 1: Non-empty
  if (email.length === 0) {
    return error({
      code: "EMAIL_ADDRESS_EMPTY",
      field: "emailAddress",
      messages: ["The system needs an email address."],
      received: email,
      expected: "Non-empty string in format local@domain",
      suggestion: "Provide an email address like user@example.com",
      severity: "requirement",
    })
  }

  // Check 2: Has @ symbol (stops here if missing)
  const atIndex = email.indexOf("@")
  if (atIndex === -1) {
    return error({
      code: "EMAIL_ADDRESS_MISSING_AT_SYMBOL",
      field: "emailAddress",
      messages: ["The system needs an @ symbol to separate local and domain parts."],
      received: email,
      expected: "Email with @ symbol (local@domain)",
      suggestion: "Add @ symbol between local and domain (e.g., user@example.com)",
      severity: "requirement",
    })
  }

  // Check 3: Validate local part (early return on error)
  const local = email.slice(0, atIndex)
  const localResult = _validateLocalPart(local)
  if (localResult._tag === "Error") {
    return localResult
  }

  // Check 4: Validate domain (early return on error)
  const domain = email.slice(atIndex + 1)
  const domainResult = _validateDomain(domain)
  if (domainResult._tag === "Error") {
    return domainResult
  }

  // All checks passed
  return ok(unsafeEmailAddress(email))
}
```

**Utility Functions:**
```typescript
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

// Type guards
if (isOk(result)) {
  console.log(result.value)  // TypeScript knows this is Ok
}

if (isError(result)) {
  console.log(result.error)  // TypeScript knows this is Error
}
```

**Key Characteristics:**
- Stops at first error (fail-fast)
- Contains single error value
- Use for sequential validation chains
- Use type guards (`isOk`, `isError`) for narrowing
- Never throw exceptions

### Pattern 2: Validation<E, A> for Error Accumulation

Use Validation for operations that should collect all errors (parallel validation, form validation).

**When to use:** Form validation, collecting multiple independent errors, comprehensive error reporting

**Type Structure:**
```typescript
type Success<A> = {
  readonly _tag: "Success"
  readonly value: A
}

type Failure<E> = {
  readonly _tag: "Failure"
  readonly errors: readonly [E, ...Array<E>]  // NonEmptyArray
}

type Validation<E, A> = Success<A> | Failure<E>
```

**Constructors:**
```typescript
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"

// Success case
const validation = success(42)  // Success<number>

// Failure case (one or more errors)
const validation = failure([
  {
    code: "FIELD_REQUIRED",
    field: "username",
    messages: ["The system needs a username."],
    received: "",
    expected: "Non-empty string",
    suggestion: "Provide a username",
    severity: "requirement",
  },
  {
    code: "FIELD_REQUIRED",
    field: "email",
    messages: ["The system needs an email address."],
    received: "",
    expected: "Valid email address",
    suggestion: "Provide an email address like user@example.com",
    severity: "requirement",
  },
])
```

**Example (Combining Multiple Validations):**
```typescript
import type { Validation } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import combineValidations from "@sitebender/toolsmith/monads/validation/combineValidations/index.ts"

export default function validateUser(data: unknown): Validation<ValidationError, User> {
  // Run all validations in parallel
  const nameValidation = _validateName(data.name)
  const emailValidation = _validateEmail(data.email)
  const ageValidation = _validateAge(data.age)

  // Combine all validation results
  // If any failed, accumulates ALL errors
  // If all succeeded, returns last success value
  return combineValidations([
    nameValidation,
    emailValidation,
    ageValidation,
  ])
}
```

**Example (Validate All - Apply Multiple Validators to Same Value):**
```typescript
import validateAll from "@sitebender/toolsmith/monads/validation/validateAll/index.ts"

export default function validatePassword(password: string): Validation<ValidationError, string> {
  // Apply all validators to the same value
  // Collects all errors if any validators fail
  return validateAll([
    _hasMinLength(8),
    _hasUppercase,
    _hasLowercase,
    _hasNumber,
    _hasSpecialChar,
  ])(password)
}
```

**Utility Functions:**
```typescript
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"
import isFailure from "@sitebender/toolsmith/monads/validation/isFailure/index.ts"

// Type guards
if (isSuccess(validation)) {
  console.log(validation.value)  // TypeScript knows this is Success
}

if (isFailure(validation)) {
  console.log(validation.errors)  // TypeScript knows this is Failure
  // errors is a NonEmptyArray - guaranteed at least one error
}
```

**Key Characteristics:**
- Collects all errors (accumulation)
- Failure contains NonEmptyArray of errors
- Use for parallel validation
- Use for form validation
- Use `combineValidations()` or `validateAll()`

### Pattern 3: ValidationError Structure

All errors use a consistent ValidationError structure with required and optional fields.

**Required Fields:**
```typescript
type ValidationError = {
  // Machine identification
  code: string              // Error code (e.g., "INTEGER_NOT_SAFE")
  field: string            // Field name that failed validation

  // Human messages
  messages: Array<string>   // User-facing error messages

  // Context
  received: Serializable    // The actual value that was received
  expected: string         // Description of what was expected
  suggestion: string       // Actionable suggestion for fixing

  // Severity
  severity: "info" | "notice" | "requirement"

  // ... optional fields
}
```

**Optional Fields:**
```typescript
type ValidationError = {
  // ... required fields above

  // Additional helpful context
  examples?: ReadonlyArray<Serializable>     // Example valid values
  constraints?: Readonly<Record<string, Serializable>>  // Validation constraints

  // Location context
  path?: ReadonlyArray<string>               // Path in nested objects

  // i18n support
  messageKeys?: ReadonlyArray<string>        // i18n message keys
  locale?: string
  interpolation?: Readonly<Record<string, Serializable>>

  // Documentation
  helpUrl?: string
}
```

**"Help, Don't Scold" Philosophy:**

Error messages should explain system limitations and provide actionable guidance, not blame the user.

```typescript
// ❌ Wrong: Scolding, vague
{
  messages: ["Invalid input"],
  suggestion: "Fix your input",
}

// ✅ Correct: Helpful, specific, actionable
{
  messages: ["The system needs a whole number within the safe integer range."],
  suggestion: "Use a whole number between -9,007,199,254,740,991 and 9,007,199,254,740,991",
  examples: [0, 42, -100, 9007199254740991],
}
```

**Example (Complete ValidationError):**
```typescript
const error: ValidationError = {
  code: "VALUE_OUT_OF_RANGE",
  field: "age",
  messages: ["Value must be between 0 and 120 (exclusive)"],
  received: 150,
  expected: "Number where 0 < value < 120",
  suggestion: "Provide a value within the valid range",
  constraints: {
    min: 0,
    max: 120,
    inclusivity: "exclusive",
  },
  severity: "requirement",
  examples: [1, 25, 50, 100, 119],
}
```

### Pattern 4: Error Constructor Functions

Create helper functions to construct errors consistently.

**When to use:** Repeated error patterns, complex error construction, parameterized errors

**Example (Simple Error Constructor):**
```typescript
export default function createEmptyFieldError(field: string) {
  return function createEmptyFieldErrorForField(
    received: Serializable,
  ): ValidationError {
    return {
      code: "FIELD_EMPTY",
      field,
      messages: [`The system needs a value for ${field}.`],
      received,
      expected: "Non-empty value",
      suggestion: `Provide a value for ${field}`,
      severity: "requirement",
    }
  }
}

// Usage
const usernameError = createEmptyFieldError("username")("")
const emailError = createEmptyFieldError("email")("")
```

**Example (Parameterized Error Constructor):**
```typescript
export default function createRangeError(min: number) {
  return function createRangeErrorWithMin(max: number) {
    return function createRangeErrorWithMinAndMax(received: Serializable) {
      return function createRangeErrorWithMinAndMaxAndReceived(
        inclusivity: "inclusive" | "exclusive",
      ): ValidationError {
        const operator = inclusivity === "inclusive"
          ? `${min} <= value <= ${max}`
          : `${min} < value < ${max}`

        return {
          code: "VALUE_OUT_OF_RANGE",
          field: "value",
          messages: [`Value must be between ${min} and ${max} (${inclusivity})`],
          received,
          expected: `Number where ${operator}`,
          suggestion: "Provide a value within the valid range",
          constraints: { min, max, inclusivity },
          severity: "requirement",
        }
      }
    }
  }
}

// Usage
const error = createRangeError(0)(120)(150)("exclusive")
```

**Key Characteristics:**
- Fully curried (one parameter per function)
- Returns ValidationError (not Result or Validation)
- Consistent error structure
- Reusable across validators
- Located in private helper folders (_createError/)

### Pattern 5: Error Composition and Chaining

Combine and transform errors using composition functions.

**Combining Validation Results:**
```typescript
import combineValidations from "@sitebender/toolsmith/monads/validation/combineValidations/index.ts"

// Combines multiple Validation results
// If all Success: returns last success value
// If any Failure: accumulates all errors
export default function validateForm(data: FormData): Validation<ValidationError, ValidForm> {
  const fieldValidations = [
    _validateUsername(data.username),
    _validateEmail(data.email),
    _validatePassword(data.password),
  ]

  return combineValidations(fieldValidations)
}
```

**Mapping Over Results:**
```typescript
import map from "@sitebender/toolsmith/monads/result/map/index.ts"

// Transform successful value, preserve error
export default function parseAndDouble(input: string): Result<ValidationError, number> {
  const parseResult = _parseInt(input)

  // map applies function only if Ok, preserves Error
  return map((n: number) => n * 2)(parseResult)
}
```

**Chaining Results:**
```typescript
import chain from "@sitebender/toolsmith/monads/result/chain/index.ts"

// Chain operations that each return Result
// Short-circuits on first Error
export default function processUser(id: string): Result<ValidationError, ProcessedUser> {
  // Each step returns Result
  const userIdResult = _parseUserId(id)
  const fetchResult = chain(_fetchUser)(userIdResult)
  const validateResult = chain(_validateUser)(fetchResult)
  const processResult = chain(_processUser)(validateResult)

  return processResult
}
```

**Folding Results:**
```typescript
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"

// Extract value from Result by handling both cases
export default function getUserName(id: string): string {
  const result = _fetchUser(id)

  return fold(
    (error: ValidationError) => "Unknown User",  // Error case
    (user: User) => user.name,                   // Ok case
  )(result)
}
```

**Key Characteristics:**
- Use `combineValidations()` for parallel error accumulation
- Use `map()` to transform success values
- Use `chain()` for sequential operations
- Use `fold()` to extract values
- Never unwrap without handling errors

## Result vs Validation

Choose the right monad based on your error handling needs.

### Use Result<E, T> When:

**Fail-fast behavior needed:**
- Smart constructors (branded types, newtypes)
- Parsing operations
- Sequential validation chains
- Operations where first error makes continuation pointless
- Single value transformations

**Examples:**
```typescript
// Parsing - stop at first error
function parseJSON(text: string): Result<ValidationError, unknown>

// Smart constructor - fail fast
function emailAddress(value: string): Result<ValidationError, EmailAddress>

// Sequential validation - each depends on previous
function processUser(id: string): Result<ValidationError, User> {
  const idResult = _validateId(id)
  if (idResult._tag === "Error") return idResult

  const fetchResult = _fetchUser(idResult.value)
  if (fetchResult._tag === "Error") return fetchResult

  return ok(fetchResult.value)
}
```

### Use Validation<E, A> When:

**Error accumulation needed:**
- Form validation (collect all field errors)
- Multiple independent checks
- Comprehensive error reporting
- Parallel validations

**Examples:**
```typescript
// Form validation - collect all field errors
function validateForm(data: FormData): Validation<ValidationError, ValidForm>

// Password validation - collect all rule violations
function validatePassword(pwd: string): Validation<ValidationError, string>

// Multi-field validation - report all problems
function validateUser(data: unknown): Validation<ValidationError, User>
```

### Comparison Table:

| Feature | Result<E, T> | Validation<E, A> |
|---------|--------------|------------------|
| Error behavior | Fail-fast (first error) | Accumulate (all errors) |
| Error storage | Single error | NonEmptyArray of errors |
| Use case | Sequential validation | Parallel validation |
| Performance | Faster (stops early) | Slower (runs all checks) |
| User experience | Shows first problem | Shows all problems |
| Example | Parsing, smart constructors | Forms, multi-rule validation |

### Converting Between Them:

```typescript
// Result -> Validation
function resultToValidation<E, T>(result: Result<E, T>): Validation<E, T> {
  if (result._tag === "Ok") {
    return success(result.value)
  }
  return failure([result.error])  // Wrap single error in array
}

// Validation -> Result (takes first error)
function validationToResult<E, T>(validation: Validation<E, T>): Result<E, T> {
  if (validation._tag === "Success") {
    return ok(validation.value)
  }
  return error(validation.errors[0])  // Take first error
}
```

## Error Type Structure

### ValidationError (Standard Structure)

The ValidationError type is the standard error structure used throughout the codebase.

**Location:** `@sitebender/toolsmith/types/fp/validation/index.ts`

**Complete Type Definition:**
```typescript
export type ValidationError = {
  // ===== REQUIRED FIELDS =====

  // Machine identification
  code: string              // SCREAMING_SNAKE_CASE error code
  field: string            // camelCase field name

  // Human-facing messages
  messages: Array<string>   // User-friendly error messages

  // Context (what happened)
  received: Serializable    // The actual value received
  expected: string         // What the system expected
  suggestion: string       // How to fix (actionable)

  // Severity level
  severity: "info" | "notice" | "requirement"

  // ===== OPTIONAL FIELDS =====

  // Additional helpful context
  examples?: ReadonlyArray<Serializable>     // Example valid values
  constraints?: Readonly<Record<string, Serializable>>  // Validation rules

  // Location in data structure
  path?: ReadonlyArray<string>  // ["user", "profile", "email"]

  // Internationalization
  messageKeys?: ReadonlyArray<string>        // i18n keys
  locale?: string                            // "en-US", "fr-FR"
  interpolation?: Readonly<Record<string, Serializable>>

  // Documentation
  helpUrl?: string  // Link to docs
}
```

### Field Guidelines:

**code:** SCREAMING_SNAKE_CASE identifier
- Examples: `INTEGER_NOT_SAFE`, `EMAIL_INVALID`, `VALUE_OUT_OF_RANGE`
- Machine-readable, never shown to users
- Consistent across codebase

**field:** camelCase field name
- Examples: `emailAddress`, `age`, `userName`
- Identifies which field failed
- Use for grouping errors by field

**messages:** Array of user-friendly strings
- Explain system limitations, not user mistakes
- "The system needs X" not "You provided invalid X"
- Can have multiple messages for complex errors

**received:** The actual value that failed
- Must be serializable (no functions, symbols)
- Helps debugging and error reporting
- Shows exactly what was wrong

**expected:** String description of valid values
- "Safe integer", "Email address format", "Number between 0 and 100"
- Human-readable specification
- Explains the rule, not the code

**suggestion:** Actionable fix
- "Provide a number between 0 and 100"
- "Use format: user@example.com"
- Tells user exactly what to do

**severity:** Error importance
- `"info"` - FYI, nice to know
- `"notice"` - Should fix, but not blocking
- `"requirement"` - Must fix to proceed

**examples:** Array of valid values (optional)
- `[0, 42, 100]` for numbers
- `["user@example.com", "admin@site.org"]` for emails
- Shows by example, not just rules

**constraints:** Validation parameters (optional)
- `{ min: 0, max: 100, step: 5 }`
- `{ minLength: 8, maxLength: 64 }`
- Machine-readable rules

**path:** Location in nested objects (optional)
- `["user", "profile", "contactInfo", "email"]`
- For deep object validation
- Helps locate error in complex structures

### Custom Error Types

For domain-specific errors, create discriminated unions:

```typescript
// Define custom error variants
type NetworkError = {
  readonly _tag: "NetworkError"
  readonly status: number
  readonly statusText: string
  readonly url: string
}

type ParseError = {
  readonly _tag: "ParseError"
  readonly line: number
  readonly column: number
  readonly message: string
}

type AppError = ValidationError | NetworkError | ParseError

// Use in Result/Validation
type AppResult<T> = Result<AppError, T>
type AppValidation<T> = Validation<AppError, T>
```

## Constitutional Rule: No Exceptions

**Exceptions are BANNED. Never use try/catch/throw.**

### Why No Exceptions?

1. **Exceptions are invisible** - No type signature shows they exist
2. **Exceptions break composition** - Can't chain/map over throwing functions
3. **Exceptions are imperative** - Control flow via goto (throw)
4. **Exceptions lose information** - Stack trace, not structured data
5. **Exceptions are non-exhaustive** - Easy to forget to catch

### Never Use:

```typescript
// ❌ WRONG - Throwing exceptions
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero")
  }
  return a / b
}

// ❌ WRONG - Try/catch
function parseJSON(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch (e) {
    throw new Error("Invalid JSON")
  }
}

// ❌ WRONG - Promise rejection
function fetchUser(id: string): Promise<User> {
  return fetch(`/users/${id}`)
    .then(res => res.json())
    .catch(err => Promise.reject(new Error("Fetch failed")))
}
```

### Always Use:

```typescript
// ✅ CORRECT - Return Result
function divide(dividend: number) {
  return function divideDividendBy(divisor: number): Result<ValidationError, number> {
    if (divisor === 0) {
      return error({
        code: "DIVISION_BY_ZERO",
        field: "divisor",
        messages: ["The system cannot divide by zero."],
        received: divisor,
        expected: "Non-zero number",
        suggestion: "Provide a divisor other than zero",
        severity: "requirement",
      })
    }
    return ok(dividend / divisor)
  }
}

// ✅ CORRECT - Wrap external exceptions at IO boundary
function parseJSON(text: string): Result<ValidationError, unknown> {
  try {
    //++ [EXCEPTION] Wrapping external API that throws
    //++ This is the ONLY acceptable use of try/catch
    const parsed = JSON.parse(text)
    return ok(parsed)
  } catch (e) {
    return error({
      code: "JSON_PARSE_ERROR",
      field: "json",
      messages: ["The system needs valid JSON."],
      received: text,
      expected: "Valid JSON string",
      suggestion: "Check JSON syntax and try again",
      severity: "requirement",
    })
  }
}

// ✅ CORRECT - Async Result
async function fetchUser(id: string): Promise<Result<ValidationError, User>> {
  try {
    //++ [EXCEPTION] Wrapping external fetch API
    const response = await fetch(`/users/${id}`)

    if (!response.ok) {
      return error({
        code: "FETCH_ERROR",
        field: "userId",
        messages: [`The system could not fetch user ${id}.`],
        received: id,
        expected: "Valid user ID",
        suggestion: "Check that the user ID exists",
        severity: "requirement",
      })
    }

    const user = await response.json()
    return ok(user)
  } catch (e) {
    return error({
      code: "NETWORK_ERROR",
      field: "userId",
      messages: ["The system encountered a network error."],
      received: id,
      expected: "Network connectivity",
      suggestion: "Check your internet connection and try again",
      severity: "requirement",
    })
  }
}
```

### Exception Wrapping Rules:

**Only wrap exceptions at IO boundaries:**
- File system operations
- Network requests (fetch, HTTP)
- External libraries that throw
- JSON.parse, parseInt (built-ins that throw)
- Database operations

**Mark with Envoy comment:**
```typescript
try {
  //++ [EXCEPTION] Wrapping external API that throws
  const result = externalLibrary.parse(data)
  return ok(result)
} catch (e) {
  return error({ ... })
}
```

**Never propagate exceptions:**
```typescript
// ❌ WRONG - Letting exception escape
function parseConfig(text: string): Config {
  const json = JSON.parse(text)  // Throws!
  return json as Config
}

// ✅ CORRECT - Wrap and return Result
function parseConfig(text: string): Result<ValidationError, Config> {
  try {
    //++ [EXCEPTION] Wrapping JSON.parse which throws
    const json = JSON.parse(text)
    return ok(json as Config)
  } catch (e) {
    return error({ ... })
  }
}
```

## Common Violations

### ❌ Throwing Exceptions

```typescript
// ❌ WRONG
function parseInt(str: string): number {
  const n = Number(str)
  if (isNaN(n)) {
    throw new Error("Not a number")
  }
  return n
}

// ✅ CORRECT
function parseInt(str: string): Result<ValidationError, number> {
  const n = Number(str)
  if (isNaN(n)) {
    return error({
      code: "PARSE_INT_ERROR",
      field: "value",
      messages: ["The system needs a valid number."],
      received: str,
      expected: "Numeric string",
      suggestion: "Provide a string that represents a number",
      severity: "requirement",
    })
  }
  return ok(n)
}
```

### ❌ Using Maybe/Option for Errors

```typescript
// ❌ WRONG - Maybe loses error information
function findUser(id: string): Maybe<User>

// ✅ CORRECT - Result provides error details
function findUser(id: string): Result<ValidationError, User>
```

### ❌ Using Either for Error Handling

```typescript
// ❌ WRONG - Either is for branching, not errors
function validateEmail(email: string): Either<string, EmailAddress>

// ✅ CORRECT - Result is for success/failure
function validateEmail(email: string): Result<ValidationError, EmailAddress>
```

### ❌ Returning Bare Errors

```typescript
// ❌ WRONG - Bare error object
function divide(a: number, b: number): number | ValidationError {
  if (b === 0) {
    return { code: "DIV_BY_ZERO", ... }
  }
  return a / b
}

// ✅ CORRECT - Wrapped in Result
function divide(dividend: number) {
  return function divideDividendBy(divisor: number): Result<ValidationError, number> {
    if (divisor === 0) {
      return error({ code: "DIV_BY_ZERO", ... })
    }
    return ok(dividend / divisor)
  }
}
```

### ❌ Not Currying Multi-Parameter Functions

```typescript
// ❌ WRONG - Not curried
function divide(a: number, b: number): Result<ValidationError, number>

// ✅ CORRECT - Curried
function divide(dividend: number) {
  return function divideDividendBy(divisor: number): Result<ValidationError, number>
}
```

### ❌ Unwrapping Without Handling Errors

```typescript
// ❌ WRONG - Assumes success, crashes on error
const result = parseJSON(text)
console.log(result.value)  // What if it's an Error?

// ✅ CORRECT - Handle both cases
const result = parseJSON(text)
if (isOk(result)) {
  console.log(result.value)
} else {
  console.error(result.error)
}

// ✅ ALSO CORRECT - Use fold
const output = fold(
  (error) => `Error: ${error.messages[0]}`,
  (value) => `Success: ${value}`,
)(result)
```

### ❌ Using Result for Multiple Errors

```typescript
// ❌ WRONG - Result only shows first error
function validateForm(data: FormData): Result<ValidationError, ValidForm> {
  // Only reports first field error, user has to fix one at a time
}

// ✅ CORRECT - Validation accumulates all errors
function validateForm(data: FormData): Validation<ValidationError, ValidForm> {
  // Reports all field errors at once
}
```

### ❌ Vague Error Messages

```typescript
// ❌ WRONG - Scolding, vague, unhelpful
{
  code: "INVALID",
  field: "input",
  messages: ["Invalid input"],
  suggestion: "Fix it",
}

// ✅ CORRECT - Helpful, specific, actionable
{
  code: "EMAIL_INVALID_FORMAT",
  field: "emailAddress",
  messages: ["The system needs an email address in the format local@domain."],
  received: "notanemail",
  expected: "Email address like user@example.com",
  suggestion: "Provide an email address with both local part and domain separated by @",
  examples: ["user@example.com", "admin@site.org"],
  severity: "requirement",
}
```

### ❌ Missing Required ValidationError Fields

```typescript
// ❌ WRONG - Missing required fields
return error({
  code: "ERROR",
  field: "value",
  messages: ["Error occurred"],
})

// ✅ CORRECT - All required fields present
return error({
  code: "VALUE_OUT_OF_RANGE",
  field: "age",
  messages: ["The system needs an age between 0 and 120."],
  received: -5,
  expected: "Number between 0 and 120",
  suggestion: "Provide an age value within the valid range",
  severity: "requirement",
})
```

## Examples

Examine these real examples from Toolsmith library:

### Example 1: Integer Smart Constructor (Result, Fail-Fast)

**Location:** `toolsmith/src/newtypes/numericTypes/integer/index.ts`

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import isInteger from "@sitebender/toolsmith/predicates/isInteger/index.ts"

const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER

//++ Smart constructor for Integer branded type
//++ Returns Result with ValidationError if not a safe integer
export default function integer(n: number): Result<ValidationError, Integer> {
  if (isInteger(n)) {
    return ok(n as Integer)
  }

  return error({
    code: "INTEGER_NOT_SAFE",
    field: "integer",
    messages: [
      "The system needs a whole number within the safe integer range.",
    ],
    received: n,
    expected: "Safe integer",
    suggestion: "Use a whole number between -9,007,199,254,740,991 and 9,007,199,254,740,991",
    constraints: {
      min: MIN_SAFE_INTEGER,
      max: MAX_SAFE_INTEGER,
    },
    severity: "requirement",
  })
}
```

### Example 2: Email Address Validation (Result, Sequential Checks)

**Location:** `toolsmith/src/newtypes/webTypes/emailAddress/index.ts`

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { EmailAddress } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import unsafeEmailAddress from "./unsafeEmailAddress/index.ts"

//++ Smart constructor for EmailAddress branded type
//++ Performs sequential validation with early returns
export default function emailAddress(
  email: string,
): Result<ValidationError, EmailAddress> {
  // Check 1: Non-empty
  if (email.length === 0) {
    return error({
      code: "EMAIL_ADDRESS_EMPTY",
      field: "emailAddress",
      messages: ["The system needs an email address."],
      received: email,
      expected: "Non-empty string in format local@domain",
      suggestion: "Provide an email address like user@example.com",
      severity: "requirement",
    })
  }

  const normalized = email.toLowerCase().trim()

  // Check 2: Has @ symbol (early return if missing)
  const atIndex = normalized.indexOf("@")
  if (atIndex === -1) {
    return error({
      code: "EMAIL_ADDRESS_MISSING_AT_SYMBOL",
      field: "emailAddress",
      messages: ["The system needs an @ symbol to separate local and domain parts."],
      received: normalized,
      expected: "Email with @ symbol (local@domain)",
      suggestion: "Add @ symbol between local and domain (e.g., user@example.com)",
      severity: "requirement",
    })
  }

  const local = normalized.slice(0, atIndex)
  const domain = normalized.slice(atIndex + 1)

  // Check 3: Validate local part (early return on error)
  const localResult = _validateLocalPart(local)
  if (localResult._tag === "Error") {
    return localResult
  }

  // Check 4: Validate domain (early return on error)
  const domainResult = _validateDomain(domain)
  if (domainResult._tag === "Error") {
    return domainResult
  }

  // All checks passed
  return ok(unsafeEmailAddress(normalized))
}
```

### Example 3: Range Validation Helper (Error Constructor)

**Location:** `toolsmith/src/validation/_createRangeError/index.ts`

```typescript
import type { Serializable } from "@sitebender/toolsmith/types/serializable/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

type Inclusivity = "inclusive" | "exclusive"

//++ Creates ValidationError for out-of-range values
//++ Fully curried error constructor
export default function createRangeError(min: number) {
  return function createRangeErrorWithMin(max: number) {
    return function createRangeErrorWithMinAndMax(received: Serializable) {
      return function createRangeErrorWithMinAndMaxAndReceived(
        inclusivity: Inclusivity,
      ): ValidationError {
        const rangeDesc = inclusivity === "inclusive"
          ? `${min} and ${max} (inclusive)`
          : `${min} and ${max} (exclusive)`

        const operator = inclusivity === "inclusive"
          ? `${min} <= value <= ${max}`
          : `${min} < value < ${max}`

        return {
          code: "VALUE_OUT_OF_RANGE",
          field: "value",
          messages: [`Value must be between ${rangeDesc}`],
          received,
          expected: `Number where ${operator}`,
          suggestion: "Provide a value within the valid range",
          constraints: { min, max, inclusivity },
          severity: "requirement",
        }
      }
    }
  }
}
```

### Example 4: Form Validation (Validation, Error Accumulation)

```typescript
import type { Validation } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import combineValidations from "@sitebender/toolsmith/monads/validation/combineValidations/index.ts"

type FormData = {
  username: string
  email: string
  password: string
  age: number
}

type ValidForm = {
  username: string
  email: string
  password: string
  age: number
}

//++ Validates form data, accumulating all field errors
//++ Returns Validation that collects ALL errors, not just first one
export default function validateForm(data: FormData): Validation<ValidationError, ValidForm> {
  // Run all field validations in parallel
  const usernameValidation = _validateUsername(data.username)
  const emailValidation = _validateEmail(data.email)
  const passwordValidation = _validatePassword(data.password)
  const ageValidation = _validateAge(data.age)

  // Combine all validations
  // If ANY failed: accumulates ALL errors into NonEmptyArray
  // If ALL succeeded: returns valid form
  return combineValidations([
    usernameValidation,
    emailValidation,
    passwordValidation,
    ageValidation,
  ])
}
```

### Example 5: Password Validation (Validation, Multiple Rules)

```typescript
import type { Validation } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import validateAll from "@sitebender/toolsmith/monads/validation/validateAll/index.ts"

//++ Validates password against multiple rules
//++ Collects all rule violations, not just first one
export default function validatePassword(
  password: string,
): Validation<ValidationError, string> {
  // Apply all validators to same value
  // Accumulates all violations
  return validateAll([
    _hasMinLength(8),
    _hasUppercase,
    _hasLowercase,
    _hasNumber,
    _hasSpecialChar,
  ])(password)
}

// Example helper validators
function _hasMinLength(min: number) {
  return function checkMinLength(pwd: string): Validation<ValidationError, string> {
    if (pwd.length >= min) {
      return success(pwd)
    }
    return failure([{
      code: "PASSWORD_TOO_SHORT",
      field: "password",
      messages: [`The system needs a password at least ${min} characters long.`],
      received: pwd.length,
      expected: `At least ${min} characters`,
      suggestion: `Add ${min - pwd.length} more characters`,
      severity: "requirement",
    }])
  }
}
```

### Example 6: Chaining Results (Sequential Operations)

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import chain from "@sitebender/toolsmith/monads/result/chain/index.ts"

//++ Processes user data through sequential operations
//++ Short-circuits on first error
export default function processUser(
  id: string,
): Result<ValidationError, ProcessedUser> {
  // Step 1: Parse user ID
  const userIdResult = _parseUserId(id)

  // Step 2: Fetch user (only if step 1 succeeded)
  const userResult = chain(_fetchUser)(userIdResult)

  // Step 3: Validate user (only if step 2 succeeded)
  const validatedResult = chain(_validateUser)(userResult)

  // Step 4: Process user (only if step 3 succeeded)
  const processedResult = chain(_processUser)(validatedResult)

  return processedResult
}
```

## Cross-References

**References:**
- type-definition skill - For error type definitions (discriminated unions)
- function-implementation skill - For error-returning functions
- sitebender-predicates skill - For error type guards

**Referenced by:**
- All skills involving fallible operations
- testing skill - For testing error paths
