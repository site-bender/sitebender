import type { Either } from "../../../types/fp/either/index.ts"

import isNullish from "../../../vanilla/validation/isNullish/index.ts"
import isLeft from "../isLeft/index.ts"

//++ Produces a best-effort string representation of an Either (debugging aid)
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
 | [EXAMPLE]
 | const results = [right(1), left("error"), right(2)]
 | results.map(show).join(", ") // 'Right(1), Left("error"), Right(2)'
 |
 | [PRO] Pure formatting without mutating original values
 | [PRO] Handles Error, Date, Function, Symbol, nullish gracefully
 | [PRO] Safe fallback when JSON.stringify throws (circular refs)
 |
 | [GOTCHA] Output not guaranteed to be stable for complex objects
 | [GOTCHA] Avoid parsing its output—intended for humans/logs only
 | [GOTCHA] Large nested structures may truncate depending on console
 */
