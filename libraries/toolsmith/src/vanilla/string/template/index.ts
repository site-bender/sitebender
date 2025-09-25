import type { Value } from "../../../types/index.ts"

import head from "../../array/head/index.ts"
import length from "../../array/length/index.ts"
import tail from "../../array/tail/index.ts"
import pipe from "../../combinator/pipe/index.ts"
import defaultTo from "../../logic/defaultTo/index.ts"
import not from "../../logic/not/index.ts"
import or from "../../logic/or/index.ts"
import subtract from "../../math/subtract/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import isObject from "../../validation/isObject/index.ts"
import isString from "../../validation/isString/index.ts"
import isUndefined from "../../validation/isUndefined/index.ts"
import isZero from "../../validation/isZero/index.ts"
import split from "../split/index.ts"
import substring from "../substring/index.ts"
import trim from "../trim/index.ts"

//++ Creates a template function for string interpolation
export default function template(
	options?: { syntax?: "mustache" | "dollar" | "colon" },
) {
	return function templateWithOptions(
		templateString: string,
	) {
		return function templateWithOptionsAndString(
			data: Record<string, Value> | null | undefined,
		): string {
			if (isNullish(data) || not(isObject(data))) {
				return templateString
			}

			if (not(isString(templateString))) {
				return ""
			}

			const syntax = defaultTo("mustache")(options?.syntax)

			// Define regex patterns for different syntaxes
			const patterns = {
				mustache: /\{\{([^}]+)\}\}/g, // {{name}} or {{name:default}}
				dollar: /\$\{([^}]+)\}/g, // ${name} or ${name:default}
				colon: /:([a-zA-Z_][a-zA-Z0-9_.]*)/g, // :name (simpler, no defaults)
			}

			const pattern = patterns[syntax]

			// Helper to get nested property value using recursion
			const getNestedValue = (
				obj: Value | Record<string, Value>,
				path: string,
			): Value | undefined => {
				const keys = split(".")(path)

				const traverse = (
					current: Value | Record<string, Value> | undefined,
					remainingKeys: Array<string>,
				): Value | undefined => {
					if (or(isZero(length(remainingKeys)))(isNullish(current))) {
						return current
					}

					if (not(isObject(current))) {
						return undefined
					}

					const [key, ...rest] = remainingKeys
					return traverse((current as Record<string, Value>)[key], rest)
				}

				return traverse(obj, keys)
			}

			// Replace placeholders
			return templateString.replace(pattern, (match, placeholder) => {
				// Handle escaped placeholders
				if (templateString[templateString.indexOf(match) - 1] === "\\") {
					return substring(2)(subtract(length(match))(2))(match)
				}

				// Parse placeholder for name and default value
				const { key, defaultValue } = isEqual(syntax)("colon")
					? { key: placeholder, defaultValue: undefined }
					: (() => {
						const parts = pipe(
							trim,
							split(":"),
						)(placeholder)
						return {
							key: trim(head(parts)),
							defaultValue: pipe(
								tail,
								head,
								trim,
							)(parts),
						}
					})()

				// Get the value from data
				const value = getNestedValue(data, key)

				// Return value, default, or original placeholder
				if (not(isNullish(value))) {
					return String(value)
				}

				if (not(isUndefined(defaultValue))) {
					return defaultValue
				}

				return match // Keep placeholder if no value and no default
			})
		}
	}
}
