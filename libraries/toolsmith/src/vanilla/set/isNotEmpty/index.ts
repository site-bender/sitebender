//++ Checks if a Set is not empty (has at least one element)
export default function isNotEmpty<T>(set: Set<T>): boolean {
	return set instanceof Set && set.size > 0
}

//?? [EXAMPLE] isNotEmpty(new Set()) // false
//?? [EXAMPLE] isNotEmpty(new Set([1, 2, 3])) // true
//?? [EXAMPLE] isNotEmpty(new Set([undefined])) // true (has one element)