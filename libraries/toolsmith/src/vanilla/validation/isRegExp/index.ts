//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp

export default isRegExp
