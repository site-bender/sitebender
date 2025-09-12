import type { Either } from "../../../types/fp/either/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../vanilla/validation/isNullish/index.ts"
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

//?? [EXAMPLE] rightWithInspect(42) // Right(42)
//?? [EXAMPLE] rightWithInspect({ id: 1, name: "Alice" }) // Right({"id":1,"name":"Alice"})
/*??
 | [EXAMPLE]
 | pipe(
 |   rightWithInspect(10),
 |   map(x => x * 2),
 |   map(x => x + 5),
 |   fold(
 |     err => `Failed: ${err}`,
 |     val => `Success: ${val}`
 |   )
 | ) // "Success: 25"
 |
 | [PRO] Improved inspect/console output for Right values
 | [GOTCHA] Adds inspection side-channel (impure); prefer plain right() for strict purity
 |
*/
