export default function isCSSStyleDeclaration(
	value: unknown,
): value is Record<string, unknown> {
	if (typeof value !== "object") {
		return false
	}

	if (Array.isArray(value)) {
		return false
	}

	if (value === null) {
		return false
	}

	if (Object.getOwnPropertySymbols(value).length > 0) {
		return false
	}

	return true
}
