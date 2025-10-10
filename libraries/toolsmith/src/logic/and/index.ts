//++ Logical AND with dual mode:
//++ 1) Value mode: and(a)(b) → Boolean(a) && Boolean(b)
//++ 2) Predicate mode: and(p1)(p2)(v) applies both predicates to v
export default function and(
	a: unknown,
) {
	return function andWithA(
		b: unknown,
	): ((value: unknown) => boolean) | unknown {
		// Happy path: Predicate mode - both arguments are functions
		if (typeof a === "function" && typeof b === "function") {
			const p1 = a as (v: unknown) => boolean
			const p2 = b as (v: unknown) => boolean

			return function andPredicates(
				value: unknown,
			): boolean {
				// Happy path: first predicate passes
				if (p1(value)) {
					// Happy path: second predicate passes
					if (p2(value)) {
						return true
					}

					// Sad path: second predicate fails
					return false
				}

				// Sad path: first predicate fails (short-circuit)
				return false
			}
		}

		// Happy path: Value mode - return logical AND (first falsy or last truthy)
		return a && b
	}
}
