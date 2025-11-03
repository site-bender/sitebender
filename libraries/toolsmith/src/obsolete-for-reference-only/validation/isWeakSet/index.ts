//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isWeakSet = (value: unknown): value is WeakSet<object> =>
	value instanceof WeakSet

export default isWeakSet
