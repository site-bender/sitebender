//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isPositive = (value: unknown): boolean => {
	return typeof value === "number" &&
		Number.isFinite(value) &&
		value > 0
}

export default isPositive
