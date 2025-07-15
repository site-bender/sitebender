import type { Result } from "../../../../../types/Result/index.ts"

import { failure, success } from "../../../../../types/Result/index.ts"

type ParsedExpression = {
	functionName: string
	propertyName: string
	params?: Record<string, unknown>
}

// Parse template expressions like {{cite(title)}} or {{familyFirst(author, {class: "author"})}}
export default function parseTemplateExpression(
	expression: string,
): Result<ParsedExpression, string> {
	// Remove {{ and }}
	const cleaned = expression.replace(/^\{\{|\}\}$/g, "").trim()

	// Match function(property) or function(property, {params})
	const match = cleaned.match(/^(\w+)\(([^,)]+)(?:,\s*(\{.+\}))?\)$/)

	if (!match) {
		return failure(`Invalid template expression: ${expression}`)
	}

	const [, functionName, propertyName, paramsString] = match

	if (!paramsString) {
		return success({ functionName, propertyName })
	}

	try {
		// Simple JSON parsing for parameters
		const params = JSON.parse(paramsString)
		return success({ functionName, propertyName, params })
	} catch {
		return failure(`Invalid parameters in template expression: ${expression}`)
	}
}
