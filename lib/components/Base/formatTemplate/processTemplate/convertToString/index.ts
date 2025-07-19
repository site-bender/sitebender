export default function convertToString(value: any): string {
	if (value === null || value === undefined) {
		return ""
	}

	if (typeof value === "string") {
		return value
	}

	if (typeof value === "number" || typeof value === "boolean") {
		return String(value)
	}

	// For objects, try to get a meaningful string representation
	if (typeof value === "object") {
		if ("name" in value && typeof value.name === "string") {
			return value.name
		}
		if ("title" in value && typeof value.title === "string") {
			return value.title
		}
		return ""
	}

	return String(value)
}
