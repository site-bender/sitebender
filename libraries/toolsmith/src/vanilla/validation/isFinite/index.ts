//++ Type guard that checks if a value is a finite number (not Infinity, -Infinity, or NaN)
export default function isFinite(value: unknown): value is number {
	return Number.isFinite(value)
}

//?? [EXAMPLE] isFinite(0) // true
//?? [EXAMPLE] isFinite(3.14159) // true
//?? [EXAMPLE] isFinite(Number.MAX_VALUE) // true
//?? [EXAMPLE] isFinite(Infinity) // false
//?? [EXAMPLE] isFinite(NaN) // false
//?? [EXAMPLE] isFinite("123") // false (no coercion)
/*??
 | [EXAMPLE]
 | const values = [1, Infinity, NaN, 2.5, -Infinity, 0]
 | values.filter(isFinite)  // [1, 2.5, 0]
 |
 | [GOTCHA] Does not coerce strings like global isFinite()
 | [PRO] Type guard ensures value is a usable number
 |
*/
