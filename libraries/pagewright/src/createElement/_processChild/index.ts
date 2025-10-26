import type { Child, ElementConfig } from "../../types/index.ts"

import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import isNumber from "@sitebender/toolsmith/predicates/isNumber/index.ts"
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"
import isNullish from "@sitebender/toolsmith/predicates/isNullish/index.ts"
import isObject from "@sitebender/toolsmith/predicates/isObject/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import getTag from "@sitebender/toolsmith/object/getTag/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import _createTextConfig from "../_createTextConfig/index.ts"
import { ELEMENT_TYPES } from "../constants/index.ts"

/*++
 + Processes a single child into ElementConfig
 + Null, undefined, and boolean children become error nodes
 + Strings and numbers become text nodes
 + Objects with _tag are already processed configs
 + Arrays are left as-is (will be flattened by flatMap in parent)
 */
export default function _processChild(
	child: Child,
): ElementConfig | ReadonlyArray<Child> {
	/*++
	 + [EXCEPTION] Type checking with typeof unavoidable
	 + This is primitive type discrimination with no higher-level abstraction
	 */

	/*++
	 + String or number → text node config
	 */
	if (isString(child)) {
		return _createTextConfig(child)
	}

	if (isNumber(child)) {
		return _createTextConfig(String(child))
	}

	/*++
	 + Null → error node
	 */
	if (child === null) {
		return {
			_tag: "error" as const,
			code: "INVALID_CHILD_NULL",
			message: "Null child encountered - this is not a valid DOM node",
			received: null,
		}
	}

	/*++
	 + Undefined → error node
	 */
	if (child === undefined) {
		return {
			_tag: "error" as const,
			code: "INVALID_CHILD_UNDEFINED",
			message: "Undefined child encountered - this is not a valid DOM node",
			received: undefined,
		}
	}

	/*++
	 + Boolean → error node
	 */
	if (typeof child === "boolean") {
		return {
			_tag: "error" as const,
			code: "INVALID_CHILD_BOOLEAN",
			message:
				`Boolean child (${child}) encountered - this is not a valid DOM node`,
			received: child,
		}
	}

	/*++
	 + Array → return as-is, will be flattened by flatMap
	 */
	if (isArray(child)) {
		return child
	}

	/*++
	 + Object with _tag → already processed ElementConfig
	 + Uses getTag to access _tag property and includes to validate
	 */
	if (isObject(child) && "_tag" in child) {
		const tagged = child as { _tag: string }
		const tagResult = getTag(tagged)
		const tag = getOrElse("")(tagResult)
		const isValidTag = includes(ELEMENT_TYPES)(
			tag as typeof ELEMENT_TYPES[number],
		)

		if (isValidTag) {
			return child as ElementConfig
		}

		/*++
		 + Object with invalid _tag → error node
		 */
		return {
			_tag: "error" as const,
			code: "INVALID_CHILD_TAG",
			message: `Object with invalid _tag "${String(tagged._tag)}" encountered`,
			received: child,
		}
	}

	/*++
	 + Invalid child type → error node
	 */
	return {
		_tag: "error" as const,
		code: "INVALID_CHILD_TYPE",
		message: `Invalid child type "${typeof child}" encountered`,
		received: child,
	}
}
