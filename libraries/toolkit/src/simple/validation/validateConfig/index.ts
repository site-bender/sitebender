/**
 * Validates configuration objects against a schema
 *
 * Performs comprehensive validation of configuration objects using a schema
 * that defines required fields, types, validators, and default values.
 * Returns an object with either validated data or detailed error information.
 * Supports nested objects, arrays, custom validators, and type coercion.
 *
 * @curried (schema) => (config) => result
 * @param schema - Validation schema defining rules for each field
 * @param config - Configuration object to validate
 * @returns Validation result with data or errors
 * @example
 * ```typescript
 * // Basic configuration validation
 * const schema = {
 *   port: { type: "number", required: true, min: 1, max: 65535 },
 *   host: { type: "string", default: "localhost" },
 *   debug: { type: "boolean", default: false }
 * }
 *
 * const validate = validateConfig(schema)
 * validate({ port: 8080 })
 * // { valid: true, data: { port: 8080, host: "localhost", debug: false } }
 *
 * validate({ port: 70000 })
 * // { valid: false, errors: { port: "Value must be <= 65535" } }
 *
 * // Custom validators
 * const userSchema = {
 *   email: {
 *     type: "string",
 *     validator: (val: string) => val.includes("@") ? null : "Invalid email"
 *   },
 *   age: { type: "number", min: 0, max: 150 }
 * }
 *
 * // Nested objects
 * const configSchema = {
 *   db: {
 *     type: "object",
 *     schema: {
 *       host: { type: "string", required: true },
 *       port: { type: "number", default: 5432 }
 *     }
 *   }
 * }
 * ```
 * @pure
 * @curried
 */
type FieldSchema = {
	type: "string" | "number" | "boolean" | "object" | "array"
	required?: boolean
	default?: unknown | (() => unknown)
	enum?: Array<unknown>
	pattern?: RegExp
	min?: number
	max?: number
	minLength?: number
	maxLength?: number
	validator?: (value: unknown, data?: Record<string, unknown>) => string | null
	transform?: (value: unknown) => unknown
	coerce?: boolean
	schema?: Record<string, FieldSchema>
	items?: FieldSchema
}

type ValidationSchema = Record<string, FieldSchema>

type ValidationResult<T> =
	| { valid: true; data: T }
	| { valid: false; errors: Record<string, unknown> }

const validateConfig = <T extends Record<string, unknown>>(
	schema: ValidationSchema,
) =>
(
	config: unknown,
): ValidationResult<T> => {
	// Ensure config is an object
	if (!config || typeof config !== "object" || Array.isArray(config)) {
		return {
			valid: false,
			errors: { _root: "Configuration must be an object" },
		}
	}

	const errors: Record<string, unknown> = {}
	const result: Record<string, unknown> = {}
	const configObj = config as Record<string, unknown>

	// Validate each field in schema
	for (const [key, fieldSchema] of Object.entries(schema)) {
		let value = configObj[key]

		// Apply default if value is undefined
		if (value === undefined && "default" in fieldSchema) {
			value = typeof fieldSchema.default === "function"
				? fieldSchema.default()
				: fieldSchema.default
		}

		// Check required fields
		if (fieldSchema.required && (value === undefined || value === null)) {
			errors[key] = "Field is required"
			continue
		}

		// Skip validation if not required and not present
		if (value === undefined || value === null) {
			if ("default" in fieldSchema) {
				result[key] = fieldSchema.default
			}
			continue
		}

		// Type coercion if enabled
		if (fieldSchema.coerce) {
			switch (fieldSchema.type) {
				case "number":
					value = Number(value as number | string | boolean)
					break
				case "boolean":
					value = (value as unknown) === "true" || value === true || value === 1
					break
				case "string":
					value = String(value as string | number | boolean)
					break
				case "array":
					if (typeof value === "string") {
						value = value.split(",").map((v) => v.trim())
					} else if (!Array.isArray(value)) {
						value = [value]
					}
					break
			}
		}

		// Type validation
		const typeValid = validateType(value, fieldSchema.type)
		if (!typeValid) {
			errors[key] = `Expected ${fieldSchema.type}, got ${typeof value}`
			continue
		}

		// Enum validation
		if (fieldSchema.enum && !fieldSchema.enum.includes(value)) {
			errors[key] = `Value must be one of: ${fieldSchema.enum.join(", ")}`
			continue
		}

		// String validations
		if (fieldSchema.type === "string") {
			const str = value as string
			if (fieldSchema.minLength && str.length < fieldSchema.minLength) {
				errors[key] = `Minimum length is ${fieldSchema.minLength}`
				continue
			}
			if (fieldSchema.maxLength && str.length > fieldSchema.maxLength) {
				errors[key] = `Maximum length is ${fieldSchema.maxLength}`
				continue
			}
			if (fieldSchema.pattern && !fieldSchema.pattern.test(str)) {
				errors[key] = "Value does not match required pattern"
				continue
			}
		}

		// Number validations
		if (fieldSchema.type === "number") {
			const num = value as number
			if (fieldSchema.min !== undefined && num < fieldSchema.min) {
				errors[key] = `Value must be >= ${fieldSchema.min}`
				continue
			}
			if (fieldSchema.max !== undefined && num > fieldSchema.max) {
				errors[key] = `Value must be <= ${fieldSchema.max}`
				continue
			}
		}

		// Array validations
		if (fieldSchema.type === "array") {
			const arr = value as unknown[]
			if (fieldSchema.minLength && arr.length < fieldSchema.minLength) {
				errors[key] = `Array must have at least ${fieldSchema.minLength} items`
				continue
			}
			if (fieldSchema.maxLength && arr.length > fieldSchema.maxLength) {
				errors[key] = `Array must have at most ${fieldSchema.maxLength} items`
				continue
			}
			if (fieldSchema.items) {
				const itemErrors: Record<number, string> = {}
				for (let i = 0; i < arr.length; i++) {
					const itemResult = validateField(arr[i], fieldSchema.items, result as Record<string, unknown>)
					if (itemResult !== null) {
						itemErrors[i] = itemResult
					}
				}
				if (Object.keys(itemErrors).length > 0) {
					errors[key] = itemErrors
					continue
				}
			}
		}

		// Nested object validation
		if (fieldSchema.type === "object" && fieldSchema.schema) {
			const nestedResult = validateConfig(fieldSchema.schema)(value)
			if (!nestedResult.valid) {
				errors[key] = nestedResult.errors
				continue
			}
			value = nestedResult.data
		}

		// Custom validator
		if (fieldSchema.validator) {
			const validationError = fieldSchema.validator(value, result as Record<string, unknown>)
			if (validationError) {
				errors[key] = validationError
				continue
			}
		}

		// Transform value
		if (fieldSchema.transform) {
			value = fieldSchema.transform(value)
		}

		result[key] = value
	}

	if (Object.keys(errors).length > 0) {
		return { valid: false, errors }
	}

	return { valid: true, data: result as T }
}

	function validateType(value: unknown, type: string): boolean {
	switch (type) {
		case "string":
				return typeof value === "string"
		case "number":
				return typeof value === "number" && !isNaN(value)
		case "boolean":
				return typeof value === "boolean"
		case "object":
				return value !== null && typeof value === "object" &&
				!Array.isArray(value)
		case "array":
				return Array.isArray(value)
		default:
			return false
	}
}

function validateField(
		value: unknown,
	schema: FieldSchema,
		parentData: Record<string, unknown>,
): string | null {
	if (!validateType(value, schema.type)) {
		return `Expected ${schema.type}`
	}

	if (schema.enum && !schema.enum.includes(value)) {
		return `Value must be one of: ${schema.enum.join(", ")}`
	}

	if (schema.type === "string") {
		const str = value as string
		if (schema.pattern && !schema.pattern.test(str)) {
			return "Invalid format"
		}
		if (schema.minLength && str.length < schema.minLength) {
			return `Minimum length is ${schema.minLength}`
		}
		if (schema.maxLength && str.length > schema.maxLength) {
			return `Maximum length is ${schema.maxLength}`
		}
	}

	if (schema.type === "number") {
		const num = value as number
		if (schema.min !== undefined && num < schema.min) {
			return `Must be >= ${schema.min}`
		}
		if (schema.max !== undefined && num > schema.max) {
			return `Must be <= ${schema.max}`
		}
	}

	if (schema.validator) {
		return schema.validator(value, parentData)
	}

	return null
}

export default validateConfig
