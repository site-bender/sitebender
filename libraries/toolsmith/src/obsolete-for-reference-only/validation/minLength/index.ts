//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const minLength = (
	min: number,
) =>
(
	value: unknown,
): boolean => {
	if (value === null || value === undefined) {
		return false
	}

	// Check if value has a numeric length property
	if (typeof (value as ArrayLike<unknown>).length === "number") {
		return (value as ArrayLike<unknown>).length >= min
	}

	return false
}

export default minLength
