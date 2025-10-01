//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function formatValue(value: unknown): string {
	if (value === null) return "null"
	if (value === undefined) return "undefined"
	if (typeof value === "string") return `"${value}"`
	if (typeof value === "number") return String(value)
	if (typeof value === "boolean") return String(value)
	if (Array.isArray(value)) {
		return `[${value.map((v) => formatValue(v)).join(", ")}]`
	}
	if (typeof value === "object") {
		const entries = Object.entries(value).map(
			([k, v]) => `${k}: ${formatValue(v)}`,
		)
		return `{ ${entries.join(", ")} }`
	}
	return String(value)
}
