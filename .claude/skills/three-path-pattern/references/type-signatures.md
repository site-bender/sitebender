# Type Signatures for Three-Path Pattern

This document provides comprehensive guidance on TypeScript type signatures for three-path pattern functions.

---

## Generic Type Parameters

### Standard Convention

```typescript
<E, T, U>
```

- **E**: Error type (used in Result<E, T> and Validation<E, T>)
- **T**: Input item type (type of array elements)
- **U**: Output/transformed type (result type after transformation)

### Examples

```typescript
// Map: transforms T → U
function map<E, T, U>(f: (arg: T) => U)

// Reduce: reduces Array<T> → U
function reduce<E, T, U>(fn: (accumulator: U, item: T) => U)

// Filter: keeps same type T
function filter<E, T>(predicate: (arg: T) => boolean)
```

---

## The Three Overload Signatures

Every three-path function must declare exactly three overload signatures in this order:

### 1. Plain Array Overload

Takes a plain array, returns plain value or array.

```typescript
function functionName(array: ReadonlyArray<T>): U
// or for array-returning functions:
function functionName(array: ReadonlyArray<T>): ReadonlyArray<U>
```

### 2. Result Overload

Takes Result-wrapped array, returns Result-wrapped value or array.

```typescript
function functionName(
	array: Result<E, ReadonlyArray<T>>
): Result<E, U>
// or for array-returning functions:
function functionName(
	array: Result<E, ReadonlyArray<T>>
): Result<E, ReadonlyArray<U>>
```

### 3. Validation Overload

Takes Validation-wrapped array, returns Validation-wrapped value or array.

```typescript
function functionName(
	array: Validation<E, ReadonlyArray<T>>
): Validation<E, U>
// or for array-returning functions:
function functionName(
	array: Validation<E, ReadonlyArray<T>>
): Validation<E, ReadonlyArray<U>>
```

### 4. Implementation Signature

Union of all three input types, union of all three output types.

```typescript
function functionName(
	array:
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>>
): U | Result<E, U> | Validation<E, U>
// or for array-returning functions:
function functionName(
	array:
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>>
): ReadonlyArray<U> | Result<E, ReadonlyArray<U>> | Validation<E, ReadonlyArray<U>>
```

---

## Complete Examples

### Map Function (Array → Array)

```typescript
export default function map<E, T, U>(f: (arg: T, index?: number) => U) {
	//++ [OVERLOAD] Array mapper: takes array, returns mapped array
	function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U>

	//++ [OVERLOAD] Result mapper: takes and returns Result monad (fail fast)
	function mapWithFunction(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<U>>

	//++ [OVERLOAD] Validation mapper: takes and returns Validation monad (accumulator)
	function mapWithFunction(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<U>>

	//++ Implementation of the full curried function
	function mapWithFunction(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<U>
		| Result<E, ReadonlyArray<U>>
		| Validation<E, ReadonlyArray<U>> {
		// Implementation...
	}

	return mapWithFunction
}
```

### Reduce Function (Array → Single Value)

```typescript
export default function reduce<E, T, U>(fn: (accumulator: U, item: T) => U) {
	return function reduceWithFunction(initialValue: U) {
		//++ [OVERLOAD] Array reducer: takes array, returns reduced value
		function reduceWithFunctionAndInitialValue(array: ReadonlyArray<T>): U

		//++ [OVERLOAD] Result reducer: takes and returns Result monad (fail fast)
		function reduceWithFunctionAndInitialValue(
			array: Result<E, ReadonlyArray<T>>,
		): Result<E, U>

		//++ [OVERLOAD] Validation reducer: takes and returns Validation monad (accumulator)
		function reduceWithFunctionAndInitialValue(
			array: Validation<E, ReadonlyArray<T>>,
		): Validation<E, U>

		//++ Implementation of the full curried function
		function reduceWithFunctionAndInitialValue(
			array:
				| ReadonlyArray<T>
				| Result<E, ReadonlyArray<T>>
				| Validation<E, ReadonlyArray<T>>,
		): U | Result<E, U> | Validation<E, U> {
			// Implementation...
		}

		return reduceWithFunctionAndInitialValue
	}
}
```

### Filter Function (Array → Filtered Array, Same Type)

```typescript
export default function filter<E, T>(predicate: (arg: T) => boolean) {
	//++ [OVERLOAD] Array filter: takes array, returns filtered array
	function filterWithPredicate(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result filter: takes and returns Result monad (fail fast)
	function filterWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation filter: takes and returns Validation monad (accumulator)
	function filterWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function filterWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>> {
		// Implementation...
	}

	return filterWithPredicate
}
```

---

## Helper Function Type Signatures

### Plain Array Helper

Takes plain types, returns plain type or array.

```typescript
// For map (array → array)
export default function _mapArray<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapArrayWithFunction(
		array: ReadonlyArray<T>,
	): ReadonlyArray<U> {
		// Implementation...
	}
}

// For reduce (array → single value)
export default function _reduceArray<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceArrayWithFunction(initial: U) {
		return function _reduceArrayWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): U {
			// Implementation...
		}
	}
}
```

### Result Helper

Takes plain types, returns Result-wrapped type or array.

```typescript
// For map (array → array)
export default function _mapToResult<E, T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<U>> {
		// Implementation...
	}
}

// For reduce (array → single value)
export default function _reduceToResult<E, T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceToResultWithFunction(initial: U) {
		return function _reduceToResultWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Result<E, U> {
			// Implementation...
		}
	}
}
```

### Validation Helper

Takes plain types, returns Validation-wrapped type or array.

```typescript
// For map (array → array)
export default function _mapToValidation<E, T, U>(
	f: (arg: T, index?: number) => U,
) {
	return function _mapToValidationWithFunction(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<U>> {
		// Implementation...
	}
}

// For reduce (array → single value)
export default function _reduceToValidation<E, T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceToValidationWithFunction(initial: U) {
		return function _reduceToValidationWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Validation<E, U> {
			// Implementation...
		}
	}
}
```

---

## Import Types

Always import Result and Validation types at the top of files:

```typescript
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
```

For helper files (in subfolders):

```typescript
import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"
```

---

## Arrow Function Types (Type Signatures Only)

Arrow function syntax is **only** permitted in type signatures, never in implementation:

```typescript
// ✅ CORRECT: Arrow in type signature
function map<E, T, U>(f: (arg: T) => U)

// ✅ CORRECT: Arrow in reducer type signature
function reduce<E, T, U>(fn: (accumulator: U, item: T) => U)

// ❌ WRONG: Arrow in implementation
const map = (f) => (array) => { ... }
```

---

## ReadonlyArray vs Array

**Always use `ReadonlyArray<T>`** for immutability:

```typescript
// ✅ CORRECT
function map(array: ReadonlyArray<T>): ReadonlyArray<U>

// ❌ WRONG
function map(array: Array<T>): Array<U>
function map(array: T[]): U[]
```

---

## Optional vs Required Parameters

### Optional Parameters in Transformer Functions

Some functions may accept optional parameters:

```typescript
// Map allows optional index parameter
function map<E, T, U>(f: (arg: T, index?: number) => U)

// Reduce has required accumulator and item
function reduce<E, T, U>(fn: (accumulator: U, item: T) => U)
```

### All Array Parameters Are Required

```typescript
// ✅ CORRECT: array parameter is required
function map(array: ReadonlyArray<T>): ReadonlyArray<U>

// ❌ WRONG: array should not be optional
function map(array?: ReadonlyArray<T>): ReadonlyArray<U>
```

---

## Type Parameter Naming Conventions

Follow these conventions consistently:

- **E**: Error type (always first when present)
- **T**: Input item type (source type)
- **U**: Output/transformed type (destination type)
- **V**: Additional type if needed (rare)

```typescript
// Standard pattern
<E, T, U>

// When input and output are same type (like filter)
<E, T>

// Multiple transformations (rare)
<E, T, U, V>
```

---

## Common Type Patterns

### Same Type In/Out (Filter, Sort)

```typescript
function filter<E, T>(predicate: (arg: T) => boolean)
function sort<E, T>(compareFn: (a: T, b: T) => number)
```

### Different Type Out (Map, FlatMap)

```typescript
function map<E, T, U>(f: (arg: T) => U)
function flatMap<E, T, U>(f: (arg: T) => ReadonlyArray<U>)
```

### Reduces to Single Value (Reduce, Every, Some)

```typescript
function reduce<E, T, U>(fn: (accumulator: U, item: T) => U)
function every<E, T>(predicate: (arg: T) => boolean)
function some<E, T>(predicate: (arg: T) => boolean)
```

---

## Summary Checklist

- [ ] Generic types in correct order: `<E, T, U>`
- [ ] Three overload signatures (plain, Result, Validation)
- [ ] Implementation signature uses unions
- [ ] `ReadonlyArray<T>` everywhere
- [ ] Arrow syntax only in type signatures
- [ ] Type imports at top of file
- [ ] Consistent naming: mapWithFunction, reduceWithFunctionAndInitialValue
- [ ] Helper functions return correct wrapped types
