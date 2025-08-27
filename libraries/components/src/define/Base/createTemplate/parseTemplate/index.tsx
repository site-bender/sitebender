import type {
	Formatters,
	TemplateData,
} from "../../../../../types/schema.org/index.ts"

import DEFAULT_FORMATTERS from "../defaultFormatters/index.tsx"
import getNestedValue from "./getNestedValue/index.ts"
import parseProps from "./parseProps/index.tsx"
import splitArgs from "./splitArgs/index.ts"

export default function parseTemplate(
	template: string,
	data: TemplateData,
	formatters: Formatters = DEFAULT_FORMATTERS,
): (string | JSX.Element)[] {
	if (template === "") return []

	const staticEnd = template.indexOf("{{")
	if (staticEnd === 0) {
		const dynamicEnd = template.indexOf("}}")
		if (dynamicEnd === -1) return [template]

		const content = template.slice(2, dynamicEnd)
		const remaining = template.slice(dynamicEnd + 2)

		// Enhanced function call parsing with props support
		const fnMatch = content.match(/^(\w+)\(([^)]*)\)$/)
		if (fnMatch) {
			const [_, fnName, argsStr] = fnMatch
			const formatter = formatters[fnName]

			if (!formatter) {
				return [`{{${content}}}`, ...parseTemplate(remaining, data, formatters)]
			}

			// Split arguments respecting quoted strings
			const args = splitArgs(argsStr)
			const valuePath = args[0] || ""
			const propStrings = args.slice(1)

			const value = getNestedValue(data, valuePath.trim())
			const props = parseProps(...propStrings)

			return [
				formatter(value, props),
				...parseTemplate(remaining, data, formatters),
			]
		}

		// Fallback to simple variable substitution
		const value = getNestedValue(data, content)
		return [
			value !== "" ? value : `{{${content}}}`,
			...parseTemplate(remaining, data, formatters),
		]
	}

	if (staticEnd === -1) return [template]

	const staticPart = template.slice(0, staticEnd)
	const remaining = template.slice(staticEnd)
	return [staticPart, ...parseTemplate(remaining, data, formatters)]
}
