import not from "../../logic/not/index.ts"

//++ Checks if a value is an even integer (divisible by 2 with no remainder)
export default function isEven(value: unknown): boolean {
	// Check if it's a number and an integer
	if (typeof value !== "number" || not(Number.isInteger(value))) {
		return false
	}

	// Check if it's finite (not NaN or Infinity)
	if (not(Number.isFinite(value))) {
		return false
	}

	// Check if divisible by 2
	return value % 2 === 0
}

//?? [EXAMPLE] isEven(0) // true (zero is even)
//?? [EXAMPLE] isEven(2) // true
//?? [EXAMPLE] isEven(1) // false
//?? [EXAMPLE] isEven(-2) // true
//?? [EXAMPLE] isEven(2.5) // false (not an integer)
//?? [EXAMPLE] isEven(NaN) // false
/*??
 | [EXAMPLE]
 | const numbers = [1, 2, 3, 4, 5, 6]
 | numbers.filter(isEven)  // [2, 4, 6]
 |
 | [GOTCHA] Returns false for decimal numbers like 2.5
 | [PRO] Handles negative numbers correctly
 |
*/
