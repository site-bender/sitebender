//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function mergeDescribedBy(
	existing: string | undefined,
	...ids: Array<string | undefined>
): string | undefined {
	const base = (existing?.trim() || "").split(/\s+/).filter(Boolean)
	const tokens = new Set(base)
	for (const id of ids) {
		if (!id) continue
		if (!tokens.has(id)) tokens.add(id)
	}
	const result = Array.from(tokens).join(" ")
	return result || undefined
}
