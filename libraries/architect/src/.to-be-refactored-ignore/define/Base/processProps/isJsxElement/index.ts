export default function isJsxElement(
	obj: unknown,
): obj is { type: unknown; props: unknown } {
	return obj !== undefined &&
		obj !== null &&
		typeof obj === "object" &&
		"type" in obj &&
		"props" in obj
}
