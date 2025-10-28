import type { Child, VirtualNode } from "../../types/index.ts"

import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import isNumber from "@sitebender/toolsmith/predicates/isNumber/index.ts"
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"
import isObject from "@sitebender/toolsmith/predicates/isObject/index.ts"
import isNull from "@sitebender/toolsmith/predicates/isNull/index.ts"
import isUndefined from "@sitebender/toolsmith/predicates/isUndefined/index.ts"
import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import getTag from "@sitebender/toolsmith/object/getTag/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

import _createTextConfig from "./_createTextConfig/index.ts"
import _createErrorConfig from "../_createErrorConfig/index.ts"
import { ELEMENT_TYPES } from "../constants/index.ts"

/*++
 + Processes a single child into VirtualNode
 + Null, undefined, and boolean children become error nodes
 + Strings and numbers become text nodes
 + Objects with _tag are already processed configs
 + Arrays are left as-is (will be flattened by flatMap in parent)
 */
export default function _processChild(
	child: Child,
): VirtualNode | ReadonlyArray<Child> {
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
	if (isNull(child)) {
		return _createErrorConfig("INVALID_CHILD_NULL")(
			"Null child encountered - this is not a valid DOM node",
		)(null)
	}

	/*++
	 + Undefined → error node
	 */
	if (isUndefined(child)) {
		return _createErrorConfig("INVALID_CHILD_UNDEFINED")(
			"Undefined child encountered - this is not a valid DOM node",
		)(undefined)
	}

	/*++
	 + Boolean → error node
	 */
	if (isBoolean(child)) {
		return _createErrorConfig("INVALID_CHILD_BOOLEAN")(
			`Boolean child (${child}) encountered - this is not a valid DOM node`,
		)(child)
	}

	/*++
	 + Array → return as-is, will be flattened by flatMap
	 */
	if (isArray(child)) {
		return child
	}

	/*++
	 + Object with _tag → already processed VirtualNode
	 + Uses getTag to access _tag property and includes to validate
	 + includes acts as type guard, narrowing tag type if validation succeeds
	 */
	if (isObject(child) && "_tag" in child) {
		const tagged = child as { _tag: string }
		const tagResult = getTag(tagged)
		const tag = getOrElse("")(tagResult)

		if (includes(ELEMENT_TYPES)(tag)) {
			/*++
			 + TypeScript now knows tag is "comment" | "element" | "error" | "text"
			 + Safe to return as VirtualNode
			 */
			return child as VirtualNode
		}

		/*++
		 + Object with invalid _tag → error node
		 */
		return _createErrorConfig("INVALID_CHILD_TAG")(
			`Object with invalid _tag "${String(tag)}" encountered`,
		)(child)
	}

	/*++
	 + Invalid child type → error node
	 + [EXCEPTION] typeof operator needed to describe the invalid type in error message
	 */
	return _createErrorConfig("INVALID_CHILD_TYPE")(
		`Invalid child type "${typeof child}" encountered`,
	)(child)
}
