import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import _{{FUNCTION_NAME}}Array from "./_{{FUNCTION_NAME}}Array/index.ts"
import _{{FUNCTION_NAME}}ToResult from "./_{{FUNCTION_NAME}}ToResult/index.ts"
import _{{FUNCTION_NAME}}ToValidation from "./_{{FUNCTION_NAME}}ToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + {{FUNCTION_DESCRIPTION}}
 */
export default function {{FUNCTION_NAME}}<E, T, U>({{PARAM1_NAME}}: {{PARAM1_TYPE}}) {
	return function {{FUNCTION_NAME}}With{{PARAM1_NAME_PASCAL}}({{PARAM2_NAME}}: {{PARAM2_TYPE}}) {
		//++ [OVERLOAD] Array path: takes array, returns {{RETURN_DESCRIPTION}}
		function {{FUNCTION_NAME}}With{{PARAM1_NAME_PASCAL}}And{{PARAM2_NAME_PASCAL}}(array: ReadonlyArray<T>): {{RETURN_TYPE}}

		//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
		function {{FUNCTION_NAME}}With{{PARAM1_NAME_PASCAL}}And{{PARAM2_NAME_PASCAL}}(
			array: Result<E, ReadonlyArray<T>>,
		): Result<E, {{RETURN_TYPE}}>

		//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
		function {{FUNCTION_NAME}}With{{PARAM1_NAME_PASCAL}}And{{PARAM2_NAME_PASCAL}}(
			array: Validation<E, ReadonlyArray<T>>,
		): Validation<E, {{RETURN_TYPE}}>

		//++ Implementation of the full curried function
		function {{FUNCTION_NAME}}With{{PARAM1_NAME_PASCAL}}And{{PARAM2_NAME_PASCAL}}(
			array:
				| ReadonlyArray<T>
				| Result<E, ReadonlyArray<T>>
				| Validation<E, ReadonlyArray<T>>,
		): {{RETURN_TYPE}} | Result<E, {{RETURN_TYPE}}> | Validation<E, {{RETURN_TYPE}}> {
			// Happy path: plain array
			if (isArray<T>(array)) {
				return _{{FUNCTION_NAME}}Array({{PARAM1_NAME}})({{PARAM2_NAME}})(array)
			}

			// Result path: fail-fast monadic operation
			if (isOk<ReadonlyArray<T>>(array)) {
				return chainResults(_{{FUNCTION_NAME}}ToResult({{PARAM1_NAME}})({{PARAM2_NAME}}))(array)
			}

			// Validation path: error accumulation monadic operation
			if (isSuccess<ReadonlyArray<T>>(array)) {
				return chainValidations(_{{FUNCTION_NAME}}ToValidation({{PARAM1_NAME}})({{PARAM2_NAME}}))(array)
			}

			// Fallback: pass through unchanged (handles error/failure states)
			return array
		}

		return {{FUNCTION_NAME}}With{{PARAM1_NAME_PASCAL}}And{{PARAM2_NAME_PASCAL}}
	}
}
