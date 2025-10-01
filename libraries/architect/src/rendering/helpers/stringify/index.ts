//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const stringify = (value: unknown, spaceLength = 2): string => {
	if (value === null) return "null"
	if (value === undefined) return "undefined"
	if (typeof value === "function") return value.toString()
	if (typeof value === "object") {
		try {
			return JSON.stringify(value, null, spaceLength)
		} catch {
			return String(value)
		}
	}
	return String(value)
}

export default stringify
