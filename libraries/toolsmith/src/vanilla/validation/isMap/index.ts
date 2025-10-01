//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isMap = (value: unknown): value is Map<unknown, unknown> =>
	value instanceof Map

export default isMap
