import type { Either } from "../../../types/fp/either/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../predicates/isNullish/index.ts"
import right from "../right/index.ts"

//++ Creates a Right value with enhanced debugging output (console-friendly)
export default function rightWithInspect<A, E = never>(value: A): Either<E, A> {
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
		right<A, E>(value),
		(either) => `Right(${formatValue((either as { right: A }).right)})`,
	)
}
