import type { Value } from "../../../types/index.ts"

import isUndefined from "../../validation/isUndefined/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function safeParse<T>(
	parser: (value?: Value) => T,
): (value?: Value) => T | null {
	return function safeParseInner(value?: Value): T | null {
		try {
			const result = parser(value)
			// Return null if parser returns undefined
			return isUndefined(result) ? null : result
		} catch {
			// Return null for any parsing errors
			return null
		}
	}
}
