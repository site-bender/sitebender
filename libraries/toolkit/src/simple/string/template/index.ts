import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"
import isUndefined from "../../validation/isUndefined/index.ts"

/**
 * Creates a template function for string interpolation
 *
 * Returns a function that replaces placeholders in a template string with
 * values from a data object. Supports dot notation for nested properties,
 * default values, and various placeholder formats.
 *
 * @param templateStr - Template string with placeholders
 * @param data - Object containing values to interpolate
 * @returns Interpolated string with placeholders replaced
 * @example
 * ```typescript
 * // Basic interpolation
 * template("Hello, {{name}}!")({ name: "Alice" })
 * // "Hello, Alice!"
 *
 * // Multiple placeholders
 * template("{{greeting}}, {{name}}!")({
 *   greeting: "Hi",
 *   name: "Bob"
 * })
 * // "Hi, Bob!"
 *
 * // Nested properties with dot notation
 * template("User: {{user.name}} ({{user.email}})")({
 *   user: { name: "Charlie", email: "charlie@example.com" }
 * })
 * // "User: Charlie (charlie@example.com)"
 *
 * // Default values
 * template("Hello, {{name:Guest}}!")({})
 * // "Hello, Guest!"
 *
 * // Alternative syntax
 * template("Hello, ${name}!", { syntax: "dollar" })({ name: "Dave" })
 * // "Hello, Dave!"
 *
 * // Array access
 * template("First item: {{items.0}}")({
 *   items: ["apple", "banana", "cherry"]
 * })
 * // "First item: apple"
 *
 * // Partial application
 * const greetingTemplate = template("Hello, {{name}}!")
 * greetingTemplate({ name: "Alice" })
 * // "Hello, Alice!"
 *
 * // Handle null/undefined data
 * template("Hello, {{name}}")(null)       // "Hello, {{name}}"
 * template("Hello, {{name}}")(undefined)  // "Hello, {{name}}"
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const template = (
	templateStr: string,
	options?: { syntax?: "mustache" | "dollar" | "colon" },
) =>
(data: Record<string, Value> | null | undefined): string => {
	if (!templateStr || typeof templateStr !== "string") {
		return ""
	}

	if (!data || typeof data !== "object") {
		return templateStr
	}

	const syntax = options?.syntax || "mustache"

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
		const keys = path.split(".")

		const traverse = (
			current: Value | Record<string, Value> | undefined,
			remainingKeys: Array<string>,
		): Value | undefined => {
			if (remainingKeys.length === 0 || isNullish(current)) {
				return current
			}

			if (typeof current !== "object") {
				return undefined
			}

			const [key, ...rest] = remainingKeys
			return traverse((current as Record<string, Value>)[key], rest)
		}

		return traverse(obj, keys)
	}

	// Replace placeholders
	return templateStr.replace(pattern, (match, placeholder) => {
		// Handle escaped placeholders
		if (templateStr[templateStr.indexOf(match) - 1] === "\\") {
			return match.substring(2, match.length - 2) // Remove escape and return brackets
		}

		// Parse placeholder for name and default value
		const { key, defaultValue } = syntax === "colon"
			? { key: placeholder, defaultValue: undefined }
			: (() => {
				const parts = placeholder.trim().split(":")
				return {
					key: parts[0].trim(),
					defaultValue: parts[1]?.trim(),
				}
			})()

		// Get the value from data
		const value = getNestedValue(data, key)

		// Return value, default, or original placeholder
		if (!isNullish(value)) {
			return String(value)
		} else if (!isUndefined(defaultValue)) {
			return defaultValue
		} else {
			return match // Keep placeholder if no value and no default
		}
	})
}

export default template
