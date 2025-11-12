import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + {{HELPER_DESCRIPTION}}
 */
export default function _{{FUNCTION_NAME}}Array<T, U>(
	{{PARAM1_NAME}}: {{PARAM1_TYPE}},
) {
	return function _{{FUNCTION_NAME}}ArrayWith{{PARAM1_NAME_PASCAL}}({{PARAM2_NAME}}: {{PARAM2_TYPE}}) {
		return function _{{FUNCTION_NAME}}ArrayWith{{PARAM1_NAME_PASCAL}}And{{PARAM2_NAME_PASCAL}}(
			array: ReadonlyArray<T>,
		): {{RETURN_TYPE}} {
			// Happy path: valid inputs
			if (and(isFunction({{PARAM1_NAME}}))(isArray<T>(array))) {
				/*++
				 + [EXCEPTION] .{{NATIVE_METHOD}} is permitted here for performance reasons
				 + This is the ONLY place .{{NATIVE_METHOD}} should be used
				 + Everywhere else, use the `{{FUNCTION_NAME}}` function instead
				 */
				return {{IMPLEMENTATION}}
			}

			// Fallback: return {{FALLBACK_DESCRIPTION}}
			return {{FALLBACK_VALUE}}
		}
	}
}
