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
import _transposeArray from "./_transposeArray/index.ts"
import _transposeToResult from "./_transposeToResult/index.ts"
import _transposeToValidation from "./_transposeToValidation/index.ts"

//++ Transposes a 2D array (converts rows to columns and columns to rows)
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function transpose<T>(
	matrix:
		| ReadonlyArray<ReadonlyArray<T>>
		| Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>>
		| Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>>,
):
	| Array<Array<T | undefined>>
	| Result<ValidationError, Array<Array<T | undefined>>>
	| Validation<ValidationError, Array<Array<T | undefined>>> {
	// Happy path: plain array (most common, zero overhead)
	if (isArray<ReadonlyArray<T>>(matrix)) {
		return _transposeArray(matrix)
	}

	// Result path: fail-fast monadic transformation
	if (isOk<ReadonlyArray<ReadonlyArray<T>>>(matrix)) {
		return chainResults(_transposeToResult)(matrix)
	}

	// Validation path: error accumulation monadic transformation
	if (isSuccess<ReadonlyArray<ReadonlyArray<T>>>(matrix)) {
		return chainValidations(_transposeToValidation)(matrix)
	}

	// Fallback: pass through unchanged (error/failure states)
	return matrix
}
