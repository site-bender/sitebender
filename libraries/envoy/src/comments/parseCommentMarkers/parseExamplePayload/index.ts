//++ Parse example payload into code + optional expected
export default function parseExamplePayload(
	payload: string,
): { code: string; expected?: string } {
	if (!payload) return { code: "" }
	const parts = payload.split("//")
	if (parts.length > 1) {
		const expected = parts.slice(1).join("//").trim() || undefined
		return { code: parts[0].trim(), expected }
	}
	return { code: payload.trim() }
}
