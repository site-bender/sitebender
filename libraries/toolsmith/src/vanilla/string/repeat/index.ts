//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const repeat = (str: string) => (count: number): string =>
	count > 0 ? Array.from({ length: count }).fill(str).join("") : ""

export default repeat
