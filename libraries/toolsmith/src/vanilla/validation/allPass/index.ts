//++ Creates a predicate that returns true if all supplied predicates return true
export default function allPass<T>(predicates: Array<(value: T) => boolean>) {
	return function checkAllPass(value: T): boolean {
		for (const predicate of predicates) {
			if (!predicate(value)) {
				return false
			}
		}
		return true
	}
}

//?? [EXAMPLE] allPass([n => n > 0, n => n % 2 === 0])(4) // true
//?? [EXAMPLE] allPass([n => n > 0, n => n % 2 === 0])(3) // false (not even)
//?? [EXAMPLE] allPass([])(anything) // true (vacuous truth)
/*??
 | [EXAMPLE]
 | const isPositive = (n: number) => n > 0
 | const isEven = (n: number) => n % 2 === 0
 | const isSmall = (n: number) => n < 100
 | const isPositiveEvenSmall = allPass([isPositive, isEven, isSmall])
 | isPositiveEvenSmall(4)    // true
 | isPositiveEvenSmall(102)  // false (not small)
 |
 | const inRange = (min: number, max: number) =>
 |   allPass([
 |     (n: number) => n >= min,
 |     (n: number) => n <= max,
 |     (n: number) => !Number.isNaN(n)
 |   ])
 | const isPercentage = inRange(0, 100)
 | isPercentage(50)  // true
 | isPercentage(101) // false
 |
 | [GOTCHA] Empty predicate arrays return true (vacuous truth)
 | [GOTCHA] Short-circuits on first false for performance
 |
*/
