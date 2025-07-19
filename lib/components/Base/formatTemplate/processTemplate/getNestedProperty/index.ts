export default function getNestedProperty(
	obj: Record<string, unknown>,
	path: string,
): any {
	const keys = path.split(".")
	let current: any = obj

	for (const key of keys) {
		if (current && typeof current === "object" && key in current) {
			current = current[key]
		} else {
			return undefined
		}
	}

	return current
}
