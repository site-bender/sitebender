//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const iff = (a: unknown) => (b: unknown): boolean => Boolean(a) === Boolean(b)

export default iff
