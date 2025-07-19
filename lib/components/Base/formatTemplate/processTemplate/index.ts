import type { FormatContext } from "../../../../types/formatters/index.ts"

import createElement from "../../../../../utilities/createElement/index.ts"
import convertToString from "./convertToString/index.ts"
import getNestedProperty from "./getNestedProperty/index.ts"

const TOKEN_REGEX = /\{\{[^}]+\}\}/g

export default function processTemplate(
	template: string,
	context: FormatContext,
): JSX.Element | string {
	const tokens = template.match(TOKEN_REGEX) || []

	if (tokens.length === 0) {
		return template
	}

	const parts: (string | JSX.Element)[] = []
	let lastIndex = 0

	for (const token of tokens) {
		const tokenIndex = template.indexOf(token, lastIndex)

		if (tokenIndex > lastIndex) {
			parts.push(template.slice(lastIndex, tokenIndex))
		}

		const cleanToken = token.slice(2, -2).trim()
		const formatterMatch = cleanToken.match(/^(\w+)\((.+)\)$/)

		if (formatterMatch) {
			const [, formatterName, propertyPath] = formatterMatch
			const formatter = context.formatters?.[formatterName]

			if (formatter) {
				const value = getNestedProperty(context.props, propertyPath)
				const formattedValue = formatter(value)
				parts.push(formattedValue || "UNKNOWN")
			} else {
				parts.push("UNKNOWN")
			}
		} else {
			const value = getNestedProperty(context.props, cleanToken)
			const stringValue = convertToString(value)
			parts.push(stringValue || "UNKNOWN")
		}

		lastIndex = tokenIndex + token.length
	}

	if (lastIndex < template.length) {
		parts.push(template.slice(lastIndex))
	}

	if (parts.length === 1 && typeof parts[0] === "string") {
		return parts[0]
	}

	return createElement("span", {}, ...parts)
}
