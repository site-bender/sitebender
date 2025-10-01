//++ Checks if a Set is not empty (has at least one element)
export default function isNotEmpty<T>(set: Set<T>): boolean {
	return set instanceof Set && set.size > 0
}
