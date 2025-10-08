//++ Logical AND with dual mode:
//++ 1) Value mode: and(a)(b) → Boolean(a) && Boolean(b)
//++ 2) Predicate mode: and(p1)(p2)(v) applies both predicates to v,
//++    preserving TypeScript narrowing when both are type guards.
export default function and<T, A extends T>(
	p1: (value: T) => value is A,
): <B extends A>(
	p2: (value: A) => value is B,
) => (value: T) => value is B

export default function and<T>(
	p1: (value: T) => boolean,
): (p2: (value: T) => boolean) => (value: T) => boolean

export default function and(
	a: unknown,
): (b: unknown) => unknown

export default function and(
	a: unknown,
) {
	return function andWithA(
		b: unknown,
	): unknown {
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

		// Happy path: Value mode - return logical AND of truthiness
		return Boolean(a) && Boolean(b)
	}
}
