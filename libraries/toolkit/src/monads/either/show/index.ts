import type { Either } from "../../types/fp/either/index.ts"

import isNullish from "../../../simple/validation/isNullish/index.ts"
import isLeft from "../isLeft/index.ts"

//++ Converts an Either value to its string representation for debugging
export default function show<E, A>(either: Either<E, A>): string {
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

	if (isLeft(either)) {
		return `Left(${formatValue(either.left)})`
	}

	return `Right(${formatValue(either.right)})`
}

//?? [EXAMPLE] show(right(42)) // "Right(42)"
//?? [EXAMPLE] show(left("error")) // 'Left("error")'
/*??
 * [EXAMPLE]
 * const results = [right(1), left("error"), right(2)]
 * results.map(show).join(", ") // 'Right(1), Left("error"), Right(2)'
 *
 * [PRO] Pure function for string conversion without object mutation
 * [PRO] Handles all JavaScript types including Error, Date, Function, Symbol
 */
