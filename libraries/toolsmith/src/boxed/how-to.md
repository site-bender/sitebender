# Boxed Functions Implementation Guide

Complete instructions for creating monadic versions of Toolsmith functions.

## Overview

Boxed functions are monadic wrappers around vanilla Toolsmith functions. They handle Result and Validation monads automatically, defaulting to Result. The rule: **"Validation wins"** - if ANY input is Validation, output is Validation.

## Critical Rules

- **ONE** function per file, exported as **DEFAULT** on same line as definition
- Function name is the folder name (e.g., `/add/index.ts` exports function `add`)
- **ALL** functions must be **CURRIED**
- **NO** arrow functions - use traditional function declarations
- **NO** TypeScript `any` type - everything must be properly typed
- **NO** `unknown` type - use `Value`, `Serializable`, or `PrimitiveValue` from `types/index.ts`
- **NO** methods - only pure functions (use `isResult(x)` not `x.isResult()`)
- Inner functions named semantically for what was captured (e.g., `addToAugend`, `divideByDivisor`)
- camelCase for all names
- Single descriptive comment at top (`//++`) - no other comments needed
- Delegate **ALL** work to vanilla functions - boxed are just wrappers
- **NO SEMICOLONS** - never use semicolons at end of statements
- **USE TABS** - always use tabs for indentation, never spaces
- **EXTRACT ALL LAMBDAS** - inline functions passed to map/reduce/etc go in separate files
- **HAPPY PATH FIRST** - check valid conditions, not invalid ones (if isNumber, not if !isNumber)
- **NO ! OPERATOR** - it's nearly invisible; use `not` function if forced to negate
- **ALL** if statements require blocks `{}` so they're multi-line with blank lines above/below
- Imports grouped by type, alphabetical within groups, blank line between groups
- Multi-line statements need blank line above and below
- No blank lines at start/end of blocks
- Whitespace inside braces: `{ a: 1, b: 2 }` with spaces after colons
- Never more than one blank line in a row
- Group like statements together (multiple consts, multiple ifs), blank line before different statement types
- Always blank line before return statements

## Directory Structure

```
libraries/toolsmith/src/
├── vanilla/          # Original pure functions (DO NOT MODIFY)
│   └── category/
│       └── functionName/
│           └── index.ts
└── boxed/           # Monadic versions
    ├── lift/        # Helper functions for lifting
    │   ├── liftUnary/
    │   └── liftBinary/
    └── category/    # Same structure as vanilla
        └── functionName/
            └── index.ts
```

## Imports Pattern

Import groups (alphabetical within each group, blank line between groups):

1. Type imports (alphabetical)
2. Internal default imports (alphabetical)

```typescript
import type { Result } from "../../../monads/result/types/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import liftBinary from "../../lift/liftBinary/index.ts"
import vanillaFunctionName from "../../../vanilla/category/functionName/index.ts"
```

## Implementation Patterns

### Unary Function

For functions that take one argument.

**Template:**

```typescript
import vanillaFunctionName from "../../../vanilla/category/functionName/index.ts"
import liftUnary from "../../lift/liftUnary/index.ts"

//++ Boxed version of functionName that works with Result/Validation monads
const functionName = liftUnary(vanillaFunctionName)

export default functionName
```

**Example:**

```typescript
// File: libraries/toolsmith/src/boxed/math/negate/index.ts
import vanillaNegate from "../../../vanilla/math/negate/index.ts"
import liftUnary from "../../lift/liftUnary/index.ts"

//++ Boxed version of negate that works with Result/Validation monads
const negate = liftUnary(vanillaNegate)

export default negate
```

### Binary Function

For curried functions that take two arguments.

**IMPORTANT:** Inner functions in vanilla versions have semantic names (e.g., `addToAugend`, `divideByDivisor`)

**Template:**

```typescript
import vanillaFunctionName from "../../../vanilla/category/functionName/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of functionName that works with Result/Validation monads
const functionName = liftBinary(vanillaFunctionName)

export default functionName
```

**Examples:**

**Add:**

```typescript
// File: libraries/toolsmith/src/boxed/math/add/index.ts
// Vanilla: First param is augend, second is addend
// Vanilla inner function: addToAugend
import vanillaAdd from "../../../vanilla/math/add/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of add that works with Result/Validation monads
const add = liftBinary(vanillaAdd)

export default add
```

**Divide:**

```typescript
// File: libraries/toolsmith/src/boxed/math/divide/index.ts
// Vanilla: First param is DIVISOR, second is dividend
// Vanilla inner function: divideByDivisor (captures divisor!)
import vanillaDivide from "../../../vanilla/math/divide/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of divide that works with Result/Validation monads
const divide = liftBinary(vanillaDivide)

export default divide
```

**Subtract:**

```typescript
// File: libraries/toolsmith/src/boxed/math/subtract/index.ts
// Vanilla: First param is subtrahend, second is minuend
// Vanilla inner function: subtractFromMinuend
import vanillaSubtract from "../../../vanilla/math/subtract/index.ts"
import liftBinary from "../../lift/liftBinary/index.ts"

//++ Boxed version of subtract that works with Result/Validation monads
const subtract = liftBinary(vanillaSubtract)

export default subtract
```

### Ternary Function

For curried functions that take three arguments. **Needs implementation:** Create `liftTernary` first, then use pattern.

**Template:**

```typescript
import vanillaFunctionName from "../../../vanilla/category/functionName/index.ts"
import liftTernary from "../../lift/liftTernary/index.ts"

//++ Boxed version of functionName that works with Result/Validation monads
const functionName = liftTernary(vanillaFunctionName)

export default functionName
```

**Example:**

```typescript
// File: libraries/toolsmith/src/boxed/math/clamp/index.ts
import vanillaClamp from "../../../vanilla/math/clamp/index.ts"
import liftTernary from "../../lift/liftTernary/index.ts"

//++ Boxed version of clamp that works with Result/Validation monads
const clamp = liftTernary(vanillaClamp)

export default clamp
```

### Quaternary Function

For curried functions that take four arguments. **Needs implementation:** Create `liftQuaternary` first, then use pattern.

**Note:** Rarely needed - consider refactoring to use an options/config object instead.

**Template:**

```typescript
import vanillaFunctionName from "../../../vanilla/category/functionName/index.ts"
import liftQuaternary from "../../lift/liftQuaternary/index.ts"

//++ Boxed version of functionName that works with Result/Validation monads
const functionName = liftQuaternary(vanillaFunctionName)

export default functionName
```

### N-ary Function

For functions with 5+ arguments. **Needs implementation:** Create `liftN` that handles any arity.

**WARNING: Code smell!** If you need this, your function has too many curried parameters.

**The Right Way:** Group related config that won't be partially applied alone, but keep parameters you want to partially apply separate:

- **BAD:** `function doThing(a)(b)(c)(d)(e)` - too many curried params
- **WRONG:** `function doThing(options: {a, b, c, d, e})` - defeats currying!
- **GOOD:** `function doThing(config: {a, b, c})(d)(e)` - config first, then curried params

**Example:** `formatNumber(config: {locale, precision})(value)`

- Config groups formatting options you'd set once
- Value stays separate for mapping over arrays

**Template:**

```typescript
import vanillaFunctionName from "../../../vanilla/category/functionName/index.ts"
import liftN from "../../lift/liftN/index.ts"

//++ Boxed version of functionName that works with Result/Validation monads
const functionName = liftN(5)(vanillaFunctionName) // specify arity

export default functionName
```

## Lift Helpers

### liftUnary

**Location:** `libraries/toolsmith/src/boxed/lift/liftUnary/index.ts`

```typescript
import type { Result } from "../../../monads/result/types/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import isResult from "../../../monads/result/isResult/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import resultMap from "../../../monads/result/map/index.ts"
import validationMap from "../../../monads/validation/map/index.ts"

//++ Lifts a unary function to work with Result/Validation monads
export default function liftUnary<A, B, E>(fn: (a: A) => B) {
	return function lifted(
		ma: A | Result<E, A> | Validation<E[], A>,
	): Result<E, B> | Validation<E[], B> {
		if (isValidation(ma)) {
			return validationMap(fn)(ma)
		}

		if (isResult(ma)) {
			return resultMap(fn)(ma)
		}

		return ok(fn(ma))
	}
}
```

### liftBinary

**Location:** `libraries/toolsmith/src/boxed/lift/liftBinary/index.ts`

**IMPORTANT:** Only for curried binary functions `(a: A) => (b: B) => C`, NOT for uncurried `(a: A, b: B) => C`

```typescript
import type { Result } from "../../../monads/result/types/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import isResult from "../../../monads/result/isResult/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import resultMap2 from "../../../monads/result/map2/index.ts"
import success from "../../../monads/validation/success/index.ts"
import validationMap2 from "../../../monads/validation/map2/index.ts"

//++ Lifts a curried binary function to work with Result/Validation monads
//++ Note: Inner functions should be named semantically in actual implementations
export default function liftBinary<A, B, C, E>(fn: (a: A) => (b: B) => C) {
	return function liftedFirst(ma: A | Result<E, A> | Validation<E[], A>) {
		return function liftedSecond(
			mb: B | Result<E, B> | Validation<E[], B>,
		): Result<E, C> | Validation<E[], C> {
			if (isValidation(ma) || isValidation(mb)) {
				const aVal = isValidation(ma) ? ma : success(ma as A)
				const bVal = isValidation(mb) ? mb : success(mb as B)

				return validationMap2(fn)(aVal)(bVal)
			}

			const aResult = isResult(ma) ? ma : ok(ma as A)
			const bResult = isResult(mb) ? mb : ok(mb as B)

			return resultMap2(fn)(aResult)(bResult)
		}
	}
}
```

### liftTernary

**Needs implementation:** Similar to liftBinary but with map3 functions

### liftQuaternary

**Needs implementation:** Similar to liftBinary but with map4 functions

### liftN

**Needs implementation:** Generic version that handles any arity

## Usage Examples

### Plain Values

```typescript
import add from "@toolsmith/boxed/math/add"

// Plain values default to Result
add(5)(10) // Returns: {_tag: "Ok", value: 15}
```

### Result Monad

```typescript
import add from "@toolsmith/boxed/math/add"
import error from "@toolsmith/monads/result/error"
import ok from "@toolsmith/monads/result/ok"

// Result propagates
add(ok(5))(ok(10)) // {_tag: "Ok", value: 15}
add(error("bad"))(ok(10)) // {_tag: "Error", error: "bad"}
add(ok(5))(error("bad")) // {_tag: "Error", error: "bad"}
```

### Validation Monad

```typescript
import add from "@toolsmith/boxed/math/add"
import failure from "@toolsmith/monads/validation/failure"
import success from "@toolsmith/monads/validation/success"

// Validation propagates and accumulates
add(success(5))(success(10)) // {_tag: "Valid", value: 15}
add(failure(["e1"]))(success(10)) // {_tag: "Invalid", errors: ["e1"]}
add(failure(["e1"]))(failure(["e2"])) // {_tag: "Invalid", errors: ["e1", "e2"]}
```

### Mixed Monads

```typescript
import add from "@toolsmith/boxed/math/add"
import ok from "@toolsmith/monads/result/ok"
import success from "@toolsmith/monads/validation/success"

// Validation "wins" over Result
add(ok(5))(success(10)) // {_tag: "Valid", value: 15}
add(success(5))(ok(10)) // {_tag: "Valid", value: 15}
add(success(5))(10) // {_tag: "Valid", value: 15}
```

### Pipeline

```typescript
import pipe from "@toolsmith/pipe"
import add from "@toolsmith/boxed/math/add"
import multiply from "@toolsmith/boxed/math/multiply"
import success from "@toolsmith/monads/validation/success"

// Monad type propagates through pipeline
pipe(
	10, // Plain value
	add(5), // Result.Ok(15)
	multiply(2), // Result.Ok(30)
)

pipe(
	success(10), // Start with Validation
	add(5), // Validation.Valid(15)
	multiply(2), // Validation.Valid(30)
)
```

## Implementation Checklist

1. Check vanilla function arity (number of curried parameters)
2. Create lift helper if it doesn't exist (liftUnary, liftBinary, etc.)
3. Create folder: `libraries/toolsmith/src/boxed/[category]/[functionName]`
4. Create `index.ts` with proper imports (all default, full paths)
5. Use const assignment pattern with lift helper
6. Export default on same line as const declaration
7. Add single descriptive comment at top
8. Test with Result, Validation, and plain values

## Common Mistakes to Avoid

- **DON'T** use arrow functions - use traditional function declarations
- **DON'T** use named imports - everything is default export
- **DON'T** forget the `.ts` extension on imports
- **DON'T** use `any` type - properly type everything
- **DON'T** use `unknown` type - use `Value`, `Serializable`, or `PrimitiveValue`
- **DON'T** call methods - use pure functions only
- **DON'T** modify vanilla functions - only wrap them
- **DON'T** add extra comments - just the one at the top
- **DON'T** create barrel files (index.ts that re-exports)
- **DON'T** forget to curry - ALL functions must be curried
- **DON'T** mix Result and Validation incorrectly - Validation always wins

## Happy Path Pattern

Always check for valid conditions first, not invalid ones. Handle the normal case inside the if block, error cases outside. Never use the `!` operator - it's nearly invisible in code. Guards should be comprehensive - avoid redundant checks.

### Bad Example

```typescript
// BAD - checking for invalid condition (even with not)
if (not(isNumber(x))) {
	return NaN
}
return process(x)

// BAD - still checking the negative case first
if (not(valid)) {
	return handleError()
}
return process()

// BAD - redundant checks
if (isArray(arr) && isEmpty(arr)) {
	// isEmpty already checks isArray!
	return defaultValue
}
```

### Good Example

```typescript
// GOOD - happy path first
if (isNumber(x)) {
	return process(x) // Happy path inside
}

return NaN // Error case outside

// GOOD - when you MUST check negative, use not function
import not from "../predicates/not/index.ts"

// Only use not when there's no positive alternative
if (hasPermission(user)) {
	return processRequest()
}

// Sometimes negation is clearer for guards
if (not(isEmpty(errors))) {
	return handleErrors(errors)
}

// GOOD - intelligent guards include type checks
if (isEmpty(arr)) {
	// isEmpty checks isArray internally
	return defaultValue
}

if (isNotEmpty(arr)) {
	// Already validates it's an array
	return process(arr)
}
```

## Lambda Extraction Rule

ALL inline functions must be extracted to their own files, even simple ones passed to map, reduce, filter, etc. Each gets its own subfolder with semantic name. Private functions start with underscore.

### Bad Example

```typescript
// BAD - inline lambda
reduce((acc, n) => acc + n * n)(ADDITIVE_IDENTITY)(numbers)
```

### Good Example

```typescript
// GOOD - extracted and named
// In ./_squareThenSum/index.ts (private, note the underscore)
import square from "@sitebender/toolsmith/vanilla/math/square/index.ts"

//++ Adds the square of a number to a sum accumulator
export default function _squareThenSum(sum: number): (n: number) => number {
	return function squareAndAddToSum(n: number): number {
		return sum + square(n)
	}
}

// In the main file
import _squareThenSum from "./_squareThenSum/index.ts"
reduce(_squareThenSum)(ADDITIVE_IDENTITY)(numbers)
```

### Naming Convention

- Private helpers start with underscore: `_squareThenSum`
- Name describes the operation semantically
- Even simple functions like identity get their own files
- Inner functions also named semantically based on captured values

## Type System

Instead of using `any` or `unknown`, use our specific type definitions from `types/index.ts`:

### Core Types

- **`PrimitiveValue`**: `string | number | boolean | null | bigint | symbol`
  - Use for: functions that only handle primitives
- **`Serializable`**: `PrimitiveValue | Arrays | Objects | Temporal types | etc.`
  - Use for: data that needs to be stored, transmitted, or serialized
- **`Value`**: Everything including `Serializable + Function + WeakMap + WeakSet + Promise`
  - Use for: validators, predicates, functions that must handle ANY JavaScript value

**NOTE:** `undefined` is intentionally excluded - use optional parameters (`value?: Value`)

### Type Examples

```typescript
// Validator function
function isString(value?: Value): value is string

// Converter function
function toString(value?: Serializable): string

// Predicate function
function not(value: Value): boolean
```

## Type Signatures

- **Result:** `Result<E, T>` where E is error type, T is success type
- **Validation:** `Validation<E[], T>` where E[] is array of errors, T is success type
- **Lifted Unary:** `(a: A | Result<E, A> | Validation<E[], A>) => Result<E, B> | Validation<E[], B>`
- **Lifted Binary:** `(a: A | Result<E, A> | Validation<E[], A>) => (b: B | Result<E, B> | Validation<E[], B>) => Result<E, C> | Validation<E[], C>`

## Notes

- The "boxed" metaphor: values go in boxes, functions work with boxed values
- Result is the default for plain values (most common use case)
- Validation "infects" the computation (for error accumulation)
- No cognitive overhead at call site - same interface as vanilla
- Type propagation is automatic through pipelines
- All actual work delegated to vanilla functions
- **Naming convention:** "config" for necessary parameters, "options" for optional ones
- **Config/options object should be FIRST parameter** to get it out of the way
- **Only group parameters that are configured together**, not partially applied alone
