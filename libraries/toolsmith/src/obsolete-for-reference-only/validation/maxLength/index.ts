// (JSDoc removed in favor of Envoy)
//++ maxLength(max)(value) — validates length <= max for strings/arrays/array-like
const maxLength = (
	max: number,
) =>
(
	value: unknown,
): boolean => {
	if (value === null || value === undefined) {
		return false
	}

	// Check if value has a numeric length property
	if (typeof (value as ArrayLike<unknown>).length === "number") {
		return (value as ArrayLike<unknown>).length <= max
	}

	return false
}

export default maxLength
