//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const xor = (a: unknown) => (b: unknown): boolean => Boolean(a) !== Boolean(b)

export default xor
