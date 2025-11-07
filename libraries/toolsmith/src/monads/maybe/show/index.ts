import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNullish from "../../../predicates/isNullish/index.ts"
import isNothing from "../isNothing/index.ts"

//++ Converts a Maybe value to its string representation for debugging
export default function show<A>(maybe: Maybe<A>): string {
	const formatValue = (v: unknown): string => {
		//++ [EXCEPTION] instanceof operator permitted in Toolsmith for performance - provides type checking for debugging output
		if (v instanceof Error) {
			return `Error: ${v.message}`
		}
		//++ [EXCEPTION] instanceof operator permitted in Toolsmith for performance - provides type checking for debugging output
		if (v instanceof Date) {
			return JSON.stringify(v)
		}
		//++ [EXCEPTION] typeof operator permitted in Toolsmith for performance - provides type checking for debugging output
		if (typeof v === "string") {
			return JSON.stringify(v)
		}
		//++ [EXCEPTION] typeof operator permitted in Toolsmith for performance - provides type checking for debugging output
		if (typeof v === "function") {
			return v.name ? `[Function: ${v.name}]` : "[Function]"
		}
		//++ [EXCEPTION] typeof operator permitted in Toolsmith for performance - provides type checking for debugging output
		if (typeof v === "symbol") {
			return v.toString()
		}
		if (isNullish(v)) {
			return String(v)
		}
		//++ [EXCEPTION] try/catch permitted in Toolsmith for performance - provides safe JSON serialization for debugging
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
