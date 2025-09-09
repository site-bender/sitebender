//++ Creates a predicate that returns true if any supplied predicate returns true
export default function anyPass<T>(predicates: Array<(value: T) => unknown>) {
	return function checkAnyPass(value: T): boolean {
		for (const predicate of predicates) {
			if (predicate(value)) {
				return true
			}
		}
		return false
	}
}

//?? [EXAMPLE] anyPass([n => n < 0, n => n === 0, n => n > 1000])(-5) // true
//?? [EXAMPLE] anyPass([n => n < 0, n => n === 0, n => n > 1000])(50) // false
//?? [EXAMPLE] anyPass([])(anything) // false (empty array)
/*??
 * [EXAMPLE]
 * const isNegative = (n: number) => n < 0
 * const isZero = (n: number) => n === 0
 * const isHuge = (n: number) => n > 1000
 * const isSpecial = anyPass([isNegative, isZero, isHuge])
 * isSpecial(-5)   // true (negative)
 * isSpecial(0)    // true (zero)
 * isSpecial(2000) // true (huge)
 * isSpecial(50)   // false (none apply)
 *
 * const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
 * const isPhone = (s: string) => /^\d{3}-\d{3}-\d{4}$/.test(s)
 * const isUsername = (s: string) => /^[a-zA-Z0-9_]{3,}$/.test(s)
 * const isValidContact = anyPass([isEmail, isPhone, isUsername])
 * isValidContact("user@example.com")  // true (email)
 * isValidContact("555-123-4567")      // true (phone)
 * isValidContact("john_doe")          // true (username)
 * isValidContact("invalid!")          // false (none match)
 *
 * [GOTCHA] Empty predicate arrays return false
 * [GOTCHA] Short-circuits on first true for performance
 */
