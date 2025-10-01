import type { Value } from "../../../types/index.ts"

import assocPath from "../assocPath/index.ts"
import path from "../path/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const modifyPath = <V extends Value, R extends Value>(
	pathArray: Array<string | number | symbol>,
) =>
(
	fn: (value: V) => R,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Value => {
	// Empty path modifies the entire object
	if (pathArray.length === 0) {
		return fn(obj as unknown as V)
	}

	// Get current value at path (may be undefined)
	const currentValue = path(pathArray as Array<string | number>)(obj) as V

	// Apply transformation
	const newValue = fn(currentValue)

	// Set the new value at path
	return assocPath(pathArray as Array<string | number>)(newValue)(
		obj || {},
	)
}

export default modifyPath
