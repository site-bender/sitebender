import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNullish from "../../../vanilla/validation/isNullish/index.ts"
import isNothing from "../isNothing/index.ts"

//++ Converts a Maybe value to its string representation for debugging
export default function show<A>(maybe: Maybe<A>): string {
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

	if (isNothing(maybe)) {
		return "Nothing"
	}

	return `Just(${formatValue(maybe.value)})`
}

//?? [EXAMPLE] show(just(42)) // "Just(42)"
//?? [EXAMPLE] show(nothing()) // "Nothing"
/*??
 | [EXAMPLE]
 | const trace = <A>(label: string) => (maybe: Maybe<A>): Maybe<A> => {
 |   console.log(`${label}: ${show(maybe)}`)
 |   return maybe
 | }
 | pipe(
 |   just(10),
 |   trace("Initial"),      // logs: "Initial: Just(10)"
 |   map(x => x * 2),
 |   trace("After double")  // logs: "After double: Just(20)"
 | )
 |
 | [PRO] Pure function for string conversion without object mutation
 | [PRO] Handles all JavaScript types including Error, Date, Function, Symbol
 |
*/
