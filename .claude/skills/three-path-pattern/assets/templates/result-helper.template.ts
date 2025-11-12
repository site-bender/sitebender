import type { Result } from "../../../types/fp/result/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + {{HELPER_DESCRIPTION}}
 */
export default function _{{FUNCTION_NAME}}ToResult<E, T, U>(
	{{PARAM1_NAME}}: {{PARAM1_TYPE}},
) {
	return function _{{FUNCTION_NAME}}ToResultWith{{PARAM1_NAME_PASCAL}}({{PARAM2_NAME}}: {{PARAM2_TYPE}}) {
		return function _{{FUNCTION_NAME}}ToResultWith{{PARAM1_NAME_PASCAL}}And{{PARAM2_NAME_PASCAL}}(
			array: ReadonlyArray<T>,
		): Result<E, {{RETURN_TYPE}}> {
			if (isFunction({{PARAM1_NAME}})) {
				// Happy path: function and array are valid
				if (isArray(array)) {
					/*++
					 + [EXCEPTION] .{{NATIVE_METHOD}} is permitted here for performance reasons
					 + This is the ONLY place .{{NATIVE_METHOD}} should be used
					 + Everywhere else, use the `{{FUNCTION_NAME}}` function instead
					 */
					const result = {{IMPLEMENTATION}}
					return ok(result)
				}

				// Error: invalid array
				return error({
					code: "{{FUNCTION_NAME_UPPER}}_INVALID_ARRAY",
					field: "array",
					messages: ["Expected array but received invalid input"],
					received: typeof array,
					expected: "Array",
					suggestion: "Provide a valid array to {{FUNCTION_NAME}} over",
					severity: "requirement" as const,
				} as E)
			}

			// Error: invalid function
			return error({
				code: "{{FUNCTION_NAME_UPPER}}_INVALID_FUNCTION",
				field: "function",
				messages: ["Expected function but received invalid input"],
				received: typeof {{PARAM1_NAME}},
				expected: "Function",
				suggestion: "Provide a valid function to {{FUNCTION_NAME}} with",
				severity: "requirement" as const,
			} as E)
		}
	}
}
