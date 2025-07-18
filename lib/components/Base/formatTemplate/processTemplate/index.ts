import type { FormatContext } from "../../../../types/formatters/index.ts"

import { isFailure } from "../../../../types/Result/index.ts"
import parseTemplateExpression from "./parseTemplateExpression/index.ts"

// Process template string with {{}} replacements
export default function processTemplate(
	template: string,
	context: FormatContext,
): (string | JSX.Element)[] {
	// Handle escaped braces \{{ -> {{
	const processedTemplate = template.replace(/\\(\{\{)/g, "$1")

	// Split by template expressions
	const parts = processedTemplate.split(/(\{\{[^}]+\}\})/)

	return parts
		.map((part): string | JSX.Element => {
			if (part.startsWith("{{") && part.endsWith("}}")) {
				// This is a template expression
				const parseResult = parseTemplateExpression(part)

				if (isFailure(parseResult)) {
					return "INVALID_EXPRESSION"
				}

				const { functionName, propertyName, params } = parseResult.data

				if (functionName) {
					// Function call: {{cite(name)}}
					const formatter = context.formatters[functionName]
					if (!formatter) {
						return "INVALID_EXPRESSION"
					}

					const propertyValue = context.props[propertyName] ?? "UNKNOWN"
					return formatter(propertyValue, params)
				} else {
					// Property access: {{term}}
					return String(context.props[propertyName] ?? "UNKNOWN")
				}
			}

			// This is plain text
			return part
		})
		.filter((part): part is string | JSX.Element => part !== "")
}
