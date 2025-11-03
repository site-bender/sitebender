//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const cond = <T, R>(
	pairs: Array<[(value: T) => unknown, (value: T) => R]>,
) =>
(
	value: T,
): R | null => {
	const match = pairs.find(([predicate]) => predicate(value))
	return match ? match[1](value) : null
}

export default cond
