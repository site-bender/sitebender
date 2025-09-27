import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Calls function n times, collecting results
const times = <T>(
	n: number,
) =>
(
	fn: (index: number) => T,
): Array<T> => {
	// Handle invalid n values
	if (isNullish(n) || n <= 0 || not(Number.isFinite(n))) {
		return []
	}

	// Truncate to integer
	const count = Math.floor(n)

	// Use Array.from to generate the array functionally
	return Array.from({ length: count }, (_, i) => fn(i))
}

export default times

//?? [EXAMPLE] `times(5)((i: number) => i) // [0, 1, 2, 3, 4]`
//?? [EXAMPLE] `times(5)((i: number) => i * i) // [0, 1, 4, 9, 16]`
//?? [EXAMPLE] `times(3)(() => "hello") // ["hello", "hello", "hello"]`
//?? [EXAMPLE] `times(4)((i: number) => \`id-\${i + 1}\`) // ["id-1", "id-2", "id-3", "id-4"]`
//?? [EXAMPLE] `times(0)((i: number) => i) // []`
//?? [EXAMPLE] `times(-5)((i: number) => i) // []`
