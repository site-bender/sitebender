//++ Extract the local name from a specifier
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

export default function extractLocalName(spec: Record<string, unknown>): string {
	const local = spec.local as Record<string, unknown> | undefined

	if (local) {
		const localType = local.type as string
		if (isEqual(localType)("Identifier")) {
			return local.value as string
		}
	}

	// Fallback for edge cases
	return "unknown"
}
