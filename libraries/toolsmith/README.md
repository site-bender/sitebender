# Toolsmith: Pure Functional Utility Library

Toolsmith is a comprehensive functional programming library providing type-safe, composable utilities for TypeScript and JavaScript. Built on monadic error handling and branded types, Toolsmith eliminates exceptions and runtime type errors through compile-time guarantees.

## Core Philosophy

**No exceptions. No runtime type errors. Pure functions only.**

Every function in Toolsmith:
- Returns `Result<ValidationError, T>` instead of throwing exceptions
- Is fully curried for composition and partial application
- Has zero side effects (pure functions)
- Provides helpful, actionable error messages
- Works identically on client and server

## Key Features

### Branded Types

JavaScript's primitive types are too permissive. Toolsmith provides branded types with compile-time safety and zero runtime overhead:

#### Numeric Types

```typescript
import integer from "@sitebender/toolsmith/newtypes/integer/index.ts"
import twoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/index.ts"
import realNumber from "@sitebender/toolsmith/newtypes/realNumber/index.ts"

const age = integer(42)              // Result<ValidationError, Integer>
const price = twoDecimalPlaces(19.99) // Result<ValidationError, TwoDecimalPlaces>
const pi = realNumber(3.14159) // Result<ValidationError, RealNumber>

// Type error: can't mix Integer with TwoDecimalPlaces
function processPrice(p: TwoDecimalPlaces): void { }
if (age.isOk) {
	processPrice(age.value)  // TypeScript ERROR ✅
}
```

**Numeric Types:**
- `Integer` - Safe integers within JavaScript's safe range
- `BigInteger` - Arbitrary precision integers
- `RealNumber` - Floating-point (makes imprecision explicit)
- `OneDecimalPlace` - One decimal place (e.g., 19.9)
- `TwoDecimalPlaces` - Two decimal places (e.g., 19.99)
- `ThreeDecimalPlaces` - Three decimal places (e.g., 19.999)
- `FourDecimalPlaces` - Four decimal places (e.g., 19.9999)
- `EightDecimalPlaces` - Eight decimal places (e.g., cryptocurrencies)
- `Percent` - 0-1 range with four decimal precision

#### String Types

Validated string formats with compile-time guarantees:

```typescript
import emailAddress from "@sitebender/toolsmith/newtypes/emailAddress/index.ts"
import url from "@sitebender/toolsmith/newtypes/url/index.ts"

const email = emailAddress("user@example.com")
const link = url("https://example.com")

// Type error: can't use EmailAddress where Url is expected
function navigate(destination: Url): void { }
if (email.isOk) {
	navigate(email.value)  // TypeScript ERROR ✅
}
```

**Network/Web Types:**
- `EmailAddress` - RFC 5322 compliant email addresses
- `Url` - Valid URL with protocol
- `Uri` - URI (broader than URL)
- `Iri` - Internationalized Resource Identifier
- `IPv4Address` - IPv4 format (e.g., 192.168.1.1)
- `IPv6Address` - IPv6 format
- `Domain` - Valid domain name
- `Hostname` - Valid hostname

**Identifier Types:**
- `Uuid` - UUID v4/v5 format
- `Isbn10` - ISBN-10 with checksum validation
- `Isbn13` - ISBN-13 with checksum validation
- `Issn` - ISSN format
- `Doi` - Digital Object Identifier
- `Orcid` - ORCID researcher ID

**Geographic Types:**
- `PostalCode` - Country-specific postal codes
- `PhoneNumber` - E.164 international format
- `CountryCode` - ISO 3166-1 alpha-2/alpha-3
- `LanguageCode` - BCP 47 language tags
- `CurrencyCode` - ISO 4217 currency codes

**Financial Types:**
- `CreditCardNumber` - Luhn algorithm validated
- `Iban` - International Bank Account Number
- `Swift` - SWIFT/BIC code

**Temporal Types:**
- `Iso8601Date` - ISO 8601 date string
- `Iso8601DateTime` - ISO 8601 datetime string
- `Rfc3339` - RFC 3339 timestamp

**Other String Types:**
- `Char` - Single character (length === 1)
- `NonEmptyString` - String with length > 0
- `Base58` - Base58 encoding (for shortened UUIDs)
- `Base64` - Base64 encoding
- `JsonString` - Valid JSON string

#### Color Types

Modern CSS color formats with validation:

```typescript
import hexColor from "@sitebender/toolsmith/newtypes/hexColor/index.ts"
import oklchColor from "@sitebender/toolsmith/newtypes/oklchColor/index.ts"
import p3Color from "@sitebender/toolsmith/newtypes/p3Color/index.ts"

const hex = hexColor("#FF5733")
const oklch = oklchColor("oklch(0.5 0.2 180)")
const p3 = p3Color("color(display-p3 1 0.5 0)")
```

**Color Types:**
- `HexColor` - #RGB or #RRGGBB format
- `OklchColor` - oklch() CSS color format
- `P3Color` - color(display-p3 ...) format

#### Collection Types

Type-safe collections with guarantees:

```typescript
import nonEmptyArray from "@sitebender/toolsmith/newtypes/nonEmptyArray/index.ts"

const items = nonEmptyArray([1, 2, 3])
if (items.isOk) {
	// Guaranteed to have at least one element
	const first = items.value[0]  // Safe access
}
```

**Collection Types:**
- `NonEmptyArray<T>` - Array guaranteed to have at least one element

### Exact Decimal Arithmetic

Exact decimal types use scaled integer arithmetic to avoid floating-point errors:

```typescript
import addToTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/addToTwoDecimalPlaces/index.ts"
import twoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/index.ts"

const price1 = twoDecimalPlaces(19.99)
const price2 = twoDecimalPlaces(5.01)

if (price1.isOk && price2.isOk) {
	const total = addToTwoDecimalPlaces(price1.value)(price2.value)
	// Result: exactly 25.00, not 25.000000000000004
}
```

**Arithmetic Operations** (for all exact decimal types):
- `add[Type]` - Addition with precision preservation
- `subtract[Type]` - Subtraction with precision preservation
- `multiply[Type]` - Multiplication with precision preservation
- `divide[Type]` - Division with precision preservation

### Monadic Error Handling

All functions return `Result<ValidationError, T>` with helpful, system-centric error messages:

```typescript
import divide from "@sitebender/toolsmith/math/divide/index.ts"

const result = divide(10)(0)

if (result.isError) {
	console.log(result.error)
	// {
	//   code: "DIVISION_BY_ZERO",
	//   field: "divisor",
	//   messages: ["System cannot divide by zero"],
	//   received: 0,
	//   expected: "Non-zero number",
	//   suggestion: "Provide a non-zero divisor",
	//   severity: "requirement"
	// }
}
```

**Error Philosophy:**
- System-centric: "System needs..." not "You provided invalid..."
- Actionable: Always includes suggestion for how to fix
- Type-safe: Uses `Serializable` types, never `unknown` or `any`
- i18n ready: Integrates with Linguist for translations

### Curried Functions

All functions are curried for composition and partial application:

```typescript
import add from "@sitebender/toolsmith/math/add/index.ts"
import multiply from "@sitebender/toolsmith/math/multiply/index.ts"
import pipe from "@sitebender/toolsmith/combinator/pipe/index.ts"

// Partial application
const add5 = add(5)
const double = multiply(2)

// Composition
const add5ThenDouble = pipe(add5, double)

const result = add5ThenDouble(10)  // Result: 30
```

**Currying Pattern:**
```typescript
// Inner function name captures outer parameter
export default function add(
	augend: number,
): (addend: number) => Result<ValidationError, number> {
	return function addToAugend(  // Name shows 'augend' is captured
		addend: number,
	): Result<ValidationError, number> {
		// Implementation
	}
}
```

## Function Domains

Toolsmith organizes functions by domain, not by implementation:

### Math (`src/math/`)
Mathematical operations on plain `number` types:
- Basic: modulo, power, root
- Rounding: round, floor, ceiling, truncate
- Sign: absoluteValue, sign, negate
- Comparison: max, min, clamp
- Statistical: sum, product, average, median, mode
- Advanced: factorial, fibonacci, gcd, lcm
- Logarithms: log, log10, log2, naturalLog
- Exponentials: exp, exponent

### Validation (`src/validation/`)
Type checking and validation functions:
- Type checks: isString, isNumber, isBoolean, isArray, isObject
- String validation: isEmail, isUrl, isUuid, isIpAddress, isPhoneNumber
- Number validation: isInteger, isPositive, isNegative, isInRange
- Array validation: isNonEmpty, hasLength, allMatch, someMatch
- Object validation: hasProperty, hasProperties, matchesShape
- Date validation: isDate, isBeforeDate, isAfterDate, isInDateRange
- Custom validators: matches (regex), satisfies (predicate)

### Logic (`src/logic/`)
Boolean operations and predicates:
- Boolean: and, or, not, xor, implies, iff
- Predicates: all, any, none, exactly
- Conditional: ifThenElse, when, unless, cond
- Comparison: equals, notEquals, deepEquals
- Type guards: isType, hasType, matchesType

### String (`src/string/`)
String manipulation and formatting:
- Case: toUpperCase, toLowerCase, toTitleCase, toCamelCase, toSnakeCase
- Trimming: trim, trimStart, trimEnd, trimAll
- Padding: padStart, padEnd, padBoth
- Splitting: split, splitAt, splitOn, words, lines
- Joining: join, concat, intercalate
- Searching: contains, startsWith, endsWith, indexOf, lastIndexOf
- Replacing: replace, replaceAll, replaceAt
- Substring: substring, slice, take, drop
- Formatting: format, template, interpolate
- Parsing: parseInt, parseFloat, parseJson

### Array (`src/array/`)
Array manipulation and transformation:
- Creation: range, repeat, replicate, generate
- Access: head, tail, last, init, nth, at
- Modification: append, prepend, insert, remove, update
- Transformation: map, filter, reduce, scan, fold
- Combination: zip, zipWith, unzip, concat, flatten
- Partitioning: partition, splitAt, splitWhen, chunk, group
- Sorting: sort, sortBy, sortWith, reverse
- Searching: find, findIndex, findLast, indexOf, includes
- Aggregation: sum, product, maximum, minimum, average
- Set operations: union, intersection, difference
- Uniqueness: unique, uniqueBy, deduplicate

### Activation (`src/activation/`)
Neural network activation functions:
- sigmoid, tanh, relu, leakyRelu, elu, selu
- softmax, softplus, softsign
- swish, mish, gelu
- binary, step, identity
- Derivatives for each function

### Other Domains
- `async/` - Promise utilities and async composition
- `combinator/` - Function combinators (pipe, compose, curry)
- `conversion/` - Type conversions and coercion
- `crypto/` - Cryptographic utilities
- `finance/` - Financial calculations
- `geometry/` - Geometric calculations
- `hash/` - Hashing functions
- `interpolation/` - Interpolation algorithms
- `lens/` - Functional lenses for immutable updates
- `map/` - Map utilities
- `matrix/` - Matrix operations
- `object/` - Object utilities
- `physics/` - Physics calculations
- `random/` - Random number generation
- `set/` - Set operations
- `special/` - Special mathematical functions
- `state/` - State management utilities
- `statistics/` - Statistical functions
- `temporal/` - Date and time utilities
- `trigonometry/` - Trigonometric functions
- `tuple/` - Tuple utilities

## Installation

```bash
# Using Deno (recommended)
deno add @sitebender/toolsmith

# Using npm
npm install @sitebender/toolsmith
```

## Usage Examples

### Basic Math with Error Handling

```typescript
import add from "@sitebender/toolsmith/math/add/index.ts"
import divide from "@sitebender/toolsmith/math/divide/index.ts"
import pipe from "@sitebender/toolsmith/combinator/pipe/index.ts"

// Simple addition
const sum = add(5)(3)
if (sum.isOk) {
	console.log(sum.value)  // 8
}

// Division with error handling
const quotient = divide(10)(0)
if (quotient.isError) {
	console.log(quotient.error.suggestion)  // "Provide a non-zero divisor"
}

// Composition
const calculate = pipe(
	add(10),
	multiply(2),
	divide(4)
)
```

### Branded Types for Type Safety

```typescript
import integer from "@sitebender/toolsmith/newtypes/integer/index.ts"
import twoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/index.ts"
import addToTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/twoDecimalPlaces/addToTwoDecimalPlaces/index.ts"

// Create branded values
const quantity = integer(5)
const price = twoDecimalPlaces(19.99)
const tax = twoDecimalPlaces(1.60)

// Type-safe arithmetic
if (price.isOk && tax.isOk) {
	const total = addToTwoDecimalPlaces(price.value)(tax.value)
	if (total.isOk) {
		console.log(total.value)  // Exactly 21.59
	}
}

// Validation errors are helpful
const invalid = twoDecimalPlaces(19.999)
if (invalid.isError) {
	console.log(invalid.error.suggestion)
	// "Round to 2 decimal places (e.g., 19.99 instead of 19.999)"
}
```

### String Validation

```typescript
import isEmail from "@sitebender/toolsmith/validation/isEmail/index.ts"
import toLowerCase from "@sitebender/toolsmith/string/toLowerCase/index.ts"

const email = "USER@EXAMPLE.COM"
const normalized = toLowerCase(email)

if (normalized.isOk) {
	const validated = isEmail(normalized.value)
	if (validated.isOk) {
		console.log(validated.value)  // "user@example.com"
	}
}
```

### Array Operations

```typescript
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import sum from "@sitebender/toolsmith/array/sum/index.ts"
import pipe from "@sitebender/toolsmith/combinator/pipe/index.ts"

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const sumOfEvenSquares = pipe(
	filter((n: number) => n % 2 === 0),
	map((n: number) => n * n),
	sum
)(numbers)

if (sumOfEvenSquares.isOk) {
	console.log(sumOfEvenSquares.value)  // 220
}
```

## Architecture Principles

### One Function Per File
Every function lives in its own folder with `index.ts` and `index.test.ts`:

```
src/math/add/
├── index.ts       # Implementation
└── index.test.ts  # Tests
```

**Benefits:**
- Clear dependencies
- Automatic cleanup when deleting features
- No orphan code
- Extreme modularity

### No Re-exports
Import functions directly from their source:

```typescript
// ✅ Correct - explicit source
import add from "@sitebender/toolsmith/math/add/index.ts"

// ❌ Wrong - obscures source
import { add } from "@sitebender/toolsmith/math"
```

### Lowest Common Ancestor
Helper functions live at the lowest node where all consumers branch:

```
userAuth/
├── _hashPassword/     # Used by login AND register
├── login/
│   └── _validateCredentials/  # Only login uses this
└── register/
    └── _checkUsername/        # Only register uses this
```

## Error Handling

### ValidationError Structure

```typescript
interface ValidationError {
	code: string                    // Machine-readable error code
	field: string                   // Field/parameter that failed
	messages: Array<string>         // Human-readable messages
	received: Serializable          // What was actually provided
	expected: string                // What system needs
	suggestion: string              // Actionable fix
	constraints?: Record<string, Serializable>  // Machine-readable limits
	severity: "info" | "notice" | "requirement"
	context?: Record<string, Serializable>
}
```

### Result Type

```typescript
type Result<E, T> = 
	| { isOk: true; value: T }
	| { isError: true; error: E }
```

**Helper Functions:**
```typescript
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

// Create success
return ok(42)

// Create error
return error({
	code: "INVALID_INPUT",
	field: "value",
	messages: ["System needs a positive number"],
	received: -5,
	expected: "Positive number",
	suggestion: "Provide a number greater than zero",
	severity: "requirement",
})
```

## TypeScript Configuration

```json
{
	"compilerOptions": {
		"strict": true,
		"noUncheckedIndexedAccess": true,
		"exactOptionalPropertyTypes": true,
		"module": "NodeNext",
		"moduleResolution": "NodeNext"
	}
}
```

## Testing

Every function has comprehensive tests covering:
- Happy path (valid inputs)
- Error cases (invalid inputs)
- Edge cases (boundary conditions)
- Currying (partial application)
- Error message structure

```typescript
// Example test structure
import { assertEquals } from "@std/assert"

import add from "./index.ts"

Deno.test("add - happy path", () => {
	const result = add(2)(3)

	assertEquals(result.isOk, true)
	if (result.isOk) {
		assertEquals(result.value, 5)
	}
})

Deno.test("add - currying works", () => {
	const add5 = add(5)
	const result = add5(3)

	assertEquals(result.isOk, true)
	if (result.isOk) {
		assertEquals(result.value, 8)
	}
})
```

## Integration with Other Libraries

Toolsmith provides the functional foundation for the entire @sitebender ecosystem:

- **Architect** - Uses branded types for type-safe calculations and validation
- **Pagewright** - Uses validation functions for form handling
- **Warden** - Uses validation for architectural governance
- **Auditor** - Uses math functions for test data generation
- **Linguist** - Uses string functions for text processing

## Performance

- **Zero runtime overhead** - Branded types are compile-time only
- **No exceptions** - Error handling via values is faster than try/catch
- **Tree-shakeable** - One function per file enables optimal bundling
- **Lazy evaluation** - Functions compose without intermediate allocations
- **Pure functions** - Enable aggressive optimization and memoization

## Contributing

Contributions welcome! Please ensure:
- All functions are curried
- All functions return `Result<ValidationError, T>`
- No exceptions thrown
- Comprehensive tests included
- Error messages are helpful and system-centric
- One function per file

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for detailed guidelines.

## License

[MIT](../../LICENSE)
