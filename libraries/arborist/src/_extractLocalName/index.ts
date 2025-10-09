//++ Extract the local name from a specifier
export default function extractLocalName(spec: Record<string, unknown>): string {
	const local = spec.local as Record<string, unknown> | undefined

	if (local) {
		const localType = local.type as string
		if (localType === "Identifier") {
			return local.value as string
		}
	}

	// Fallback for edge cases
	return "unknown"
}
