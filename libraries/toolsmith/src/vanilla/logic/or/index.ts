//++ Logical OR with dual mode:
//++ 1) Value mode: or(a)(b) → Boolean(a) || Boolean(b)
//++ 2) Predicate mode (same-value): or(p1)(p2)(v) applies either predicate to v,
//++    preserving TypeScript narrowing when both are type guards.
export default function or<T, A extends T>(
	p1: (value: T) => value is A,
): <B extends A>(
	p2: (value: A) => value is B,
) => (value: T) => value is A | B

export default function or<T>(
	p1: (value: T) => boolean,
): (p2: (value: T) => boolean) => (value: T) => boolean

// Implementation signature is intentionally broad to satisfy both overload families
export default function or(
	a: unknown,
): (b: unknown) => any

export default function or(
	a: unknown,
) {
	return function orWithSecond(
		b: unknown,
	): any {
		if (typeof a === "function" && typeof b === "function") {
			const p1 = a as (v: unknown) => boolean
			const p2 = b as (v: unknown) => boolean

			return function orPredicates(
				value: unknown,
			): boolean {
				if (p1(value)) {
					return true
				}

				if (p2(value)) {
					return true
				}

				return false
			}
		}

		return Boolean(a) || Boolean(b)
	}
}

//?? [EXAMPLE] Value mode
//?? or(true)(false)  // true
//?? or(0)("x")       // true
//?? or(0)(0)         // false
//?? [EXAMPLE] Predicate mode (same-value)
//?? const isFiniteNumber = or(isNumber)(isFinite)
//?? function g(x: unknown) {
//??   if (isFiniteNumber(x)) {
//??     // x is number OR finite here
//??     return x
//??   }
//??   return NaN
//?? }
