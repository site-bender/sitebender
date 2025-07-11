import type { JsonObject, JsonValue } from "../JsonValue/index.ts"

export default function cleanObject(obj: JsonValue): JsonValue {
	if (Array.isArray(obj)) {
		return obj.map(cleanObject).filter(Boolean)
	}
	if (obj && typeof obj === "object") {
		const entries = Object.entries(obj as JsonObject)
			.filter(([_, value]) => value !== undefined && value !== null)
			.map(([key, value]) => [key, cleanObject(value)])
		return Object.fromEntries(entries)
	}
	return obj
}
