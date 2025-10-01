import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNullish from "../../../vanilla/validation/isNullish/index.ts"
import isNothing from "../isNothing/index.ts"

//++ Converts a Maybe value to its string representation for debugging
export default function show<A>(maybe: Maybe<A>): string {
	const formatValue = (v: unknown): string => {
		if (v instanceof Error) {
			return `Error: ${v.message}`
		}
		if (v instanceof Date) {
			return JSON.stringify(v)
		}
		if (typeof v === "string") {
			return JSON.stringify(v)
		}
		if (typeof v === "function") {
			return v.name ? `[Function: ${v.name}]` : "[Function]"
		}
		if (typeof v === "symbol") {
			return v.toString()
		}
		if (isNullish(v)) {
			return String(v)
		}
		try {
			return JSON.stringify(v)
		} catch {
			// Circular reference or other issue
			return String(v)
		}
	}

	if (isNothing(maybe)) {
		return "Nothing"
	}

	return `Just(${formatValue(maybe.value)})`
}
