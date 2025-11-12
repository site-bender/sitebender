# Complete Map Implementation Example

This document shows the complete implementation of the `map` function using the three-path pattern.

## Directory Structure

```
map/
  _mapArray/
    index.ts
  _mapToResult/
    index.ts
  _mapToValidation/
    index.ts
  index.ts
  index.test.ts
```

---

## Main Function: `map/index.ts`

```typescript
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _mapArray from "./_mapArray/index.ts"
import _mapToResult from "./_mapToResult/index.ts"
import _mapToValidation from "./_mapToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Transforms each array element using a function
 */
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
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _mapArray(f)(array)
		}

		// Result path: fail-fast monadic mapping
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_mapToResult(f))(array)
		}

		// Validation path: error accumulation monadic mapping
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_mapToValidation(f))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return mapWithFunction
}
```

---

## Plain Array Helper: `map/_mapArray/index.ts`

```typescript
import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that maps over a plain array, or returns array unchanged if inputs are invalid
 */
export default function _mapArray<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapArrayWithFunction(
		array: ReadonlyArray<T>,
	): ReadonlyArray<U> {
		// Happy path: array is valid, map it
		if (and(isFunction(f))(isArray(array))) {
			//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
			return array.map(f)
		}

		// Fallback: return unchanged
		return array as unknown as ReadonlyArray<U>
	}
}
```

---

## Result Helper: `map/_mapToResult/index.ts`

```typescript
import type { Result } from "../../../types/fp/result/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that maps over an array and returns a Result
 */
export default function _mapToResult<E, T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<U>> {
		if (isFunction(f)) {
			// Happy path: function and array are valid, map it
			if (isArray(array)) {
				//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
				return ok(array.map(f))
			}

			// Fallback: return error wrapped in error monad
			return error({
				code: "INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to map over",
				severity: "requirement" as const,
			} as E)
		}

		// Fallback: return error wrapped in error monad
		return error({
			code: "INVALID_FUNCTION",
			field: "function",
			messages: ["Expected function but received invalid input"],
			received: typeof f,
			expected: "Function",
			suggestion: "Provide a valid function to map with",
			severity: "requirement" as const,
		} as E)
	}
}
```

---

## Validation Helper: `map/_mapToValidation/index.ts`

```typescript
import type { Validation } from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that maps over an array and returns a Validation
 */
export default function _mapToValidation<E, T, U>(
	f: (arg: T, index?: number) => U,
) {
	return function _mapToValidationWithFunction(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<U>> {
		if (isFunction(f)) {
			// Happy path: function and array are valid, map it
			if (isArray(array)) {
				//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
				return success(array.map(f))
			}

			// Fallback: return error wrapped in failure
			return failure([{
				code: "INVALID_ARRAY",
				field: "array",
				messages: ["Expected array but received invalid input"],
				received: typeof array,
				expected: "Array",
				suggestion: "Provide a valid array to map over",
				severity: "requirement" as const,
			} as E])
		}

		// Fallback: return error wrapped in failure
		return failure([{
			code: "INVALID_FUNCTION",
			field: "function",
			messages: ["Expected function but received invalid input"],
			received: typeof f,
			expected: "Function",
			suggestion: "Provide a valid function to map with",
			severity: "requirement" as const,
		} as E])
	}
}
```

---

## Tests: `map/index.test.ts`

```typescript
import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import map from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

Deno.test("map - plain array", async function mapArrayTests(t) {
	await t.step(
		"transforms each element with function",
		function transformsElements() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)([1, 2, 3, 4, 5])

			assertEquals(result, [2, 4, 6, 8, 10])
		},
	)

	await t.step(
		"handles type transformations",
		function handlesTypeTransformations() {
			function toString(n: number): string {
				return String(n)
			}
			const result = map(toString)([1, 2, 3])

			assertEquals(result, ["1", "2", "3"])
		},
	)

	await t.step(
		"preserves array length",
		function preservesLength() {
			function identity<T>(x: T): T {
				return x
			}
			const result = map(identity)([1, 2, 3, 4, 5])

			assertEquals(result, [1, 2, 3, 4, 5])
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)([])

			assertEquals(result, [])
		},
	)

	await t.step(
		"works with objects",
		function worksWithObjects() {
			type Person = { readonly name: string; readonly age: number }
			type NameOnly = { readonly name: string }

			function extractName(p: Person): NameOnly {
				return { name: p.name }
			}
			const people: ReadonlyArray<Person> = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 30 },
			]

			const result = map(extractName)(people)

			assertEquals(result, [
				{ name: "Alice" },
				{ name: "Bob" },
			])
		},
	)

	await t.step(
		"handles complex transformations",
		function handlesComplexTransformations() {
			function square(n: number): number {
				return n * n
			}
			const result = map(square)([1, 2, 3, 4, 5])

			assertEquals(result, [1, 4, 9, 16, 25])
		},
	)
})

Deno.test("map - Result monad", async function mapResultTests(t) {
	await t.step(
		"maps over Result and returns Result",
		function mapsOverResult() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(ok([1, 2, 3]))

			assertEquals(result, ok([2, 4, 6]))
		},
	)

	await t.step(
		"handles empty arrays in Result",
		function handlesEmptyInResult() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(ok([]))

			assertEquals(result, ok([]))
		},
	)
})

Deno.test("map - Validation monad", async function mapValidationTests(t) {
	await t.step(
		"maps over Validation and returns Validation",
		function mapsOverValidation() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(success([1, 2, 3]))

			assertEquals(result, success([2, 4, 6]))
		},
	)

	await t.step(
		"handles empty arrays in Validation",
		function handlesEmptyInValidation() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(success([]))

			assertEquals(result, success([]))
		},
	)
})

Deno.test("map - invalid inputs", async function mapInvalidTests(t) {
	await t.step(
		"returns array unchanged when fn is not a function",
		function returnsUnchangedForBadFn() {
			const result = map(true as unknown as (n: number) => number)([1, 2, 3])

			assertEquals(result, [1, 2, 3])
		},
	)

	await t.step(
		"returns input unchanged when array is not valid",
		function returnsUnchangedForBadArray() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(false as unknown as ReadonlyArray<number>)

			assertEquals(result as unknown, false)
		},
	)

	await t.step(
		"returns undefined unchanged",
		function returnsUndefinedUnchanged() {
			function double(arg: number): number {
				return arg * 2
			}
			const result = map(double)(undefined as unknown as ReadonlyArray<number>)

			assertEquals(result, undefined)
		},
	)
})

Deno.test("map - property: preserves length", function lengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyLength(arr) {
				function double(n: number): number {
					return n * 2
				}
				const result = map(double)(arr) as ReadonlyArray<number>

				assertEquals(result.length, arr.length)
			},
		),
	)
})

Deno.test("map - property: composition", function compositionProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyComposition(arr) {
				function addOne(n: number): number {
					return n + 1
				}
				function double(n: number): number {
					return n * 2
				}
				function composed(n: number): number {
					return addOne(double(n))
				}

				// map(f) . map(g) === map(f . g)
				const doubleResult = map(double)(arr) as ReadonlyArray<number>
				const result1 = map(addOne)(doubleResult)
				const result2 = map(composed)(arr)

				assertEquals(result1, result2)
			},
		),
	)
})

Deno.test("map - property: identity", function identityProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			function propertyIdentity(arr) {
				function identity<T>(x: T): T {
					return x
				}
				const result = map(identity)(arr)

				assertEquals(result, arr)
			},
		),
	)
})
```

---

## Key Observations

### Differences from Reduce
- Map takes one fewer parameter than reduce (no initial value)
- Naming: `map` → `mapWithFunction` (simpler than reduce's three-level nesting)
- Returns array instead of single value
- Type transformation: `T` → `U` for each element

### Currying Pattern
- Single currying level: `map(fn)(array)`
- Inner function: `mapWithFunction`
- Optional second parameter in transformer function: `(arg: T, index?: number) => U`

### Type Safety
- Three overload signatures
- Input type `T`, output type `U`
- `ReadonlyArray<T>` → `ReadonlyArray<U>`

### Runtime Routing
- Same pattern as reduce
- `isArray` → plain path
- `isOk` → Result path
- `isSuccess` → Validation path

### Error Structures
- Result: single error object
- Validation: array with single error object
- Code: "INVALID_ARRAY" or "INVALID_FUNCTION"

### Native Method Usage
- Uses `.map()` directly in helpers
- Marked with `[EXCEPTION]` comment
- Performance justified
