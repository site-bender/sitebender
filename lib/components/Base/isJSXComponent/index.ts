export default function isJSXComponent(value: unknown): boolean {
	if (
		typeof value === "object" &&
		value !== null &&
		"type" in value &&
		"props" in value
	) {
		return true
	}

	if (Array.isArray(value)) {
		return value.some(
			(el: any) =>
				typeof el === "object" &&
				el !== null &&
				el.type === "script" &&
				el.props?.type === "application/ld+json",
		)
	}

	return false
}
