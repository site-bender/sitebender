---
name: type-definition
description: Patterns for defining types using branded types, discriminated unions, and type-level programming. Covers smart constructors, type predicates, and newtype patterns. Use when creating any new type. Includes fully functional generator scripts for branded types and discriminated unions with config-based workflow.
---

# Type Definition

## Core Principle

**Make invalid states unrepresentable.**

Types are design tools that encode business rules and constraints at the type level. Use branded types for domain primitives, discriminated unions for state machines, and type-level programming to enforce correctness.

## When to Use This Skill

Use this skill when:

- Creating branded types (newtypes)
- Defining discriminated unions
- Writing smart constructors
- Creating type predicates
- Implementing type-level constraints
- Modeling domain primitives
- Encoding state machines

**This skill is proactive** - Use it automatically when defining any type.

## Script Integration

**Generate branded type:**

```bash
deno task new:branded <config-file>
```

Example: `deno task new:branded .claude/skills/type-definition/examples/Isbn.config.ts`

**Generate discriminated union:**

```bash
deno task new:union <config-file>
```

Example: `deno task new:union .claude/skills/type-definition/examples/AsyncState.config.ts`

**What gets generated:**

Branded types create:

- `types/TypeName/index.ts` - Type definition using Brand utility
- `newtypes/TypeName/index.ts` - Smart constructor returning Result<ValidationError, T>
- `newtypes/TypeName/unsafeTypeName/index.ts` - Unsafe constructor (no validation)
- `newtypes/TypeName/unwrapTypeName/index.ts` - Extracts primitive from branded type
- `newtypes/TypeName/index.test.ts` - Comprehensive test suite

Discriminated unions create:

- `types/UnionName/index.ts` - All variant types, union type, helper extracts, and type guards

## Patterns

### Pattern 1: Branded Types (Newtypes)

**Purpose:** Prevent mixing semantically different values of the same primitive type.

**When:** Creating domain primitives (EmailAddress, Uuid, Integer, Percent, etc.)

**Structure:**

```typescript
import type { Brand } from "@sitebender/toolsmith/types/branded/index.ts"

export type Integer = Brand<number, "Integer">
export type EmailAddress = Brand<string, "EmailAddress">
export type Uuid = Brand<string, "Uuid">
```

**Key Characteristics:**

- Uses `Brand<K, T>` utility: intersection of base type with `{ readonly __brand: T }`
- Brand property (`__brand` with double underscore) is compile-time only (phantom type)
- Prevents: `const email: EmailAddress = "not-validated" as EmailAddress` (requires smart constructor)
- Type-safe at compile time, zero runtime overhead

**Example:**

```typescript
// Can't mix semantically different strings
const id: Uuid = "not-a-uuid" as Uuid // ❌ Wrong - bypasses validation
const id: Uuid = uuid("550e8400-e29b-41d4-a716-446655440000") // ✅ Right - validated via smart constructor
```

### Pattern 2: Smart Constructors

**Purpose:** Validate input and return branded types wrapped in Result monad.

**When:** Every branded type needs a smart constructor for safe construction.

**Structure:**

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import { error, ok } from "@sitebender/toolsmith/monads/result/index.ts"

export default function integer(n: number): Result<ValidationError, Integer> {
	if (isInteger(n)) {
		return ok(n as Integer)
	}

	return error({
		code: "INTEGER_NOT_SAFE",
		field: "integer",
		messages: ["The system needs a whole number..."],
		received: n,
		expected: "Safe integer",
		suggestion:
			"Use a whole number between -9007199254740991 and 9007199254740991",
		constraints: { min: MIN_SAFE_INTEGER, max: MAX_SAFE_INTEGER },
		severity: "requirement" as const,
	})
}
```

**Key Characteristics:**

- Returns `Result<ValidationError, BrandedType>` (never throws)
- ValidationError follows "help, don't scold" philosophy
- Explains system limitations with actionable guidance
- Uses predicate for validation (isInteger, isEmail, etc.)
- Single cast point after validation succeeds

**Supporting Functions Pattern:**
Each branded type folder contains:

```
TypeName/
  index.ts           - Smart constructor (validates, returns Result)
  unsafeTypeName/    - Brands without validation (for trusted input)
  unwrapTypeName/    - Extracts underlying primitive
  index.test.ts      - Tests
```

### Pattern 3: Discriminated Unions

**Purpose:** Model sum types with exhaustive pattern matching.

**When:** Representing state machines, Result/Validation/Maybe/Either, API responses, form states.

**Structure:**

```typescript
export type Ok<T> = {
	readonly _tag: "Ok"
	readonly value: T
}

export type Error<E> = {
	readonly _tag: "Error"
	readonly error: E
}

export type Result<E, T> = Ok<T> | Error<E>
```

**Key Characteristics:**

- Each variant is a `type` (NOT interface - we converted all interfaces to types)
- Union is a `type` alias combining variants
- Every variant has `readonly _tag` property with literal type
- Use helper types to extract variants: `type OkType<T> = Extract<Result<never, T>, { _tag: "Ok" }>`

**Tag Naming Convention (IMPORTANT):**
To prevent collisions between different discriminated unions:

- **FP Monads/Abstractions**: Use **PascalCase** tags
  - `"Ok"`, `"Error"` (Result)
  - `"Success"`, `"Failure"` (Validation)
  - `"Just"`, `"Nothing"` (Maybe)
  - `"Left"`, `"Right"` (Either)

- **Domain Data Structures**: Use **lowercase** tags
  - `"element"`, `"text"`, `"comment"`, `"error"` (VirtualNode)
  - `"loading"`, `"loaded"`, `"failed"` (AsyncState)

This prevents collisions:

```typescript
// These coexist safely due to case difference
type ResultError = { _tag: "Error"; error: E } // Monad
type VirtualNodeError = { _tag: "error"; code: string } // Data structure

// Case-sensitive comparison distinguishes them
if (value._tag === "Error") { /* Result monad */ }
if (value._tag === "error") { /* VirtualNode error */ }
```

**Rule:** Always use case-sensitive comparison (TypeScript enforces this with literal types)

**Common Discriminated Unions:**

- Result (Ok | Error) - synchronous operations that can fail
- Validation (Success | Failure) - validation with error accumulation
- Maybe (Just | Nothing) - optional values
- Either (Left | Right) - choice between two types
- VirtualNode (element | text | comment | error) - DOM representation

**Example:**

```typescript
// Define variants
export type Loading = {
	readonly _tag: "Loading"
}

export type Loaded<T> = {
	readonly _tag: "Loaded"
	readonly data: T
}

export type Failed = {
	readonly _tag: "Failed"
	readonly error: string
}

// Union
export type AsyncState<T> = Loading | Loaded<T> | Failed

// Helper extracts
export type LoadedState<T> = Extract<AsyncState<T>, { _tag: "Loaded" }>
```

### Pattern 4: Type Guards for Unions

**Purpose:** Narrow discriminated unions using type predicates.

**When:** Need to safely access variant-specific properties.

**Structure:**

```typescript
import type { Ok, Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

export default function isOk<E, T>(value: Result<E, T>): value is Ok<T> {
	return value._tag === "Ok"
}

// Usage
const result: Result<Error, number> = getSomeResult()

if (isOk(result)) {
	// TypeScript knows: result is Ok<number>
	console.log(result.value) // ✅ Safe access
}
```

**Key Characteristics:**

- Parameter type is `unknown` (for completely unknown values) or the union type
- Return type is `value is SpecificType` (type predicate)
- Implementation checks `_tag` property
- Never reach into objects - use predicates from toolsmith

**Curried Type Guards:**

```typescript
// hasTag utility for reusable tag checking
export default function hasTag<T extends string>(tag: T) {
	return function hasTagWithTag<O extends { _tag: string }>(
		obj: O,
	): obj is O & { _tag: T } {
		return obj._tag === tag
	}
}

// Usage
const isOk = hasTag("Ok")
const isError = hasTag("Error")
```

### Pattern 5: Type-Level Programming

**Purpose:** Encode constraints and transformations at the type level.

**When:** Use sparingly - only when runtime validation isn't sufficient or when creating generic library utilities.

**Conditional Types:**

```typescript
export type First<T extends ReadonlyArray<unknown>> = T extends
	readonly [infer F, ...unknown[]] ? F : never

export type IsSingleton<T> = T extends Singleton<unknown> ? true : false
```

**Mapped Types:**

```typescript
export type MapTuple<T extends ReadonlyArray<unknown>, U> = {
	[K in keyof T]: U
}
```

**Type Inference:**

```typescript
export type InferMaybeTuple<T extends Array<Maybe<unknown>>> = {
	[K in keyof T]: T[K] extends Maybe<infer U> ? U : never
}
```

**Key Characteristics:**

- Use `infer` keyword to extract types
- Conditional types with `extends` for type constraints
- Mapped types transform object/tuple types
- Keep it simple - don't over-engineer
- Used primarily in library code, not application code

**Warning:** Type-level programming can make code harder to understand. Prefer runtime validation with branded types and smart constructors when possible.

## Branded Type Structure

**Complete folder structure for a branded type** (following `/libraries/toolsmith/src/newtypes/` pattern):

```
TypeName/
  index.ts              - Smart constructor function
  index.test.ts         - Tests for smart constructor
  unsafeTypeName/
    index.ts            - Unsafe constructor (no validation)
  unwrapTypeName/
    index.ts            - Unwrap to base type
```

**Type Definition** (`types/TypeName/index.ts`):

```typescript
import type { Brand } from "@sitebender/toolsmith/types/branded/index.ts"

export type TypeName = Brand<BaseType, "TypeName">
```

**Smart Constructor** (`newtypes/TypeName/index.ts`):

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { TypeName } from "../../types/TypeName/index.ts"
import { error, ok } from "@sitebender/toolsmith/monads/result/index.ts"
import isValidTypeName from "@sitebender/toolsmith/predicates/isValidTypeName/index.ts"

export default function typeName(
	value: BaseType,
): Result<ValidationError, TypeName> {
	if (isValidTypeName(value)) {
		return ok(value as TypeName)
	}

	return error({
		code: "TYPENAME_INVALID",
		field: "typeName",
		messages: ["The system needs a valid TypeName..."],
		received: value,
		expected: "Valid TypeName",
		suggestion: "Provide a value that meets the constraints",
		constraints: {/* specific constraints */},
		severity: "requirement" as const,
	})
}
```

**Unsafe Constructor** (`newtypes/TypeName/unsafeTypeName/index.ts`):

```typescript
import type { TypeName } from "../../../types/TypeName/index.ts"

/*++
 + Brands value as TypeName without validation
 + USE ONLY when value is guaranteed to be valid (e.g., from trusted source)
 + Prefer the smart constructor for user input
 */
export default function unsafeTypeName(value: BaseType): TypeName {
	return value as TypeName
}
```

**Unwrap Function** (`newtypes/TypeName/unwrapTypeName/index.ts`):

```typescript
import type { TypeName } from "../../../types/TypeName/index.ts"

/*++
 + Extracts the underlying base type from a branded TypeName
 + Useful when interfacing with external APIs that expect primitives
 */
export default function unwrapTypeName(value: TypeName): BaseType {
	return value as BaseType
}
```

## Smart Constructor Pattern

**Purpose:** Safely construct branded types with validation.

**ValidationError Structure:**

```typescript
export type ValidationError = {
	code: string // Machine-readable error code
	field: string // Field that failed validation
	messages: Array<string> // Human-readable messages
	messageKeys?: ReadonlyArray<string> // i18n message keys
	received: Serializable // What was provided
	expected: string // What system needs
	suggestion: string // Actionable guidance
	examples?: ReadonlyArray<Serializable> // Valid examples
	constraints?: Readonly<Record<string, Serializable>> // Violated constraints
	path?: ReadonlyArray<string> // Path in nested object
	severity: "info" | "notice" | "requirement"
	locale?: string // Language code
	interpolation?: Readonly<Record<string, Serializable>> // i18n values
	helpUrl?: string // Documentation URL
}
```

**Creating Validation Errors - Use createValidationError:**

Instead of manually creating error objects (brittle), use a validation function:

```typescript
function createValidationError(config: {
	readonly code: string
	readonly field: string
	readonly received: Serializable
	readonly expected: string
	readonly suggestion: string
	readonly messages?: ReadonlyArray<string>
	readonly constraints?: Readonly<Record<string, Serializable>>
	readonly severity?: "info" | "notice" | "requirement"
	readonly examples?: ReadonlyArray<Serializable>
	readonly messageKeys?: ReadonlyArray<string>
	readonly path?: ReadonlyArray<string>
	readonly locale?: string
	readonly interpolation?: Readonly<Record<string, Serializable>>
	readonly helpUrl?: string
}): Result<ReadonlyArray<string>, ValidationError>
```

**Returns:**

- `ok(validationError)` if config is valid
- `error(["field 'code' is required", ...])` if config is invalid

**Why Result<string[], ValidationError>:**

- Bulletproof validation of error structure itself
- Pure FP (no exceptions)
- No circular dependency (ValidationError reporting ValidationError creation failures)
- String errors are fine for programming errors (developers fix code, not users)

**Usage in smart constructors:**

```typescript
export default function integer(n: number): Result<ValidationError, Integer> {
	if (isInteger(n)) {
		return ok(n as Integer)
	}

	const errorResult = createValidationError({
		code: "INTEGER_NOT_SAFE",
		field: "integer",
		received: n,
		expected: "Safe integer",
		suggestion:
			"Use a whole number between -9007199254740991 and 9007199254740991",
		constraints: { min: MIN_SAFE_INTEGER, max: MAX_SAFE_INTEGER },
		severity: "requirement",
	})

	// Extract validated error or fallback (programming error if fails)
	return isOk(errorResult) ? error(errorResult.value) : error(fallbackError)
}
```

**"Help, Don't Scold" Philosophy:**
Every error explains:

1. What the system received
2. What the system needs
3. Why it failed (constraints violated)
4. How to fix it (suggestion)
5. Examples of valid values (optional)

**Example Error:**

```typescript
{
	code: "INTEGER_NOT_SAFE",
	field: "age",
	messages: [
		"The system needs a whole number without decimal places.",
		"The value 3.14 is not a safe integer.",
	],
	received: 3.14,
	expected: "Safe integer between -9007199254740991 and 9007199254740991",
	suggestion: "Use a whole number like 42 instead",
	examples: [0, 1, -1, 42, 100],
	constraints: {
		min: -9007199254740991,
		max: 9007199254740991,
		decimals: 0,
	},
	severity: "requirement",
}
```

## Discriminated Union Pattern

**Structure:** Each variant + union type + helper extracts + type guards

**Step 1: Define Variants** (use `type`, not `interface`):

```typescript
export type Ok<T> = {
	readonly _tag: "Ok"
	readonly value: T
}

export type Error<E> = {
	readonly _tag: "Error"
	readonly error: E
}
```

**Step 2: Create Union:**

```typescript
export type Result<E, T> = Ok<T> | Error<E>
```

**Step 3: Add Helper Extracts:**

```typescript
export type OkType<T> = Extract<Result<never, T>, { _tag: "Ok" }>
export type ErrorType<E> = Extract<Result<E, never>, { _tag: "Error" }>
```

**Step 4: Create Type Guards:**

```typescript
export function isOk<E, T>(value: Result<E, T>): value is Ok<T> {
	return value._tag === "Ok"
}

export function isError<E, T>(value: Result<E, T>): value is Error<E> {
	return value._tag === "Error"
}
```

**Why NOT Interfaces:**
Previously, discriminated union variants used `interface`. We converted all to `type` because:

- Types can do everything interfaces can for object shapes
- Types fit FP paradigm (closed, immutable)
- Types can be unioned, intersected, and composed more flexibly
- Interfaces are OOP constructs we don't need in strict FP codebase
- **Rule:** Use `type` for everything except when explicitly required (none found)

## Common Violations

**Never:**

- ❌ Use `interface` for discriminated union variants - use `type` instead
- ❌ Use `interface` at all - use `type` for everything
- ❌ Use `any` without explicit permission and exception comment
- ❌ Use `unknown` except in predicates or generic constraints
- ❌ Use bare `as` casting to create branded types - use smart constructors
- ❌ Throw exceptions in smart constructors - return Result<ValidationError, T>
- ❌ Create branded types without validation - every type needs a smart constructor
- ❌ Use mutable data structures in type definitions - all fields must be `readonly`
- ❌ Mix branded types of same base type without validation
- ❌ Reach into discriminated unions - use type guards/predicates
- ❌ Use multi-letter uppercase in initialisms - only first letter capitalized (AstNode not ASTNode, XmlParser not XMLParser)
- ❌ Skip ValidationError fields - provide helpful, complete error information
- ❌ Write scolding error messages - follow "help, don't scold" philosophy

**Always:**

- ✅ Use `type` for all type definitions (object shapes, unions, intersections, aliases)
- ✅ Use `readonly` for all object properties
- ✅ Use `ReadonlyArray<T>` or `readonly T[]` for arrays
- ✅ Return `Result<ValidationError, BrandedType>` from smart constructors
- ✅ Provide complete ValidationError with received, expected, suggestion, constraints
- ✅ Use `createValidationError` function to create ValidationError (bulletproof validation)
- ✅ Use predicates from toolsmith for validation logic
- ✅ Create unsafe constructor AND unwrap function for each branded type
- ✅ Use `_tag` property (single underscore) for discriminated unions
- ✅ Use `__brand` property (double underscore) for branded types (via Brand utility)
- ✅ Use PascalCase tags for FP monads (`"Ok"`, `"Error"`), lowercase for data structures (`"element"`, `"error"`)
- ✅ Capitalize only first letter of initialisms (AstNode, XmlParser, HtmlElement)
- ✅ Explain system limitations, not user failures, in error messages
- ✅ Use type guards to narrow discriminated unions before accessing variant properties

**Type Alias vs Interface Rule:**

```typescript
// ❌ WRONG - using interface
export interface Result<E, T> {
	_tag: "Ok" | "Error"
	// ...
}

// ✅ RIGHT - using type
export type Ok<T> = {
	readonly _tag: "Ok"
	readonly value: T
}

export type Result<E, T> = Ok<T> | Error<E>
```

**Initialism Casing:**

```typescript
// ❌ WRONG
export type HTMLElement = Brand<string, "HTMLElement">
export type XMLParser = Brand<string, "XMLParser">
export type ASTNode = Brand<object, "ASTNode">

// ✅ RIGHT
export type HtmlElement = Brand<string, "HtmlElement">
export type XmlParser = Brand<string, "XmlParser">
export type AstNode = Brand<object, "AstNode">
```

**Smart Constructor Error Handling:**

```typescript
// ❌ WRONG - throwing exceptions
export default function emailAddress(value: string): EmailAddress {
	if (!isEmailAddress(value)) {
		throw new Error("Invalid email address") // Violates FP rules
	}
	return value as EmailAddress
}

// ✅ RIGHT - returning Result
export default function emailAddress(
	value: string,
): Result<ValidationError, EmailAddress> {
	if (!isEmailAddress(value)) {
		return error({
			code: "EMAIL_ADDRESS_INVALID",
			field: "emailAddress",
			messages: ["The system needs a valid email address..."],
			received: value,
			expected: "Valid email address (user@domain.com)",
			suggestion: "Check for @ symbol and valid domain",
			examples: ["user@example.com", "name+tag@domain.co.uk"],
			severity: "requirement" as const,
		})
	}
	return ok(value as EmailAddress)
}
```

## Examples

See `/libraries/toolsmith/src/newtypes/` for complete branded type implementations:

**Numeric Types:**

- `Integer` - Safe integers without decimal places
- `RealNumber` - Real numbers with validation
- `Percent` - Percentage values (0-100)
- `TwoDecimalPlaces`, `FourDecimalPlaces` - Decimal precision types

**String Types:**

- `Uuid` - UUID v4 validation
- `EmailAddress` - Email validation
- `Url`, `Uri`, `Iri` - Web address types
- `Isbn10`, `Isbn13` - Book identifiers

**Network Types:**

- `Ipv4Address`, `Ipv6Address` - IP address validation
- `Domain`, `Hostname` - Network names

**Each example includes:**

1. Type definition in `types/TypeName/index.ts`
2. Smart constructor in `newtypes/TypeName/index.ts`
3. Unsafe constructor in `newtypes/TypeName/unsafeTypeName/index.ts`
4. Unwrap function in `newtypes/TypeName/unwrapTypeName/index.ts`
5. Comprehensive tests in `newtypes/TypeName/index.test.ts`

**Discriminated Union Examples:**

- `Result<E, T>` - `/libraries/toolsmith/src/types/fp/result/index.ts`
- `Validation<E, A>` - `/libraries/toolsmith/src/types/fp/validation/index.ts`
- `Maybe<A>` - `/libraries/toolsmith/src/types/fp/maybe/index.ts`
- `Either<E, A>` - `/libraries/toolsmith/src/types/fp/either/index.ts`
- `VirtualNode` - `/libraries/toolsmith/src/types/virtualNode/index.ts`

**Type Guard Examples:**

- `isOk`, `isError` - `/libraries/toolsmith/src/monads/result/`
- `isSuccess`, `isFailure` - `/libraries/toolsmith/src/monads/validation/`
- `isJust`, `isNothing` - `/libraries/toolsmith/src/monads/maybe/`
- `isVirtualNode`, `isElementNode` - `/libraries/toolsmith/src/predicates/`

## Cross-References

**References:**

- naming skill - For type naming conventions (PascalCase)
- abbreviations skill - For initialisms in type names
- sitebender-predicates skill - For type guard implementation
- error-handling skill - For Result types in smart constructors

**Referenced by:**

- function-implementation skill - For type annotations
- error-handling skill - For error type definitions
