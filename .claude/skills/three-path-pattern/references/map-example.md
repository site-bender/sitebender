# Complete Map Implementation Example

This document shows the complete implementation of the `map` function using the three-path pattern.

## Directory Structure

```
map/
  _mapToMaybe/
    index.ts
    index.test.ts
  _mapToResult/
    index.ts
    index.test.ts
  _mapToValidation/
    index.ts
    index.test.ts
  index.ts
  index.test.ts
```

---

## Main Function: `map/index.ts`

```typescript
import type { Maybe } from "../../types/fp/maybe/index.ts"
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isJust from "../../monads/maybe/isJust/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainMaybes from "../../monads/maybe/chain/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _mapToMaybe from "./_mapToMaybe/index.ts"
import _mapToResult from "./_mapToResult/index.ts"
import _mapToValidation from "./_mapToValidation/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Transforms each array element using a function
 */
export default function map<E, T, U>(f: (arg: T, index?: number) => U) {
	//++ [OVERLOAD] Maybe mapper: takes Maybe, returns mapped Maybe
	function mapWithFunction(
		array: Maybe<ReadonlyArray<T>>,
	): Maybe<ReadonlyArray<U>>

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
			| Maybe<ReadonlyArray<T>>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| Maybe<ReadonlyArray<U>>
		| Result<E, ReadonlyArray<U>>
		| Validation<E, ReadonlyArray<U>> {
		// Maybe path: composition chains where value might not exist
		if (isJust<ReadonlyArray<T>>(array)) {
			return chainMaybes(_mapToMaybe(f))(array)
		}

		// Result path: fail-fast monadic mapping
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_mapToResult(f))(array)
		}

		// Validation path: error accumulation monadic mapping
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_mapToValidation(f))(array)
		}

		// Fallback: pass through unchanged (handles nothing/error/failure states)
		return array
	}

	return mapWithFunction
}
```

---

## Maybe Helper: `map/_mapToMaybe/index.ts`

```typescript
import type { Maybe } from "../../../types/fp/maybe/index.ts"

import just from "../../../monads/maybe/just/index.ts"
import nothing from "../../../monads/maybe/nothing/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that maps over an array and returns Maybe
 */
export default function _mapToMaybe<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapToMaybeWithFunction(
		array: ReadonlyArray<T>,
	): Maybe<ReadonlyArray<U>> {
		/*++
		 + [EXCEPTION] try/catch permitted to wrap user-provided function.
		 + User functions are untrusted external code that may:
		 + - Not be a function
		 + - Return wrong type
		 + - Throw exceptions
		 */
		try {
			// Happy path: function and array are valid, map it
			if (isFunction(f)) {
				if (isArray(array)) {
					//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
					return just(array.map(f))
				}
			}

			// Any validation failure falls through
			return nothing()
		} catch (err) {
			// Convert exception to Nothing
			return nothing()
		}
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
export default function _mapToResult<E, T, U>(
	f: (arg: T, index?: number) => U,
) {
	return function _mapToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<U>> {
		/*++
		 + [EXCEPTION] try/catch permitted to wrap user-provided function.
		 + User functions are untrusted external code that may:
		 + - Not be a function
		 + - Return wrong type
		 + - Throw exceptions
		 */
		try {
			// Happy path: function and array are valid, map it
			if (isFunction(f)) {
				if (isArray(array)) {
					//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
					return ok(array.map(f))
				}

				// Sad path: invalid array
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

			// Sad path: invalid function
			return error({
				code: "INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof f,
				expected: "Function",
				suggestion: "Provide a valid function to map with",
				severity: "requirement" as const,
			} as E)
		} catch (err) {
			// Convert exception to Error
			return error({
				code: "FUNCTION_THREW",
				field: "function",
				messages: ["Function threw an exception during mapping"],
				received: String(err),
				expected: "Function that does not throw",
				suggestion:
					"Ensure the function handles all edge cases without throwing",
				severity: "requirement" as const,
			} as E)
		}
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
		/*++
		 + [EXCEPTION] try/catch permitted to wrap user-provided function.
		 + User functions are untrusted external code that may:
		 + - Not be a function
		 + - Return wrong type
		 + - Throw exceptions
		 */
		try {
			// Happy path: function and array are valid, map it
			if (isFunction(f)) {
				if (isArray(array)) {
					//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
					return success(array.map(f))
				}

				// Sad path: invalid array
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

			// Sad path: invalid function
			return failure([{
				code: "INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof f,
				expected: "Function",
				suggestion: "Provide a valid function to map with",
				severity: "requirement" as const,
			} as E])
		} catch (err) {
			// Convert exception to Failure
			return failure([{
				code: "FUNCTION_THREW",
				field: "function",
				messages: ["Function threw an exception during mapping"],
				received: String(err),
				expected: "Function that does not throw",
				suggestion:
					"Ensure the function handles all edge cases without throwing",
				severity: "requirement" as const,
			} as E])
		}
	}
}
```

---

## Tests: `map/index.test.ts`

```typescript
import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import map from "./index.ts"
import just from "../../monads/maybe/just/index.ts"
import nothing from "../../monads/maybe/nothing/index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

Deno.test("map - Maybe monad", async function mapMaybeTests(t) {
	await t.step(
		"transforms each element with function",
		function transformsElements() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(just([1, 2, 3, 4, 5]))

			assertEquals(result, just([2, 4, 6, 8, 10]))
		},
	)

	await t.step(
		"handles type transformations",
		function handlesTypeTransformations() {
			function toString(n: number): string {
				return String(n)
			}
			const result = map(toString)(just([1, 2, 3]))

			assertEquals(result, just(["1", "2", "3"]))
		},
	)

	await t.step(
		"preserves array length",
		function preservesLength() {
			function identity<T>(x: T): T {
				return x
			}
			const result = map(identity)(just([1, 2, 3, 4, 5]))

			assertEquals(result, just([1, 2, 3, 4, 5]))
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(just([]))

			assertEquals(result, just([]))
		},
	)

	await t.step(
		"passes through nothing unchanged",
		function passesNothingThrough() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(nothing())

			assertEquals(result, nothing())
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

			const result = map(extractName)(just(people))

			assertEquals(
				result,
				just([
					{ name: "Alice" },
					{ name: "Bob" },
				]),
			)
		},
	)

	await t.step(
		"handles complex transformations",
		function handlesComplexTransformations() {
			function square(n: number): number {
				return n * n
			}
			const result = map(square)(just([1, 2, 3, 4, 5]))

			assertEquals(result, just([1, 4, 9, 16, 25]))
		},
	)

	await t.step(
		"returns nothing when function throws",
		function returnsNothingWhenThrows() {
			function throwingFn(_n: number): number {
				throw new Error("Boom!")
			}
			const result = map(throwingFn)(just([1, 2, 3]))

			assertEquals(result, nothing())
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
		"returns nothing when fn is not a function",
		function returnsNothingForBadFn() {
			const result = map(true as unknown as (n: number) => number)(
				just([1, 2, 3]),
			)

			assertEquals(result, nothing())
		},
	)

	await t.step(
		"returns nothing when array is not valid",
		function returnsNothingForBadArray() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(
				just(false as unknown as ReadonlyArray<number>),
			)

			assertEquals(result, nothing())
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
				const result = map(double)(just(arr))

				assertEquals(
					result,
					just(arr.map(function (n) {
						return n * 2
					})),
				)
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
				const doubleResult = map(double)(just(arr))
				const result1 = map(addOne)(doubleResult)
				const result2 = map(composed)(just(arr))

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
				const result = map(identity)(just(arr))

				assertEquals(result, just(arr))
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

- Single currying level: `map(fn)(maybe)`
- Inner function: `mapWithFunction`
- Optional second parameter in transformer function: `(arg: T, index?: number) => U`

### Type Safety

- Three overload signatures: `Maybe<ReadonlyArray<T>>`, `Result<E, ReadonlyArray<T>>`, `Validation<E, ReadonlyArray<T>>`
- Input type `T`, output type `U`
- Type transformation through all three paths

### Runtime Routing

- Same pattern as reduce
- `isJust` → Maybe path (composition chains)
- `isOk` → Result path (fail-fast)
- `isSuccess` → Validation path (error accumulation)

### Error Structures

- Maybe: Returns `nothing()` for any error or exception
- Result: Single error object with codes "INVALID_ARRAY", "INVALID_FUNCTION", or "FUNCTION_THREW"
- Validation: Array with single error object, same codes as Result

### Exception Handling

- Category 2 function: takes user-provided function parameter
- All helpers use try/catch wrapping
- User function validated with `isFunction` predicate
- Exceptions converted to Nothing/Error/Failure
- Exception handling marked with `[EXCEPTION]` comment

### Native Method Usage

- Uses `.map()` directly in helpers
- Marked with `[EXCEPTION]` comment
- Performance justified
