//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isNotNull = <T>(value: T | null): value is T => value !== null

export default isNotNull
