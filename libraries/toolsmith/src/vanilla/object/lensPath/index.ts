import type { Value } from "../../../types/index.ts"
import type { Lens } from "../lens/index.ts"

import assocPath from "../assocPath/index.ts"
import lens from "../lens/index.ts"
import path from "../path/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lensPath = (
	pathArray: Array<string | number>,
): Lens<Value, Value> => {
	return lens<Value, Value>(
		// Getter: traverse path to get value
		(obj) => path(pathArray as Array<string | number>)(obj),
	)(
		// Setter: immutably set value at path
		(value) => (obj) => {
			// Empty path means replace entire object
			if (pathArray.length === 0) {
				return value
			}

			// Use assocPath for immutable nested updates
			return assocPath(pathArray as Array<string | number>)(value)(
				obj && typeof obj === "object" ? obj as Record<string, Value> : {},
			)
		},
	)
}

export default lensPath
