import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isFinite from "../../predicates/isFinite/index.ts"
import _findClosest from "./_findClosest/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Finds the value closest to a target
 */
export default function closest<E>(target: number) {
	//++ Helper for processing Result arrays
	function processResultArray(
		arr: ReadonlyArray<number>,
	): Result<E, number | null> {
		//++ [EXCEPTION] Using .length property for performance
		if (arr.length === 0) {
			return { _tag: "Ok", value: null }
		}

		//++ [EXCEPTION] Using native .filter() for performance
		const validNumbers = arr.filter(isFinite)

		//++ [EXCEPTION] Using .length property for performance
		if (validNumbers.length === 0) {
			return { _tag: "Ok", value: null }
		}

		const firstElement = validNumbers[0]

		if (firstElement === undefined) {
			return { _tag: "Ok", value: null }
		}

		//++ [EXCEPTION] Using native .reduce() for performance
		const result = validNumbers.reduce(function applyFindClosest(
			closestValue: number,
			currentValue: number,
		): number {
			return _findClosest(target)(closestValue)(currentValue)
		})

		return { _tag: "Ok", value: result }
	}

	//++ Helper for processing Validation arrays
	function processValidationArray(
		arr: ReadonlyArray<number>,
	): Validation<E, number | null> {
		//++ [EXCEPTION] Using .length property for performance
		if (arr.length === 0) {
			return { _tag: "Success", value: null }
		}

		//++ [EXCEPTION] Using native .filter() for performance
		const validNumbers = arr.filter(isFinite)

		//++ [EXCEPTION] Using .length property for performance
		if (validNumbers.length === 0) {
			return { _tag: "Success", value: null }
		}

		const firstElement = validNumbers[0]

		if (firstElement === undefined) {
			return { _tag: "Success", value: null }
		}

		//++ [EXCEPTION] Using native .reduce() for performance
		const result = validNumbers.reduce(function applyFindClosest(
			closestValue: number,
			currentValue: number,
		): number {
			return _findClosest(target)(closestValue)(currentValue)
		})

		return { _tag: "Success", value: result }
	}

	//++ [OVERLOAD] Array closest: takes array, returns closest number or null
	function closestToTarget(array: ReadonlyArray<number>): number | null

	//++ [OVERLOAD] Result closest: takes and returns Result monad (fail fast)
	function closestToTarget(
		array: Result<E, ReadonlyArray<number>>,
	): Result<E, number | null>

	//++ [OVERLOAD] Validation closest: takes and returns Validation monad (accumulator)
	function closestToTarget(
		array: Validation<E, ReadonlyArray<number>>,
	): Validation<E, number | null>

	//++ Implementation of the full curried function
	function closestToTarget(
		array:
			| ReadonlyArray<number>
			| Result<E, ReadonlyArray<number>>
			| Validation<E, ReadonlyArray<number>>,
	):
		| number
		| null
		| Result<E, number | null>
		| Validation<E, number | null> {
		// Happy path: plain array
		if (isArray<number>(array)) {
			//++ [EXCEPTION] Using .length property for performance
			if (array.length === 0) {
				return null
			}

			//++ [EXCEPTION] Using native .filter() for performance in plain path
			const validNumbers = array.filter(isFinite)

			//++ [EXCEPTION] Using .length property for performance
			if (validNumbers.length === 0) {
				return null
			}

			//++ Get first element as initial value
			const firstElement = validNumbers[0]

			if (firstElement === undefined) {
				return null
			}

			//++ [EXCEPTION] Using native .reduce() for performance in plain path
			const result = validNumbers.reduce(function applyFindClosest(
				closestValue: number,
				currentValue: number,
			): number {
				return _findClosest(target)(closestValue)(currentValue)
			})

			return result
		}

		// Result path: fail-fast monadic closest
		if (isOk<ReadonlyArray<number>>(array)) {
			return chainResults(processResultArray)(array)
		}

		// Validation path: error accumulation monadic closest
		if (isSuccess<ReadonlyArray<number>>(array)) {
			return chainValidations(processValidationArray)(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return closestToTarget
}
