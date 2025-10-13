//++ Logical OR with dual mode:
//++ 1) Value mode: or(a)(b) → a || b (preserves types)
//++ 2) Predicate mode: or(p1)(p2)(v) applies either predicate to v
export default function or<A>(
	a: A,
) {
	return function orWithA<B>(
		b: B,
	): A extends (...args: any[]) => any
		? (B extends (...args: any[]) => any ? (value: unknown) => boolean : A | B)
		: (B extends (...args: any[]) => any ? A | B : A | B) {
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
			} as any
		}

		// Happy path: Value mode - return logical OR (first truthy value)
		return (a || b) as any
	}
}
