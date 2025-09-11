import type { Either } from "../../types/fp/either/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../simple/validation/isNullish/index.ts"
import left from "../left/index.ts"

//++ Creates a Left value with enhanced debugging output for better console logging
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

//?? [EXAMPLE] leftWithInspect("User not found") // Left("User not found")
//?? [EXAMPLE] leftWithInspect({ field: "email", message: "Invalid" }) // Left({"field":"email","message":"Invalid"})
/*??
 | [EXAMPLE]
 | pipe(
 |   leftWithInspect("error"),
 |   map((x: number) => x * 2),  // Not executed
 |   fold(
 |     err => `Failed: ${err}`,
 |     val => `Success: ${val}`
 |   )
 | ) // "Failed: error"
 |
 | [PRO] Better debugging with nice console output for Either values
 | [GOTCHA] Adds inspection method which is impure - use regular left() for pure FP
 |
*/
