//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isNullish = <T>(value: T | null | undefined): value is null | undefined =>
	value === null || value === undefined

export default isNullish
