import type { Either } from "../../../types/either/index.ts"
import type { Value } from "../../../../types/index.ts"
import { left, right } from "../../../types/either/index.ts"
import templateUnsafe from "../../../unsafe/string/template/index.ts"

export interface TemplateError extends Error {
	name: "TemplateError"
	template: string
	data: Record<string, Value> | null | undefined
	options?: { syntax?: "mustache" | "dollar" | "colon" }
}

/**
 * Safely creates a template function for string interpolation
 * 
 * Safe version that returns Either<TemplateError, string>.
 * Returns a function that replaces placeholders in a template string with
 * values from a data object. Supports dot notation for nested properties,
 * default values, and various placeholder formats.
 * 
 * @curried (templateStr, options?) => (data) => Either<TemplateError, result>
 * @param templateStr - Template string with placeholders
 * @param options - Optional configuration for placeholder syntax
 * @param data - Object containing values to interpolate
 * @returns Either with interpolated string or error
 * @example
 * ```typescript
 * // Success case
 * const result = template("Hello, {{name}}!")({ name: "Alice" })
 * // Right("Hello, Alice!")
 * 
 * // Nested properties
 * const result = template("User: {{user.name}} ({{user.email}})")({
 *   user: { name: "Charlie", email: "charlie@example.com" }
 * })
 * // Right("User: Charlie (charlie@example.com)")
 * 
 * // Default values
 * const result = template("Hello, {{name:Guest}}!")({})
 * // Right("Hello, Guest!")
 * 
 * // Handles errors in data access
 * const result = template("Value: {{complex.path}}")({
 *   get complex() { throw new Error("Access denied") }
 * })
 * // Left(TemplateError: "Access denied")
 * 
 * // Handles null/undefined gracefully
 * const result = template("Hello, {{name}}")(null)
 * // Right("Hello, {{name}}")  - placeholder remains
 * 
 * // Use with pipeline
 * import { pipeEither } from "../../../types/either/pipeline/index.ts"
 * 
 * const generateEmail = pipeEither(
 *   getUserDataSafe,
 *   template("Dear {{name}}, your order {{orderId}} is ready."),
 *   sendEmailSafe
 * )
 * ```
 */
const template = (
	templateStr: string,
	options?: { syntax?: "mustache" | "dollar" | "colon" }
) => (data: Record<string, Value> | null | undefined): Either<TemplateError, string> => {
	try {
		// Validate template string
		if (typeof templateStr !== "string") {
			const error: TemplateError = {
				name: "TemplateError",
				message: `Template must be a string, got ${typeof templateStr}`,
				template: templateStr,
				data,
				options
			} as TemplateError
			return left(error)
		}
		
		// Validate options if provided
		if (options && options.syntax) {
			const validSyntax = ["mustache", "dollar", "colon"]
			if (!validSyntax.includes(options.syntax)) {
				const error: TemplateError = {
					name: "TemplateError",
					message: `Invalid syntax option: ${options.syntax}. Must be one of: ${validSyntax.join(", ")}`,
					template: templateStr,
					data,
					options
				} as TemplateError
				return left(error)
			}
		}
		
		// Use the unsafe version which handles null/undefined gracefully
		const result = templateUnsafe(templateStr, options)(data)
		return right(result)
	} catch (err) {
		const error: TemplateError = {
			name: "TemplateError",
			message: err instanceof Error ? err.message : String(err),
			template: templateStr,
			data,
			options
		} as TemplateError
		return left(error)
	}
}

export default template