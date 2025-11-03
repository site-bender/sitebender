//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type MaybeSymDiffSet<T> = Set<T> & {
	symmetricDifference?: (other: Set<T>) => Set<T>
}

const symmetricDifference = <T>(setB: Set<T> | null | undefined) =>
(
	setA: Set<T> | null | undefined,
): Set<T> => {
	const a: MaybeSymDiffSet<T> =
		(setA instanceof Set ? setA : new Set<T>()) as MaybeSymDiffSet<T>
	const b: Set<T> = setB instanceof Set ? setB : new Set<T>()

	// Native support (ES2025+) if available
	if (typeof a.symmetricDifference === "function") {
		return a.symmetricDifference(b)
	}

	// Build via filtering without mutating inputs
	const onlyInA = Array.from(a).filter((x) => !b.has(x))
	const onlyInB = Array.from(b).filter((x) => !a.has(x))
	return new Set<T>([...onlyInA, ...onlyInB])
}

export default symmetricDifference
