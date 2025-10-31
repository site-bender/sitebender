---
name: sitebender-predicates
description: Writing TypeScript predicate functions (type guards, boolean checks, validation functions). Use when creating functions that return boolean or perform type narrowing. Follows Sitebender's curried, pure function patterns with named function declarations.
---

# Sitebender Predicate Functions

## Overview

Predicate functions are functions that return boolean values or perform type narrowing. This skill provides patterns for writing predicates that follow Sitebender's functional programming conventions: curried when multiple logical parameters are needed, pure, immutable, and using named function declarations.

## When to Use This Skill

Use this skill when writing:
- Type guards (functions with `value is Type` return signatures)
- Boolean-returning validation functions
- Predicate combinators (functions that compose other predicates)
- Logic operations (and, or, not)
- Comparison functions
- Any function that checks a condition and returns true/false

## Predicate Patterns

All examples are located in `examples/` directory. Examine these files for complete, correct implementations.

### Pattern 1: Simple Type Guards (Unary)

Functions that take exactly one parameter and perform type narrowing using TypeScript's type predicate syntax.

**When to use:** Type checking, runtime type validation, discriminated union narrowing

**Examples:**
- `examples/isString.ts` - Primitive type checking
- `examples/isNumber.ts` - Number with NaN/Infinity exclusion
- `examples/isPlainObject.ts` - Object type with prototype checking
- `examples/isLeft.ts` - Discriminated union (Either monad)
- `examples/isRight.ts` - Discriminated union (Either monad)
- `examples/isOk.ts` - Discriminated union (Result monad)
- `examples/isError.ts` - Discriminated union (Result monad)

**Key characteristics:**
- Single parameter (already curried by definition - one parameter)
- Return type annotation: `value is Type` or `result is SpecificBranch<T>`
- Uses `export default function` with named function
- No arrow functions

### Pattern 2: Branded Type Predicates (Unary)

Type guards for branded/newtype wrappers that validate constraints at runtime.

**When to use:** Validating branded types, smart constructors, refinement types

**Examples:**
- `examples/isInteger.ts` - Safe integer validation
- `examples/isBigInteger.ts` - BigInt type checking
- `examples/isOneDecimalPlace.ts` - Decimal precision validation
- `examples/isTwoDecimalPlaces.ts` - Decimal precision validation
- `examples/isThreeDecimalPlaces.ts` - Decimal precision validation
- `examples/isRealNumber.ts` - Real number validation

**Key characteristics:**
- Public predicates used by smart constructors and external code
- Validate the constraint that makes the branded type valid
- Return type: `n is BrandedType`

### Pattern 3: Simple Logic Predicates (Unary)

Basic boolean operations on single values.

**When to use:** Negation, truthiness checks, simple boolean operations

**Examples:**
- `examples/not.ts` - Logical negation
- `examples/isNotEmpty.ts` - Array emptiness check

**Key characteristics:**
- Single parameter
- Return type: `boolean` (not type predicate)
- Pure, no side effects

### Pattern 4: Comparison Predicates (Curried, Higher-Order)

Functions that take one value and return a function that compares it with another value.

**When to use:** Equality checks, comparisons, creating partially-applied comparison functions

**Examples:**
- `examples/is.ts` - SameValue comparison using Object.is
- `examples/isUnequal.ts` - Deep inequality comparison

**Key characteristics:**
- Curried: outer function takes first value, returns inner function
- Inner function has meaningful name (e.g., `isSameAs`, `compareWith`)
- Generic types allow comparing different types
- Return type: `boolean`

**Structure:**
```
function outerName<T>(firstParam: T) {
	return function meaningfulInnerName<U>(secondParam: U): boolean {
		// comparison logic
	}
}
```

### Pattern 5: Higher-Order Predicate Combinators (Curried)

Functions that take an array of predicates and return a new predicate.

**When to use:** Combining multiple predicates, validation pipelines, complex conditions

**Examples:**
- `examples/allPass.ts` - All predicates must pass (logical AND)
- `examples/anyPass.ts` - Any predicate must pass (logical OR)

**Key characteristics:**
- Takes array of predicate functions
- Returns function with meaningful name
- Extract callbacks to private helpers (prefix with `_`, in subfolder)
- Use currying in helpers to capture outer scope
- Pass helper reference to array methods (not inline functions)
- Type aliases for clarity (`Predicate<T>`, `Predicates<T>`)

**Structure:**
```typescript
export default function combinator<T>(predicates: Predicates<T>) {
	return function combinatorWithPredicates(value: T): boolean {
		const applyHelper = _applyHelper<T>(value)
		return predicates.method(applyHelper)
	}
}

export type Predicate<T> = (value: T) => boolean
export type Predicates<T> = ReadonlyArray<Predicate<T>>

// Private helper in _applyHelper/index.ts:
// export default function _applyHelper<T>(value: T) {
//     return function applyHelperWithValue(predicate: Predicate<T>) {
//         return predicate(value)
//     }
// }
```

### Pattern 6: Binary Logic Functions (Curried)

Functions that perform boolean logic operations on two values.

**When to use:** Logical AND/OR operations on pairs of values

**Examples:**
- `examples/and.ts` - Logical AND operation on two values
- `examples/or.ts` - Logical OR operation on two values

**Key characteristics:**
- Curried structure: outer function takes first value, returns inner function
- Both values converted to boolean using `Boolean()` constructor
- Returns boolean (not JavaScript &&/|| behavior which preserves types)
- Uses `Value` type from `@sitebender/toolsmith/types`
- Inner function has meaningful name describing the partial application

**Structure:**
```typescript
import type { Value } from "@sitebender/toolsmith/types/index.ts"

export default function logicOp(left: Value) {
	return function logicOpWithLeft(right: Value): boolean {
		return Boolean(left) OPERATOR Boolean(right)
	}
}
```

**Note:** For predicate composition, use `allPass` or `anyPass` instead.

## Common Violations to Avoid

**Never use arrow functions.** Always use the `function` keyword with named functions.

**Never use inline functions as callbacks, even named ones.** Extract all callbacks to private helper functions in their own folders (e.g., `_applyPredicate/index.ts`). Use currying if the helper needs access to outer scope variables. Pass the helper reference to array methods—never define functions inline.

**Never take multiple parameters in a single function signature** unless it's a unary predicate (which by definition only needs one parameter). For predicates requiring multiple logical inputs (comparisons, combinators), use currying.

**Never mutate parameters or external state.** Predicates must be pure functions.

**Never use loops.** Use array methods (every, some, filter, map, etc.) with extracted helper function references.

**Never use try/catch or throw.** Predicates return boolean values; they don't throw exceptions.

**Always name inner functions meaningfully.** Names like `checkAllPass`, `isSameAs`, `compareWith` describe what the function does. Never use generic names like `inner`, `fn`, or `result`.

**Always use `export default function`** for the main predicate. One function per file.

## Implementation Checklist

When writing a predicate function:

1. Determine if it needs currying (multiple logical parameters) or is unary (single parameter)
2. Use `export default function` with descriptive name
3. If curried, name the inner function meaningfully
4. Add proper return type annotation (`boolean` or `value is Type`)
5. Implement pure logic with no mutations
6. Extract all callbacks to private helper functions (never inline)
7. Add Envoy comment (`//++`) describing the predicate's purpose

## Examples Directory

Examine all 21 examples in `examples/` directory for complete, correct implementations. These are real production code from the Sitebender Toolsmith library and demonstrate all patterns correctly.
