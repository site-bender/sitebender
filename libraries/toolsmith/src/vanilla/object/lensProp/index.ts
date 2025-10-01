import type { Value } from "../../../types/index.ts"
import type { Lens } from "../lens/index.ts"

import lens from "../lens/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lensProp = <T extends Record<string | symbol, Value>, K extends keyof T>(
	prop: K,
): Lens<T, T[K]> => {
	return lens<T, T[K]>(
		// Getter: access the property
		(obj) => obj[prop],
	)(
		// Setter: immutably update the property
		(value) => (obj) => ({
			...obj,
			[prop]: value,
		}),
	)
}

export default lensProp
