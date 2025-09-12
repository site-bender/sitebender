/**
 * Create sliding windows over Set elements
 *
 * @pure
 * @immutable
 * @curried
 * @safe Returns [] for invalid inputs or non-positive window size
 */
const sliding = <T>(windowSize: number) =>
(
	set: Set<T> | null | undefined,
): Array<Array<T>> => {
	if (windowSize <= 0 || !(set instanceof Set)) return []
	const xs = Array.from(set)
	if (xs.length < windowSize) return []
	// Build windows with Array.from and slice; no mutation
	return Array.from(
		{ length: xs.length - windowSize + 1 },
		(_, i) => xs.slice(i, i + windowSize),
	)
}

export default sliding
