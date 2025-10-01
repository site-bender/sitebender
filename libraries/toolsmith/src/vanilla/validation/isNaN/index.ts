//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isNaN = (value: unknown): value is number => Number.isNaN(value)

export default isNaN
