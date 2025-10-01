//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isSet = (value: unknown): value is Set<unknown> => value instanceof Set

export default isSet
