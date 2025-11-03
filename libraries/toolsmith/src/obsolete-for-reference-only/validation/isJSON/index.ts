import isNotNull from "../isNotNull/index.ts"
import isNull from "../isNull/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type JSONType = "object" | "array" | "string" | "number" | "boolean" | "null"

type JSONOptions = {
	type?: JSONType
}

export default function isJSON(
	options: JSONOptions = {},
) {
	return function validateJSON(value: unknown): boolean {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		try {
			const parsed = JSON.parse(value)

			// If no specific type requested, any valid JSON is acceptable
			if (!options.type) {
				return true
			}

			// Validate specific type
			switch (options.type) {
				case "object":
					return isNotNull(parsed) && typeof parsed === "object" &&
						!Array.isArray(parsed)
				case "array":
					return Array.isArray(parsed)
				case "string":
					return typeof parsed === "string"
				case "number":
					return typeof parsed === "number"
				case "boolean":
					return typeof parsed === "boolean"
				case "null":
					return isNull(parsed)
				default:
					return false
			}
		} catch {
			return false
		}
	}
}
