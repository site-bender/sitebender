import type {
	Result,
	Validation,
	ValidationError,
} from "../../types/fp/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _flattenArray from "./_flattenArray/index.ts"
import _flattenToResult from "./_flattenToResult/index.ts"
import _flattenToValidation from "./_flattenToValidation/index.ts"

//++ Flattens nested arrays to specified depth
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function flatten<T, D extends number = 1>(
	depth: D = 1 as D,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns flattened array
	function flattenWithDepth(
		array: ReadonlyArray<T>,
	): Array<T extends ReadonlyArray<infer U> ? U : T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function flattenWithDepth(
		array: Result<
			ValidationError,
			ReadonlyArray<T>
		>,
	): Result<
		ValidationError,
		Array<T extends ReadonlyArray<infer U> ? U : T>
	>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function flattenWithDepth(
		array: Validation<
			ValidationError,
			ReadonlyArray<T>
		>,
	): Validation<
		ValidationError,
		Array<T extends ReadonlyArray<infer U> ? U : T>
	>

	//++ Implementation with type dispatch
	function flattenWithDepth(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| Array<T extends ReadonlyArray<infer U> ? U : T>
		| Result<
			ValidationError,
			Array<T extends ReadonlyArray<infer U> ? U : T>
		>
		| Validation<
			ValidationError,
			Array<T extends ReadonlyArray<infer U> ? U : T>
		> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _flattenArray(depth)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_flattenToResult(depth))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_flattenToValidation(depth))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return flattenWithDepth
}
