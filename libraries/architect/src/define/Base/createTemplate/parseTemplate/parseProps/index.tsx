export default function parseProps(
	...propStrings: string[]
): Record<string, unknown> {
	const props: Record<string, unknown> = {}

	for (const propString of propStrings) {
		const match = propString.trim().match(/^(\w+)=["']([^"']*)["']$/)
		if (match) {
			const [_, key, value] = match
			props[key] = value
		}
	}

	return props
}
