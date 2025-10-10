//++ Logical OR with dual mode:
//++ 1) Value mode: or(a)(b) → Boolean(a) || Boolean(b)
//++ 2) Predicate mode: or(p1)(p2)(v) applies either predicate to v
export default function or(
	a: unknown,
) {
	return function orWithA(
		b: unknown,
	): ((value: unknown) => boolean) | unknown {
		// Happy path: Predicate mode - both arguments are functions
		if (typeof a === "function" && typeof b === "function") {
			const p1 = a as (v: unknown) => boolean
			const p2 = b as (v: unknown) => boolean

			return function orPredicates(
				value: unknown,
			): boolean {
				// Happy path: first predicate passes (short-circuit)
				if (p1(value)) {
					return true
				}

				// Check second predicate
				if (p2(value)) {
					// Happy path: second predicate passes
					return true
				}

				// Sad path: both predicates fail
				return false
			}
		}

		// Happy path: Value mode - return logical OR (first truthy value)
		return a || b
	}
}
