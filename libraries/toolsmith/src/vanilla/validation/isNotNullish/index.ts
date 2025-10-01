//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isNotNullish = <T>(
	value: T | null | undefined,
): value is T => {
	return value !== null && value !== undefined
}

export default isNotNullish
