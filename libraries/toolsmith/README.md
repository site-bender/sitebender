# @sitebender/toolsmith

> **Pure functional programming utilities - The foundational toolkit for building robust, composable applications**

Toolsmith is a comprehensive functional programming library providing performance-optimized utilities, monadic types, and composable building blocks for the @sitebender ecosystem. It offers two complementary APIs: **vanilla** functions for performance-critical paths and **boxed** functions for safe, monadic composition.

## Philosophy

**Functions as data. Composition as power. Purity as guarantee.**

Toolsmith embraces strict functional programming principles while acknowledging performance realities. Every utility is:

- **Pure** - No side effects, deterministic outputs
- **Curried** - All functions support partial application
- **Composable** - Designed to work together seamlessly
- **Type-safe** - Comprehensive TypeScript coverage
- **Performance-aware** - Documented exceptions where speed matters

## Core Architecture

### Dual API Design: Vanilla & Boxed

Toolsmith provides **two versions** of every function:

#### Vanilla Functions (`/vanilla/*`)

**Performance-first, null-returning functions for internal use and hot paths**

- Return `null` for error conditions (never `undefined`)
- Direct value returns for maximum performance
- May use imperative patterns (documented with `[EXCEPTION]` comments)
- Intended for internal utilities and performance-critical code

```typescript
// Vanilla: Fast, null on error
import add from "@sitebender/toolsmith/vanilla/math/add/index.ts"

const result = add(5)(10)  // 15
const error = add(NaN)(10) // null
```

#### Boxed Functions (`/boxed/*`)

**Monadic wrappers for safe, composable application code**

- Return `Result` or `Validation` monads
- Automatic error handling and propagation
- "Validation wins" - any Validation input produces Validation output
- Public API for application consumption

```typescript
// Boxed: Safe, wrapped in Result/Validation
import add from "@sitebender/toolsmith/boxed/math/add/index.ts"
import { ok, error } from "@sitebender/toolsmith/monads/result/index.ts"

const result = add(ok(5))(ok(10))     // Ok(15)
const err = add(error("bad"))(ok(10)) // Error("bad")
const plain = add(5)(10)              // Ok(15) - plain values default to Result
```

### Lift System

Boxed functions are created by "lifting" vanilla functions with specialized helpers:

```typescript
// liftUnary - for single-argument functions
import liftUnary from "@sitebender/toolsmith/boxed/lift/liftUnary/index.ts"
import vanillaNegate from "@sitebender/toolsmith/vanilla/math/negate/index.ts"

const negate = liftUnary(vanillaNegate)

// liftBinary - for two-argument curried functions
import liftBinary from "@sitebender/toolsmith/boxed/lift/liftBinary/index.ts"
import vanillaAdd from "@sitebender/toolsmith/vanilla/math/add/index.ts"

const add = liftBinary(vanillaAdd)
```

## Library Categories

### Array Operations (130+ functions)

Comprehensive array manipulation with functional patterns:

```typescript
// Core operations
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

// Advanced operations
import partition from "@sitebender/toolsmith/vanilla/array/partition/index.ts"
import groupBy from "@sitebender/toolsmith/vanilla/array/groupBy/index.ts"
import cartesianProduct from "@sitebender/toolsmith/vanilla/array/cartesianProduct/index.ts"
import permutations from "@sitebender/toolsmith/vanilla/array/permutations/index.ts"

// Utilities
import head from "@sitebender/toolsmith/vanilla/array/head/index.ts"
import tail from "@sitebender/toolsmith/vanilla/array/tail/index.ts"
import chunk from "@sitebender/toolsmith/vanilla/array/chunk/index.ts"
import flatten from "@sitebender/toolsmith/vanilla/array/flatten/index.ts"
```

### String Manipulation (70+ functions)

Complete string processing toolkit:

```typescript
import charAt from "@sitebender/toolsmith/vanilla/string/charAt/index.ts"
import concat from "@sitebender/toolsmith/vanilla/string/concat/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"
import match from "@sitebender/toolsmith/vanilla/string/match/index.ts"
```

### Mathematical Operations (50+ functions)

Numeric computations with type-specific optimizations:

```typescript
// Basic arithmetic
import add from "@sitebender/toolsmith/vanilla/math/add/index.ts"
import subtract from "@sitebender/toolsmith/vanilla/math/subtract/index.ts"
import multiply from "@sitebender/toolsmith/vanilla/math/multiply/index.ts"
import divide from "@sitebender/toolsmith/vanilla/math/divide/index.ts"

// Advanced operations
import clamp from "@sitebender/toolsmith/vanilla/math/clamp/index.ts"
import modulo from "@sitebender/toolsmith/vanilla/math/modulo/index.ts"
import power from "@sitebender/toolsmith/vanilla/math/power/index.ts"
import sqrt from "@sitebender/toolsmith/vanilla/math/sqrt/index.ts"
```

**Math Type Optimization**: Four type-specific implementations (integer, bigint, float, precision) with identical signatures but optimized internals.

### Object Utilities (60+ functions)

Immutable object operations:

```typescript
import get from "@sitebender/toolsmith/vanilla/object/get/index.ts"
import set from "@sitebender/toolsmith/vanilla/object/set/index.ts"
import merge from "@sitebender/toolsmith/vanilla/object/merge/index.ts"
import omit from "@sitebender/toolsmith/vanilla/object/omit/index.ts"
import pick from "@sitebender/toolsmith/vanilla/object/pick/index.ts"
import keys from "@sitebender/toolsmith/vanilla/object/keys/index.ts"
import values from "@sitebender/toolsmith/vanilla/object/values/index.ts"
```

### Combinators (45+ functions)

Function composition and transformation:

```typescript
// Composition
import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"
import compose from "@sitebender/toolsmith/vanilla/combinator/compose/index.ts"

// Function modification
import curry from "@sitebender/toolsmith/vanilla/combinator/curry/index.ts"
import partial from "@sitebender/toolsmith/vanilla/combinator/partial/index.ts"
import memoize from "@sitebender/toolsmith/vanilla/combinator/memoize/index.ts"
import debounce from "@sitebender/toolsmith/vanilla/combinator/debounce/index.ts"
import throttle from "@sitebender/toolsmith/vanilla/combinator/throttle/index.ts"

// Advanced patterns
import converge from "@sitebender/toolsmith/vanilla/combinator/converge/index.ts"
import juxt from "@sitebender/toolsmith/vanilla/combinator/juxt/index.ts"
import tryCatch from "@sitebender/toolsmith/vanilla/combinator/tryCatch/index.ts"
```

### Validation & Predicates (120+ functions)

Type checking and validation:

```typescript
// Type guards
import isString from "@sitebender/toolsmith/vanilla/validation/isString/index.ts"
import isNumber from "@sitebender/toolsmith/vanilla/validation/isNumber/index.ts"
import isArray from "@sitebender/toolsmith/vanilla/validation/isArray/index.ts"
import isObject from "@sitebender/toolsmith/vanilla/validation/isObject/index.ts"

// Complex validators
import isEmpty from "@sitebender/toolsmith/vanilla/validation/isEmpty/index.ts"
import isEmail from "@sitebender/toolsmith/vanilla/validation/isEmail/index.ts"
import isUrl from "@sitebender/toolsmith/vanilla/validation/isUrl/index.ts"
```

### Monads

Comprehensive monadic types for safe composition:

#### Result Monad

**Fail-fast error handling with rich error types**

```typescript
import { ok, error } from "@sitebender/toolsmith/monads/result/index.ts"
import map from "@sitebender/toolsmith/monads/result/map/index.ts"
import chain from "@sitebender/toolsmith/monads/result/chain/index.ts"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"

const divide = (divisor: number) => (dividend: number) =>
	divisor === 0 ? error("Division by zero") : ok(dividend / divisor)

const result = pipe(
	ok(10),
	chain(divide(2)),  // Ok(5)
	map(x => x * 2)    // Ok(10)
)

fold((n) => `Success: ${n}`)((e) => `Error: ${e}`)(result) // "Success: 10"
```

#### Validation Monad

**Error accumulation for forms and multi-field validation**

```typescript
import { success, failure } from "@sitebender/toolsmith/monads/validation/index.ts"
import validateAll from "@sitebender/toolsmith/monads/validation/validateAll/index.ts"
import createValidator from "@sitebender/toolsmith/monads/validation/createValidator/index.ts"

const isAdult = createValidator((age: number) => age >= 18)(
	(age) => ({ field: "age", messages: [`${age} is too young`] })
)

const hasValidEmail = createValidator((email: string) => /@/.test(email))(
	(email) => ({ field: "email", messages: [`${email} is invalid`] })
)

// Accumulates all errors
const result = validateAll([isAdult, hasValidEmail])({ age: 15, email: "bad" })
// Invalid([{ field: "age", messages: ["15 is too young"] }, { field: "email", ... }])
```

#### Other Monads

- **Maybe** - Optional values without null/undefined
- **Either** - Binary choice with left/right values
- **IO** - Lazy, deferred side effects
- **Task** - Asynchronous operations
- **State** - Stateful computations
- **Reader** - Environment dependency injection
- **Writer** - Computation with logging

### Additional Categories

- **Temporal** (80+ functions) - Date/time operations using TC39 Temporal API
- **Logic** (15+ functions) - Boolean logic and conditional operations
- **Set & Map** (40+ functions) - Immutable collection operations
- **Tuple** (15+ functions) - Fixed-size array utilities
- **Statistics** (15+ functions) - Mean, median, variance, standard deviation
- **Finance** (12+ functions) - NPV, IRR, compound interest, amortization
- **Geometry** (10+ functions) - Vector math, distance calculations
- **Trigonometry** (20+ functions) - Trig functions and conversions
- **Physics** (10+ functions) - Velocity, acceleration, force calculations
- **Interpolation** (8+ functions) - Linear, cubic, bezier interpolation
- **Matrix** (12+ functions) - Matrix operations and transformations
- **Async** (10+ functions) - Promise utilities and async patterns
- **Activation** (9+ functions) - Neural network activation functions
- **Conversion** (9+ functions) - Type conversion and parsing

### Cryptography

Secure hashing utilities:

```typescript
import hashHex from "@sitebender/toolsmith/crypto/hashHex/index.ts"

const hash = await hashHex("SHA-256")("data to hash") // Returns hex string
```

### Testing Utilities

Development and debugging helpers:

```typescript
import inspect from "@sitebender/toolsmith/testing/inspect/index.ts"
import trace from "@sitebender/toolsmith/testing/trace/index.ts"
```

### Random Number Generation

Cryptographically secure and seedable random utilities:

```typescript
import randomInt from "@sitebender/toolsmith/random/randomInt/index.ts"
import randomFloat from "@sitebender/toolsmith/random/randomFloat/index.ts"
import shuffle from "@sitebender/toolsmith/random/shuffle/index.ts"
```

## Type System

Toolsmith uses precise type definitions instead of `any` or `unknown`:

```typescript
// From @sitebender/toolsmith/types/index.ts

// Primitive values
type PrimitiveValue = string | number | boolean | null | bigint | symbol

// Serializable data (for storage/transmission)
type Serializable =
	| PrimitiveValue
	| Array<Serializable>
	| { [key: string]: Serializable }
	| Date | RegExp | Error | Temporal.*
	// ... includes all standard serializable types

// All JavaScript values
type Value =
	| Serializable
	| Function
	| WeakMap<object, Value>
	| WeakSet<object>
	| Promise<Value>
```

**Usage guidelines:**
- **`PrimitiveValue`** - Functions handling only primitives
- **`Serializable`** - Data to be stored, transmitted, or serialized
- **`Value`** - Validators, predicates, functions handling ANY value

**Note**: `undefined` is intentionally excluded - use optional parameters (`value?: Value`)

## Performance Philosophy

Toolsmith balances functional purity with real-world performance needs:

### Performance Exceptions

Internal utilities may use imperative patterns when justified:

```typescript
// [EXCEPTION] Using .push() for O(1) amortized performance in hot path
function buildArray<T>(items: Iterable<T>): Array<T> {
	const result: Array<T> = []
	for (const item of items) {
		result.push(item) // Imperative for performance
	}
	return result
}
```

### Generator Functions

Special permissions for lazy evaluation:

```typescript
// [GENERATOR_EXCEPTION] Let binding and loops for iteration control
function* range(start: number, end: number) {
	let current = start
	while (current <= end) {
		yield current++
	}
}
```

### Documentation Standards

All performance exceptions documented with Envoy comments:

- `[EXCEPTION]` - Breaking FP rules for performance
- `[OPTIMIZATION]` - Performance-focused techniques
- `[GENERATOR_EXCEPTION]` - Generator-specific patterns
- `[PERFORMANCE_OVER_IDEOLOGY]` - Justified trade-offs
- `[MATH_TYPE_OPTIMIZATION]` - Type-specific math optimizations

## Architectural Principles

### No Barrel Files

Direct imports only - no re-exports:

```typescript
// ✅ Correct - direct tree import
import add from "@sitebender/toolsmith/vanilla/math/add/index.ts"

// ❌ Wrong - barrel file (doesn't exist)
import { add } from "@sitebender/toolsmith/vanilla/math/index.ts"
```

### One Function Per File

Each function lives in its own folder:

```
toolsmith/
└── src/
    └── vanilla/
        └── math/
            └── add/
                └── index.ts  (exports one function: add)
```

### Naming Conventions

- **No abbreviations** - Use full words (except standard acronyms)
- **camelCase** - All function and variable names
- **Named functions only** - No arrow functions for exports
- **Semantic inner function names** - `addToAugend`, `divideByDivisor`

### Error Handling

**Vanilla functions:**
- Return `null` for errors (NEVER `undefined`)
- Never throw exceptions

**Boxed functions:**
- Automatically convert `null` to `Error` Result or `Failure` Validation
- Compose safely with other monadic operations

## Usage Examples

### Basic Composition

```typescript
import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import add from "@sitebender/toolsmith/vanilla/math/add/index.ts"

const sumOfSquaredEvens = pipe(
	filter((n: number) => n % 2 === 0),
	map((n: number) => n * n),
	reduce(add)(0)
)

sumOfSquaredEvens([1, 2, 3, 4, 5]) // 20 (4 + 16)
```

### Monadic Pipeline

```typescript
import pipe from "@sitebender/toolsmith/boxed/combinator/pipe/index.ts"
import add from "@sitebender/toolsmith/boxed/math/add/index.ts"
import multiply from "@sitebender/toolsmith/boxed/math/multiply/index.ts"
import { ok } from "@sitebender/toolsmith/monads/result/index.ts"

const result = pipe(
	ok(10),
	add(5),      // Ok(15)
	multiply(2)  // Ok(30)
)
```

### Validation Accumulation

```typescript
import validateAll from "@sitebender/toolsmith/monads/validation/validateAll/index.ts"
import createValidator from "@sitebender/toolsmith/monads/validation/createValidator/index.ts"

const validators = [
	createValidator(isPositive)(toError("Must be positive")),
	createValidator(isEven)(toError("Must be even")),
	createValidator(isLessThan(100))(toError("Must be < 100"))
]

const result = validateAll(validators)(42) // Valid(42)
const errors = validateAll(validators)(-5) // Invalid([...all errors])
```

## Integration with @sitebender

Toolsmith is the **foundational library** for the entire @sitebender ecosystem:

- **Zero dependencies** - Pure Deno/TypeScript implementation
- **Universal utilities** - Used by all other @sitebender libraries
- **Functional foundation** - Establishes FP patterns across codebase
- **Type safety** - Comprehensive TypeScript definitions

## Development

```bash
# Run tests
deno task test

# Format code
deno task fmt

# Lint code
deno task lint

# Check functional programming compliance
deno task fp:check

# Check dependency boundaries
deno task contracts:check
```

## Contributing Guidelines

When adding new functions:

1. **Create vanilla version first** in `/vanilla/category/functionName/`
2. **Return `null` for errors** (never `undefined` or throw)
3. **Document performance exceptions** with appropriate Envoy comments
4. **Create boxed version** using appropriate lift helper
5. **Write tests** co-located with implementation
6. **Follow naming conventions** - full words, camelCase, named functions
7. **One function per file** - no barrel files

## Status

**Production Ready** - Comprehensive implementation with:

- ✅ 800+ pure functions across all categories
- ✅ Dual API (vanilla/boxed) architecture
- ✅ Complete monadic type system
- ✅ Extensive test coverage
- ✅ Performance-optimized implementations
- ✅ Full TypeScript support
- ✅ Zero external dependencies

## License

MIT - Because foundational tools should be available to everyone.
