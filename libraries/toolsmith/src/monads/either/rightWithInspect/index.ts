import type { Either } from "../../../types/fp/either/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../predicates/isNullish/index.ts"
import right from "../right/index.ts"

//++ Creates a Right value with enhanced debugging output (console-friendly)
export default function rightWithInspect<A, E = never>(value: A): Either<E, A> {
	const formatValue = (v: unknown): string => {
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

	return withInspect(
		right<A, E>(value),
		(either) => `Right(${formatValue((either as { right: A }).right)})`,
	)
}
