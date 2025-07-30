export default function flattenSubtypeProperties(
	obj: Record<string, unknown>,
): Record<string, unknown> {
	if (
		"subtypeProperties" in obj && typeof obj.subtypeProperties === "object" &&
		obj.subtypeProperties !== null
	) {
		const { subtypeProperties, ...rest } = obj
		return {
			...rest,
			...(subtypeProperties as Record<string, unknown>),
		}
	}

	return obj
}
