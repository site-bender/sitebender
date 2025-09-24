import type { Maybe } from "../../../types/fp/maybe/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import isNullish from "../../../vanilla/validation/isNullish/index.ts"
import just from "../just/index.ts"

//++ Creates a Just value with enhanced debugging output for better console logging
export default function justWithInspect<A>(value: A): Maybe<A> {
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
		just<A>(value),
		(maybe) => `Just(${formatValue((maybe as { value: A }).value)})`,
	)
}

//?? [EXAMPLE] justWithInspect(42) // Just(42) (enhanced display)
//?? [EXAMPLE] justWithInspect({ id: 1, name: "Alice" }) // Just({"id":1,"name":"Alice"})
/*??
 | [EXAMPLE]
 | const results = [
 |   justWithInspect(1),
 |   nothingWithInspect(),
 |   justWithInspect(2)
 | ]
 | console.log(results)  // [ Just(1), Nothing, Just(2) ]
 |
 | [PRO] Superior developer experience when debugging Maybe values
 | [GOTCHA] Adds inspection method which is impure - use regular just() for pure FP
 |
*/
