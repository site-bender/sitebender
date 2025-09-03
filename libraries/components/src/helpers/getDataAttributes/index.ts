import toKebabCase from "../toKebabCase/index.ts"

export default function getDataAttributes(
	attrs: Record<string, unknown>,
): Record<string, string> {
	const out: Record<string, string> = {}
	for (const [key, value] of Object.entries(attrs)) {
		if (value === undefined || value === null || value === false) continue
		const attr = `data-${toKebabCase(key)}`
		out[attr] = String(value)
	}
	return out
}

