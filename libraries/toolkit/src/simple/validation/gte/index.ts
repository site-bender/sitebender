//++ Creates a predicate that checks if a value is greater than or equal to a threshold
export default function gte<T>(threshold: T) {
	return function isGreaterThanOrEqual<U extends T>(value: U): boolean {
		return value >= threshold
	}
}

//?? [EXAMPLE] gte(0)(5) // true
//?? [EXAMPLE] gte(0)(0) // true (equal counts)
//?? [EXAMPLE] gte(0)(-1) // false
//?? [EXAMPLE] gte("M")("M") // true (equal)
//?? [EXAMPLE] gte("M")("N") // true
//?? [EXAMPLE] gte("M")("L") // false
//?? [EXAMPLE] gte(5)(NaN) // false (NaN comparisons always false)
//?? [EXAMPLE] gte(Infinity)(Infinity) // true
/*??
 * [EXAMPLE]
 * const isNonNegative = gte(0)
 * isNonNegative(5)   // true
 * isNonNegative(0)   // true (equal counts)
 * isNonNegative(-1)  // false
 *
 * const scores = [65, 70, 89, 94, 58, 77]
 * scores.filter(gte(70))  // [70, 89, 94, 77]
 *
 * const from2024 = gte(new Date("2024-01-01"))
 * from2024(new Date("2024-01-01"))  // true (equal)
 * from2024(new Date("2024-06-01"))  // true
 * from2024(new Date("2023-12-31"))  // false
 *
 * [GOTCHA] NaN comparisons always return false
 * [GOTCHA] Uses JavaScript's >= operator coercion rules
 */
