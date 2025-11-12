# Complete Reduce Implementation Example

This document shows the complete implementation of the `reduce` function using the three-path pattern.

## Directory Structure

```
reduce/
  _reduceArray/
    index.ts
  _reduceToResult/
    index.ts
  _reduceToValidation/
    index.ts
  index.ts
  index.test.ts
```

---

## Main Function: `reduce/index.ts`

```typescript
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import _reduceArray from "./_reduceArray/index.ts"
import _reduceToResult from "./_reduceToResult/index.ts"
import _reduceToValidation from "./_reduceToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Reduces array to a single value using a reducer function
 */
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
			// Happy path: plain array
			if (isArray<T>(array)) {
				return _reduceArray(fn)(initialValue)(array)
			}

			// Result path: fail-fast monadic reduction
			if (isOk<ReadonlyArray<T>>(array)) {
				return chainResults(_reduceToResult(fn)(initialValue))(array)
			}

			// Validation path: error accumulation monadic reduction
			if (isSuccess<ReadonlyArray<T>>(array)) {
				return chainValidations(_reduceToValidation(fn)(initialValue))(array)
			}

			// Fallback: pass through unchanged (handles error/failure states)
			return array
		}

		return reduceWithFunctionAndInitialValue
	}
}
```

---

## Plain Array Helper: `reduce/_reduceArray/index.ts`

```typescript
import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that reduces a plain array
 */
export default function _reduceArray<T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceArrayWithFunction(initial: U) {
		return function _reduceArrayWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): U {
			// Happy path: valid function and array, reduce it
			if (and(isFunction(fn))(isArray<T>(array))) {
				/*++
				 + [EXCEPTION] .reduce is permitted here for performance reasons
				 + This is the ONLY place .reduce should be used
				 + Everywhere else, use the `reduce` function instead
				 */
				return array.reduce(fn, initial)
			}

			// Fallback: return initial value unchanged
			return initial
		}
	}
}
```

---

## Result Helper: `reduce/_reduceToResult/index.ts`

```typescript
import type { Result } from "../../../types/fp/result/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that reduces an array and returns a Result
 */
export default function _reduceToResult<E, T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceToResultWithFunction(initial: U) {
		return function _reduceToResultWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Result<E, U> {
			if (isFunction(fn)) {
				// Happy path: function and array are valid, reduce it
				if (isArray<T>(array)) {
					/*++
					 + [EXCEPTION] .reduce is permitted here for performance reasons
					 + This is the ONLY place .reduce should be used
					 + Everywhere else, use the `reduce` function instead
					 */
					const reduced = array.reduce<U>(fn, initial)
					return ok(reduced)
				}

				// Fallback: return ValidationError wrapped in error
				return error({
					code: "REDUCE_INVALID_INPUT",
					field: "array",
					messages: ["Expected array but received invalid input"],
					received: typeof array,
					expected: "Array",
					suggestion: "Provide a valid array to reduce over",
					severity: "requirement" as const,
				} as E)
			}

			// Fallback: return ValidationError wrapped in error
			return error({
				code: "REDUCE_INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof fn,
				expected: "Function",
				suggestion: "Provide a valid function to reduce with",
				severity: "requirement" as const,
			} as E)
		}
	}
}
```

---

## Validation Helper: `reduce/_reduceToValidation/index.ts`

```typescript
import type { Validation } from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that reduces an array and returns a Validation
 */
export default function _reduceToValidation<E, T, U>(
	fn: (accumulator: U, item: T) => U,
) {
	return function _reduceToValidationWithFunction(initial: U) {
		return function _reduceToValidationWithFunctionAndInitial(
			array: ReadonlyArray<T>,
		): Validation<E, U> {
			if (isFunction(fn)) {
				// Happy path: function and array are valid, reduce it
				if (isArray<T>(array)) {
					/*++
					 + [EXCEPTION] .reduce is permitted here for performance reasons
					 + This is the ONLY place .reduce should be used
					 + Everywhere else, use the `reduce` function instead
					 */
					const reduced = array.reduce<U>(fn, initial)
					return success(reduced)
				}

				// Fallback: return ValidationError wrapped in failure
				return failure([
					{
						code: "REDUCE_INVALID_INPUT",
						field: "array",
						messages: ["Expected array but received invalid input"],
						received: typeof array,
						expected: "Array",
						suggestion: "Provide a valid array to reduce over",
						severity: "requirement" as const,
					} as E,
				])
			}

			// Fallback: return ValidationError wrapped in failure
			return failure([
				{
					code: "REDUCE_INVALID_FUNCTION",
					field: "function",
					messages: ["Expected function but received invalid input"],
					received: typeof fn,
					expected: "Function",
					suggestion: "Provide a valid function to reduce with",
					severity: "requirement" as const,
				} as E,
			])
		}
	}
}
```

---

## Tests: `reduce/index.test.ts`

```typescript
import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import reduce from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

Deno.test("reduce - plain array path", async function reducePlainArrayTests(t) {
	await t.step(
		"sums numbers with plain array",
		function sumsNumbers() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(0)([1, 2, 3, 4, 5])

			assertEquals(result, 15)
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(10)([])

			assertEquals(result, 10)
		},
	)

	await t.step(
		"concatenates strings",
		function concatenatesStrings() {
			function concat(accumulator: string, item: string): string {
				return accumulator + item
			}

			const result = reduce<string, string>(concat)("")([
				"Hello",
				" ",
				"World",
			])

			assertEquals(result, "Hello World")
		},
	)

	await t.step(
		"builds objects",
		function buildsObjects() {
			type Acc = { readonly [key: string]: number }

			function addToObj(accumulator: Acc, item: string): Acc {
				return { ...accumulator, [item]: item.length }
			}

			const result = reduce<string, Acc>(addToObj)({})([
				"a",
				"bb",
				"ccc",
			])

			assertEquals(result, { a: 1, bb: 2, ccc: 3 })
		},
	)

	await t.step(
		"multiplies numbers",
		function multipliesNumbers() {
			function multiply(accumulator: number, item: number): number {
				return accumulator * item
			}

			const result = reduce<number, number>(multiply)(1)([2, 3, 4])

			assertEquals(result, 24)
		},
	)

	await t.step(
		"transforms types during reduction",
		function transformsTypes() {
			function sumLengths(accumulator: number, item: string): number {
				return accumulator + item.length
			}

			const result = reduce<string, number>(sumLengths)(0)([
				"hello",
				"world",
			])

			assertEquals(result, 10)
		},
	)
})

Deno.test("reduce - Result monad path", async function reduceResultTests(t) {
	await t.step(
		"sums numbers wrapped in ok",
		function sumsNumbersInOk() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(0)(ok([1, 2, 3, 4, 5]))

			assertEquals(result, ok(15))
		},
	)

	await t.step(
		"handles empty arrays wrapped in ok",
		function handlesEmptyArraysInOk() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(10)(ok([]))

			assertEquals(result, ok(10))
		},
	)

	await t.step(
		"passes through error without processing",
		function passesErrorThrough() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const inputError = error({
				code: "UPSTREAM_ERROR",
				field: "data",
				messages: ["Upstream error occurred"],
				received: "null",
				expected: "Array",
				suggestion: "Fix upstream issue",
				severity: "requirement" as const,
			})

			const result = reduce<number, number>(add)(0)(inputError)

			assertEquals(result, inputError)
		},
	)

	await t.step(
		"concatenates strings wrapped in ok",
		function concatenatesStringsInOk() {
			function concat(accumulator: string, item: string): string {
				return accumulator + item
			}

			const result = reduce<string, string>(concat)("")(
				ok(["Hello", " ", "World"]),
			)

			assertEquals(result, ok("Hello World"))
		},
	)

	await t.step(
		"transforms types wrapped in ok",
		function transformsTypesInOk() {
			function sumLengths(accumulator: number, item: string): number {
				return accumulator + item.length
			}

			const result = reduce<string, number>(sumLengths)(0)(
				ok(["hello", "world"]),
			)

			assertEquals(result, ok(10))
		},
	)
})

Deno.test(
	"reduce - Validation monad path",
	async function reduceValidationTests(t) {
		await t.step(
			"sums numbers wrapped in success",
			function sumsNumbersInSuccess() {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(0)(success([1, 2, 3, 4, 5]))

				assertEquals(result, success(15))
			},
		)

		await t.step(
			"handles empty arrays wrapped in success",
			function handlesEmptyArraysInSuccess() {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(10)(success([]))

				assertEquals(result, success(10))
			},
		)

		await t.step(
			"passes through failure without processing",
			function passesFailureThrough() {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const inputFailure = failure([
					{
						code: "UPSTREAM_VALIDATION_ERROR",
						field: "data",
						messages: ["Validation failed upstream"],
						received: "null",
						expected: "Array",
						suggestion: "Fix validation issues",
						severity: "requirement" as const,
					},
				])

				const result = reduce<number, number>(add)(0)(inputFailure)

				assertEquals(result, inputFailure)
			},
		)

		await t.step(
			"concatenates strings wrapped in success",
			function concatenatesStringsInSuccess() {
				function concat(accumulator: string, item: string): string {
					return accumulator + item
				}

				const result = reduce<string, string>(concat)("")(
					success(["Hello", " ", "World"]),
				)

				assertEquals(result, success("Hello World"))
			},
		)

		await t.step(
			"transforms types wrapped in success",
			function transformsTypesInSuccess() {
				function sumLengths(accumulator: number, item: string): number {
					return accumulator + item.length
				}

				const result = reduce<string, number>(sumLengths)(0)(
					success(["hello", "world"]),
				)

				assertEquals(result, success(10))
			},
		)
	},
)

Deno.test(
	"reduce - property: sum with plain array matches native reduce",
	function sumProperty() {
		fc.assert(
			fc.property(fc.array(fc.integer()), function propertySum(arr) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(0)(arr)
				const expected = arr.reduce(function nativeReduce(acc, item) {
					return acc + item
				}, 0)

				assertEquals(result, expected)
			}),
		)
	},
)

Deno.test(
	"reduce - property: sum with Result ok matches native reduce",
	function sumPropertyResult() {
		fc.assert(
			fc.property(fc.array(fc.integer()), function propertySumResult(arr) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(0)(ok(arr))
				const expected = arr.reduce(function nativeReduce(acc, item) {
					return acc + item
				}, 0)

				assertEquals(result, ok(expected))
			}),
		)
	},
)

Deno.test(
	"reduce - property: sum with Validation success matches native reduce",
	function sumPropertyValidation() {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				function propertySumValidation(arr) {
					function add(accumulator: number, item: number): number {
						return accumulator + item
					}

					const result = reduce<number, number>(add)(0)(success(arr))
					const expected = arr.reduce(function nativeReduce(acc, item) {
						return acc + item
					}, 0)

					assertEquals(result, success(expected))
				},
			),
		)
	},
)
```

---

## Key Observations

### Currying Pattern
- Each function takes exactly one parameter
- Inner functions named with "With" + parameter name pattern
- `reduce` → `reduceWithFunction` → `reduceWithFunctionAndInitialValue`

### Type Safety
- Three overload signatures for TypeScript
- Generic types: `E` (error), `T` (input), `U` (output)
- `ReadonlyArray<T>` for immutability

### Runtime Routing
- Uses predicates to detect input type
- `isArray` for plain path
- `isOk` for Result path
- `isSuccess` for Validation path
- Fallback returns input unchanged

### Error Structures
- Result: single error object
- Validation: array of error objects
- Consistent field structure: code, field, messages, received, expected, suggestion, severity

### Native Method Usage
- Only in private helpers
- Marked with `[EXCEPTION]` comment
- Performance optimization justified
