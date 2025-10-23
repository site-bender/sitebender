import type { Either } from "../../../types/fp/either/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../predicates/isNullish/index.ts"
import left from "../left/index.ts"

//++ Creates a Left value with enhanced debugging output (console-friendly)
export default function leftWithInspect<E, A = never>(value: E): Either<E, A> {
	const formatValue = (v: unknown): string => {
		if (v instanceof Error) {
			return `${v.name}: ${v.message}`
		}

		if (typeof v === "string") {
			return JSON.stringify(v)
		}

		if (isNullish(v)) {
			return String(v)
		}

		try {
			return JSON.stringify(v)
		} catch {
			return String(v)
		}
	}

	return withInspect(
		left<E, A>(value),
		(either) => `Left(${formatValue((either as { left: E }).left)})`,
	)
}
