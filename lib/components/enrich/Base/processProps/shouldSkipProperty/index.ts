export default function shouldSkipProperty(
	key: string,
	value: unknown,
): boolean {
	return key === "children" && Array.isArray(value) && value.length === 0
}
