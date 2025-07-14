import type { JsObject } from "../../types/index.ts"

import isDefined from "../../../utilities/isDefined/index.ts"
import escapeHtml from "./escapeHtml/index.ts"
import { FORMATTING_FUNCTIONS } from "./formattingFunctions/index.ts"

export default function formatTemplate(
	template: string,
	data: JsObject,
): string {
	// First escape the template for security
	const escapedTemplate = escapeHtml(template)

	// Replace {{expression}} with values or function results
	return escapedTemplate.replace(/\{\{([^}]+)\}\}/g, (_match, expression) => {
		const trimmed = expression.trim()

		// Check if it's a function call: functionName(arg1, arg2, ...)
		const functionMatch = trimmed.match(/^(\w+)\(([^)]*)\)$/)

		if (functionMatch) {
			const [, funcName, argsString] = functionMatch
			const func =
				FORMATTING_FUNCTIONS[funcName as keyof typeof FORMATTING_FUNCTIONS]

			if (func) {
				// Parse arguments - handle both variables and string literals
				const args = argsString
					? argsString.split(",").map((arg: string) => {
						const cleanArg = arg.trim()
						// If it's a quoted string, return the string without quotes
						if (cleanArg.startsWith('"') && cleanArg.endsWith('"')) {
							return cleanArg.slice(1, -1)
						}
						// Otherwise, look up the variable
						return isDefined(data[cleanArg]) ? String(data[cleanArg]) : ""
					})
					: []

				return (func as (...args: string[]) => string)(...args)
			} else {
				// Function not found - return the first argument (data) instead of the format
				if (argsString) {
					const firstArg = argsString.split(",")[0].trim()
					// If it's a quoted string, return the string without quotes
					if (firstArg.startsWith('"') && firstArg.endsWith('"')) {
						return firstArg.slice(1, -1)
					}
					// Otherwise, look up the variable and return its value
					return isDefined(data[firstArg]) ? String(data[firstArg]) : ""
				}
				return ""
			}
		}

		// Handle simple variable substitution
		return isDefined(data[trimmed]) ? String(data[trimmed]) : ""
	})
}
