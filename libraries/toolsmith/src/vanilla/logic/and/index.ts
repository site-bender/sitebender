//++ Logical AND with dual mode:
//++ 1) Value mode: and(a)(b) → Boolean(a) && Boolean(b)
//++ 2) Predicate mode (same-value): and(p1)(p2)(v) applies both predicates to v,
//++    preserving TypeScript narrowing when both are type guards.
export default function and<T, A extends T>(
	p1: (value: T) => value is A,
): <B extends A>(
	p2: (value: A) => value is B,
) => (value: T) => value is B

export default function and<T>(
	p1: (value: T) => boolean,
): (p2: (value: T) => boolean) => (value: T) => boolean

// Implementation signature is intentionally broad to satisfy both overload families
export default function and(
	a: unknown,
): (b: unknown) => any

export default function and(
	a: unknown,
) {
	return function andWithSecond(
		b: unknown,
	): any {
		if (typeof a === "function" && typeof b === "function") {
			const p1 = a as (v: unknown) => boolean
			const p2 = b as (v: unknown) => boolean

			return function andPredicates(
				value: unknown,
			): boolean {
				if (p1(value)) {
					if (p2(value)) {
						return true
					}

					return false
				}

				return false
			}
		}

		return Boolean(a) && Boolean(b)
	}
}

//?? [EXAMPLE] Value mode
//?? and(true)(true)  // true
//?? and(1)(0)        // false
//?? [EXAMPLE] Predicate mode (same-value)
//?? const isFiniteNumber = and(isNumber)(isFinite)
//?? function f(x: unknown) {
//??   if (isFiniteNumber(x)) {
//??     // x is number here (both guards applied)
//??     return x + 1
//??   }
//??   return NaN
//?? }
