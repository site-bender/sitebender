import type { Maybe } from "../../../types/fp/maybe/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../predicates/isNullish/index.ts"
import just from "../just/index.ts"

//++ Creates a Just value with enhanced debugging output for better console logging
export default function justWithInspect<A>(value: A): Maybe<A> {
	const formatValue = (v: unknown): string => {
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

	return withInspect(
		just<A>(value),
		(maybe) => `Just(${formatValue((maybe as { value: A }).value)})`,
	)
}
