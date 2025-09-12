//++ Creates a predicate that returns true if both supplied predicates return true
export default function both<T>(pred1: (value: T) => unknown) {
	return function withSecondPredicate(pred2: (value: T) => unknown) {
		return function checkBoth(value: T): boolean {
			return Boolean(pred1(value)) && Boolean(pred2(value))
		}
	}
}

//?? [EXAMPLE] both(n => n > 0)(n => n % 2 === 0)(4) // true
//?? [EXAMPLE] both(n => n > 0)(n => n % 2 === 0)(3) // false (not even)
//?? [EXAMPLE] both(n => n > 0)(n => n % 2 === 0)(-2) // false (not positive)
/*??
 | [EXAMPLE]
 | const isPositive = (n: number) => n > 0
 | const isEven = (n: number) => n % 2 === 0
 | const isPositiveEven = both(isPositive)(isEven)
 | isPositiveEven(4)  // true
 | isPositiveEven(3)  // false (positive but odd)
 | isPositiveEven(-2) // false (even but negative)
 |
 | const hasMinLength = (min: number) => (s: string) => s.length >= min
 | const hasMaxLength = (max: number) => (s: string) => s.length <= max
 | const hasLengthBetween = (min: number, max: number) =>
 |   both(hasMinLength(min))(hasMaxLength(max))
 | const isValidUsername = hasLengthBetween(3, 20)
 | isValidUsername("ab")    // false (too short)
 | isValidUsername("alice") // true
 |
 | [GOTCHA] Short-circuits if first predicate returns false
 | [GOTCHA] Converts both results to boolean with Boolean()
 |
*/
