import type { Result } from "../../../../../types/Result/index.ts"

import { failure, success } from "../../../../../types/Result/index.ts"

export type ParsedExpression = {
	functionName?: string
	propertyName: string
	params?: Record<string, unknown>
}

// Parse template expressions like {{cite(title)}} or {{familyFirst(author, {class: "author"})}}
export default function parseTemplateExpression(
	expression: string,
): Result<ParsedExpression, string> {
	// Remove {{ and }}
	const content = expression.slice(2, -2).trim()

	// Check if it's a function call (has parentheses)
	if (content.includes("(") && content.includes(")")) {
		// Function call: cite(name) or year(foundingDate)
		const functionMatch = content.match(/^(\w+)\((.+)\)$/)
		if (!functionMatch) {
			return failure("Invalid function call syntax")
		}

		const [, functionName, propertyName] = functionMatch
		return success({
			functionName,
			propertyName: propertyName.trim(),
			params: {},
		})
	} else {
		// Simple property access: term, name, etc.
		return success({
			propertyName: content,
			params: {},
		})
	}
}
