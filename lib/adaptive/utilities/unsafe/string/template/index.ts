import type { Value } from "../../../../types/index.ts"

/**
 * Creates a template function for string interpolation
 * 
 * Returns a function that replaces placeholders in a template string with
 * values from a data object. Supports dot notation for nested properties,
 * default values, and various placeholder formats.
 * 
 * @curried (templateStr) => (data) => result
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
 * template("Score: {{score:0}}")({ score: null })
 * // "Score: 0"
 * 
 * // Alternative placeholder syntax
 * template("Hello, ${name}!", { syntax: "dollar" })({ name: "Dave" })
 * // "Hello, Dave!"
 * 
 * template("Hello, :name!", { syntax: "colon" })({ name: "Eve" })
 * // "Hello, Eve!"
 * 
 * // Array access
 * template("First item: {{items.0}}")({
 *   items: ["apple", "banana", "cherry"]
 * })
 * // "First item: apple"
 * 
 * // Complex nested paths
 * template("{{company.employees.0.name}} from {{company.location.city}}")({
 *   company: {
 *     employees: [{ name: "Frank" }],
 *     location: { city: "New York" }
 *   }
 * })
 * // "Frank from New York"
 * 
 * // Partial application for reusable templates
 * const greetingTemplate = template("Hello, {{name}}! Welcome to {{place}}.")
 * greetingTemplate({ name: "Alice", place: "Wonderland" })
 * // "Hello, Alice! Welcome to Wonderland."
 * greetingTemplate({ name: "Bob", place: "the party" })
 * // "Hello, Bob! Welcome to the party."
 * 
 * // Email template example
 * const emailTemplate = template(`
 *   Dear {{recipient.name}},
 *   
 *   Your order #{{order.id}} has been {{order.status}}.
 *   Total: ${{order.total:0.00}}
 *   
 *   Best regards,
 *   {{sender.name:The Team}}
 * `)
 * 
 * emailTemplate({
 *   recipient: { name: "John" },
 *   order: { id: "12345", status: "shipped", total: 99.99 },
 *   sender: { name: "Customer Service" }
 * })
 * // "Dear John,\n\nYour order #12345 has been shipped.\nTotal: $99.99\n\nBest regards,\nCustomer Service"
 * 
 * // Missing values (no default)
 * template("Hello, {{name}}!")({})
 * // "Hello, {{name}}!"  (placeholder remains)
 * 
 * // Escaping placeholders
 * template("Use \\{{brackets}} for placeholders")({})
 * // "Use {{brackets}} for placeholders"
 * 
 * // Handle null/undefined data
 * template("Hello, {{name}}")(null)       // "Hello, {{name}}"
 * template("Hello, {{name}}")(undefined)  // "Hello, {{name}}"
 * ```
 * @property Flexible - supports various placeholder syntaxes
 * @property Safe - doesn't throw on missing values
 * @property Nested - supports dot notation for deep properties
 */
const template = (
	templateStr: string,
	options?: { syntax?: "mustache" | "dollar" | "colon" }
) => (data: Record<string, Value> | null | undefined): string => {
	if (!templateStr || typeof templateStr !== "string") {
		return ""
	}
	
	if (!data || typeof data !== "object") {
		return templateStr
	}
	
	const syntax = options?.syntax || "mustache"
	
	// Define regex patterns for different syntaxes
	const patterns = {
		mustache: /\{\{([^}]+)\}\}/g,      // {{name}} or {{name:default}}
		dollar: /\$\{([^}]+)\}/g,          // ${name} or ${name:default}
		colon: /:([a-zA-Z_][a-zA-Z0-9_.]*)/g  // :name (simpler, no defaults)
	}
	
	const pattern = patterns[syntax]
	
	// Helper to get nested property value
	const getNestedValue = (obj: Value | Record<string, Value>, path: string): Value | undefined => {
		const keys = path.split(".")
		let current: Value | Record<string, Value> | undefined = obj
		
		for (const key of keys) {
			if (current == null || typeof current !== "object") {
				return undefined
			}
			current = (current as Record<string, Value>)[key]
		}
		
		return current
	}
	
	// Replace placeholders
	return templateStr.replace(pattern, (match, placeholder) => {
		// Handle escaped placeholders
		if (templateStr[templateStr.indexOf(match) - 1] === "\\") {
			return match.substring(2, match.length - 2) // Remove escape and return brackets
		}
		
		// Parse placeholder for name and default value
		let key: string
		let defaultValue: string | undefined
		
		if (syntax === "colon") {
			key = placeholder
		} else {
			const parts = placeholder.trim().split(":")
			key = parts[0].trim()
			defaultValue = parts[1]?.trim()
		}
		
		// Get the value from data
		const value = getNestedValue(data, key)
		
		// Return value, default, or original placeholder
		if (value !== undefined && value !== null) {
			return String(value)
		} else if (defaultValue !== undefined) {
			return defaultValue
		} else {
			return match // Keep placeholder if no value and no default
		}
	})
}

export default template