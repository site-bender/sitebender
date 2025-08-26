import flattenSubtypeProperties from "./flattenSubtypeProperties/index.ts"
import shouldSkipProperty from "./shouldSkipProperty/index.ts"

export default function processProps(
	obj: Record<string, unknown> | Record<string, unknown>[],
): Record<string, unknown> | Record<string, unknown>[] {
	if (obj === null || obj === undefined) {
		return obj
	}

	if (Array.isArray(obj)) {
		return obj.flatMap((item) => {
			const processed = processProps(item)
			return Array.isArray(processed) ? processed : [processed]
		})
	}

	if (typeof obj === "object") {
		const processed = Object.entries(obj)
			.filter(([_, value]) => value !== undefined && value !== null)
			.filter(([key, value]) => !shouldSkipProperty(key, value))
			.reduce<Record<string, unknown>>((acc, [key, value]) => ({
				...acc,
				[key === "_type" ? "@type" : key]: processProps(value as Record<string, unknown> | Record<string, unknown>[]),
			}), {})

		// Flatten subtypeProperties if present
		return flattenSubtypeProperties(processed)
	}

	return obj
}
