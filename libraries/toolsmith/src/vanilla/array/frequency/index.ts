//++ Counts occurrences of each element
const frequency = <T>(array: Array<T>): Map<T, number> => {
	return array.reduce((freq, item) => {
		freq.set(item, (freq.get(item) ?? 0) + 1)
		return freq
	}, new Map<T, number>())
}

//?? [EXAMPLE] `frequency([1, 2, 2, 3, 3, 3])              // Map { 1 => 1, 2 => 2, 3 => 3 }`
//?? [EXAMPLE] `frequency(["a", "b", "a", "c", "b", "a"])  // Map { "a" => 3, "b" => 2, "c" => 1 }`
//?? [EXAMPLE] `frequency([])                              // Map {}`
//?? [EXAMPLE] `frequency([1, 2, 3, 4, 5])                // Map { 1 => 1, 2 => 1, 3 => 1, 4 => 1, 5 => 1 }`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Finding most common
 | const counts = frequency([1, 2, 2, 3, 3, 3, 4])
 | const mostCommon = [...counts.entries()].reduce((a, b) => b[1] > a[1] ? b : a)
 | // [3, 3] - element 3 appears 3 times
 | ```
 */

export default frequency
