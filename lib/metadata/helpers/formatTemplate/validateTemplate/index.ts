import type { Result } from "../../../types/Result/index.ts"

import { failure, success } from "../../../types/Result/index.ts"

export type TemplateValidationError =
	| "EMPTY_TEMPLATE"
	| "MALFORMED_EXPRESSION"
	| "UNCLOSED_EXPRESSION"
	| "INVALID_FUNCTION_SYNTAX"
	| "UNKNOWN_FUNCTION"

export default function validateTemplate(
	template: string,
	availableFunctions: string[] = [],
): Result<string, TemplateValidationError> {
	// Check for empty template
	if (!template || template.trim() === "") {
		return failure("EMPTY_TEMPLATE")
	}

	// Find all expressions
	const expressions = template.match(/\{\{[^}]*\}\}/g) || []

	// Check for unclosed expressions
	const openBraces = (template.match(/\{\{/g) || []).length
	const closeBraces = (template.match(/\}\}/g) || []).length

	if (openBraces !== closeBraces) {
		return failure("UNCLOSED_EXPRESSION")
	}

	// Validate each expression
	for (const expr of expressions) {
		const content = expr.slice(2, -2).trim()

		if (!content) {
			return failure("MALFORMED_EXPRESSION")
		}

		// Check function syntax if it looks like a function call
		const functionMatch = content.match(/^(\w+)\(([^)]*)\)$/)
		if (functionMatch) {
			const [, funcName] = functionMatch

			if (
				availableFunctions.length > 0 && !availableFunctions.includes(funcName)
			) {
				return failure("UNKNOWN_FUNCTION")
			}
		}
	}

	return success(template)
}
