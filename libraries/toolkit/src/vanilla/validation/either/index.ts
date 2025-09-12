//++ Creates a predicate that returns true if either supplied predicate returns true
export default function either<T>(pred1: (value: T) => unknown) {
	return function withSecondPredicate(pred2: (value: T) => unknown) {
		return function checkEither(value: T): boolean {
			return Boolean(pred1(value)) || Boolean(pred2(value))
		}
	}
}

//?? [EXAMPLE] either(n => n < 0)(n => n > 1000)(-5) // true (negative)
//?? [EXAMPLE] either(n => n < 0)(n => n > 1000)(50) // false (neither)
//?? [EXAMPLE] either(n => n < 0)(n => n > 1000)(2000) // true (huge)
/*??
 | [EXAMPLE]
 | const isNegative = (n: number) => n < 0
 | const isHuge = (n: number) => n > 1000
 | const isExtreme = either(isNegative)(isHuge)
 | isExtreme(-5)   // true (negative)
 | isExtreme(2000) // true (huge)
 | isExtreme(50)   // false (neither)
 |
 | const isSaturday = (d: Date) => d.getDay() === 6
 | const isSunday = (d: Date) => d.getDay() === 0
 | const isWeekend = either(isSaturday)(isSunday)
 | isWeekend(new Date("2024-01-06"))  // true (Saturday)
 | isWeekend(new Date("2024-01-08"))  // false (Monday)
 |
 | [GOTCHA] Short-circuits if first predicate returns true
 | [GOTCHA] Converts both results to boolean with Boolean()
 |
*/
