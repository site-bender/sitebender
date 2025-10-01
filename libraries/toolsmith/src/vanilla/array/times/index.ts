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
