//++ Deterministic JSON stringifier: sorts object keys recursively and handles arrays

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value)
}

export default function canonicalStringify(value: unknown): string {
	if (value === null || typeof value !== "object") {
		return JSON.stringify(value)
	}

	if (Array.isArray(value)) {
		const items = value.map((v) => canonicalStringify(v))
		return `[${items.join(",")}]`
	}

	if (isPlainObject(value)) {
		const keys = Object.keys(value).sort()
		const entries = keys.map((k) => `${JSON.stringify(k)}:${canonicalStringify((value as Record<string, unknown>)[k])}`)
		return `{${entries.join(",")}}`
	}

	// Fallback for objects like Date/Map/Set: stringify their JSON form
	return JSON.stringify(value)
}
