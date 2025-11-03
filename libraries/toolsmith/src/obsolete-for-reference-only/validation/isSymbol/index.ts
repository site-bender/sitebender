//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const isSymbol = (value: unknown): value is symbol => typeof value === "symbol"

export default isSymbol
