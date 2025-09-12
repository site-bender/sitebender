//++ Creates a predicate that checks if a value is greater than a threshold
export default function gt<T>(threshold: T) {
	return function isGreaterThan<U extends T>(value: U): boolean {
		return value > threshold
	}
}

//?? [EXAMPLE] gt(0)(5) // true
//?? [EXAMPLE] gt(0)(-3) // false
//?? [EXAMPLE] gt("M")("N") // true (lexicographical)
//?? [EXAMPLE] gt("M")("A") // false
//?? [EXAMPLE] gt(10)(NaN) // false (NaN comparisons always false)
//?? [EXAMPLE] gt(1000)(Infinity) // true
/*??
 | [EXAMPLE]
 | const isPositive = gt(0)
 | isPositive(5)   // true
 | isPositive(-3)  // false
 | isPositive(0)   // false (not greater than)
 |
 | const numbers = [1, 5, 10, 15, 20, 25]
 | numbers.filter(gt(10))  // [15, 20, 25]
 |
 | const after2024 = gt(new Date("2024-01-01"))
 | after2024(new Date("2024-06-01"))  // true
 | after2024(new Date("2023-12-31"))  // false
 |
 | [GOTCHA] NaN comparisons always return false
 | [GOTCHA] Uses JavaScript's > operator coercion rules
 |
*/
