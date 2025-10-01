//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isWeakMap = (value: unknown): value is WeakMap<object, unknown> =>
	value instanceof WeakMap

export default isWeakMap
