//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isNotUndefined = <T>(value: T | undefined): value is T =>
	value !== undefined

export default isNotUndefined
