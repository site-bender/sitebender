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
 *   port: {
 *     type: "number",
 *     required: true,
 *     min: 1,
 *     max: 65535,
 *     default: 3000
 *   },
 *   host: {
 *     type: "string",
 *     required: false,
 *     default: "localhost",
 *     pattern: /^[a-z0-9.-]+$/i
 *   },
 *   debug: {
 *     type: "boolean",
 *     required: false,
 *     default: false
 *   }
 * }
 *
 * const validateServerConfig = validateConfig(schema)
 *
 * validateServerConfig({ port: 8080, debug: true })
 * // { valid: true, data: { port: 8080, host: "localhost", debug: true } }
 *
 * validateServerConfig({ port: 70000 })
 * // { valid: false, errors: { port: "Value must be <= 65535" } }
 *
 * validateServerConfig({})
 * // { valid: false, errors: { port: "Field is required" } }
 *
 * // Nested object validation
 * const userSchema = {
 *   name: {
 *     type: "string",
 *     required: true,
 *     minLength: 2,
 *     maxLength: 50
 *   },
 *   email: {
 *     type: "string",
 *     required: true,
 *     validator: (val: string) => val.includes("@") ? null : "Invalid email"
 *   },
 *   profile: {
 *     type: "object",
 *     required: false,
 *     schema: {
 *       age: { type: "number", min: 0, max: 150 },
 *       bio: { type: "string", maxLength: 500 }
 *     }
 *   }
 * }
 *
 * const validateUser = validateConfig(userSchema)
 *
 * validateUser({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   profile: { age: 30, bio: "Developer" }
 * })
 * // { valid: true, data: { name: "John Doe", email: "john@example.com", profile: { age: 30, bio: "Developer" } } }
 *
 * // Array validation
 * const apiSchema = {
 *   endpoints: {
 *     type: "array",
 *     required: true,
 *     minLength: 1,
 *     items: {
 *       type: "string",
 *       pattern: /^\/[a-z0-9/-]*$/i
 *     }
 *   },
 *   methods: {
 *     type: "array",
 *     items: {
 *       type: "string",
 *       enum: ["GET", "POST", "PUT", "DELETE", "PATCH"]
 *     }
 *   }
 * }
 *
 * const validateApi = validateConfig(apiSchema)
 *
 * validateApi({
 *   endpoints: ["/users", "/posts", "/comments"],
 *   methods: ["GET", "POST"]
 * })
 * // { valid: true, data: { endpoints: [...], methods: [...] } }
 *
 * validateApi({
 *   endpoints: [],
 *   methods: ["INVALID"]
 * })
 * // { valid: false, errors: { endpoints: "Array must have at least 1 items", methods: { 0: "Value must be one of: GET, POST, PUT, DELETE, PATCH" } } }
 *
 * // Custom validators
 * const passwordSchema = {
 *   username: {
 *     type: "string",
 *     required: true,
 *     minLength: 3,
 *     transform: (val: string) => val.toLowerCase()
 *   },
 *   password: {
 *     type: "string",
 *     required: true,
 *     validator: (val: string) => {
 *       if (val.length < 8) return "Password must be at least 8 characters"
 *       if (!/[A-Z]/.test(val)) return "Password must contain uppercase letter"
 *       if (!/[0-9]/.test(val)) return "Password must contain number"
 *       return null
 *     }
 *   },
 *   confirmPassword: {
 *     type: "string",
 *     required: true,
 *     validator: (val: string, data: any) =>
 *       val === data.password ? null : "Passwords must match"
 *   }
 * }
 *
 * const validatePassword = validateConfig(passwordSchema)
 *
 * validatePassword({
 *   username: "JohnDoe",
 *   password: "SecurePass123",
 *   confirmPassword: "SecurePass123"
 * })
 * // { valid: true, data: { username: "johndoe", password: "SecurePass123", confirmPassword: "SecurePass123" } }
 *
 * // Enum validation
 * const settingsSchema = {
 *   theme: {
 *     type: "string",
 *     enum: ["light", "dark", "auto"],
 *     default: "auto"
 *   },
 *   language: {
 *     type: "string",
 *     enum: ["en", "es", "fr", "de"],
 *     required: true
 *   },
 *   fontSize: {
 *     type: "number",
 *     enum: [12, 14, 16, 18, 20],
 *     default: 14
 *   }
 * }
 *
 * const validateSettings = validateConfig(settingsSchema)
 *
 * validateSettings({ language: "en" })
 * // { valid: true, data: { theme: "auto", language: "en", fontSize: 14 } }
 *
 * validateSettings({ language: "zh", theme: "blue" })
 * // { valid: false, errors: { language: "Value must be one of: en, es, fr, de", theme: "Value must be one of: light, dark, auto" } }
 *
 * // Type coercion
 * const coercionSchema = {
 *   count: {
 *     type: "number",
 *     coerce: true
 *   },
 *   enabled: {
 *     type: "boolean",
 *     coerce: true
 *   },
 *   tags: {
 *     type: "array",
 *     coerce: true,
 *     items: { type: "string" }
 *   }
 * }
 *
 * const validateWithCoercion = validateConfig(coercionSchema)
 *
 * validateWithCoercion({
 *   count: "42",
 *   enabled: "true",
 *   tags: "tag1,tag2,tag3"
 * })
 * // { valid: true, data: { count: 42, enabled: true, tags: ["tag1", "tag2", "tag3"] } }
 *
 * // Database connection config
 * const dbSchema = {
 *   host: { type: "string", required: true },
 *   port: { type: "number", default: 5432 },
 *   database: { type: "string", required: true },
 *   user: { type: "string", required: true },
 *   password: { type: "string", required: true },
 *   ssl: {
 *     type: "object",
 *     required: false,
 *     schema: {
 *       enabled: { type: "boolean", default: true },
 *       rejectUnauthorized: { type: "boolean", default: true },
 *       ca: { type: "string", required: false }
 *     }
 *   },
 *   pool: {
 *     type: "object",
 *     default: {},
 *     schema: {
 *       min: { type: "number", default: 2, min: 0 },
 *       max: { type: "number", default: 10, min: 1 },
 *       idleTimeout: { type: "number", default: 10000, min: 0 }
 *     }
 *   }
 * }
 *
 * const validateDbConfig = validateConfig(dbSchema)
 *
 * validateDbConfig({
 *   host: "localhost",
 *   database: "myapp",
 *   user: "admin",
 *   password: "secret"
 * })
 * // {
 * //   valid: true,
 * //   data: {
 * //     host: "localhost",
 * //     port: 5432,
 * //     database: "myapp",
 * //     user: "admin",
 * //     password: "secret",
 * //     pool: { min: 2, max: 10, idleTimeout: 10000 }
 * //   }
 * // }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Comprehensive - Supports nested objects, arrays, and custom validators
 * @property Type-safe - Validates types and provides detailed error messages
 * @property Curried - Schema can be partially applied for reuse
 */
type FieldSchema = {
	type: "string" | "number" | "boolean" | "object" | "array"
	required?: boolean
	default?: any
	enum?: Array<any>
	pattern?: RegExp
	min?: number
	max?: number
	minLength?: number
	maxLength?: number
	validator?: (value: any, data?: any) => string | null
	transform?: (value: any) => any
	coerce?: boolean
	schema?: Record<string, FieldSchema>
	items?: FieldSchema
}

type ValidationSchema = Record<string, FieldSchema>

type ValidationResult<T> =
	| { valid: true; data: T }
	| { valid: false; errors: Record<string, any> }

const validateConfig = <T extends Record<string, any>>(
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

	const errors: Record<string, any> = {}
	const result: Record<string, any> = {}
	const configObj = config as Record<string, any>

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
					value = Number(value)
					break
				case "boolean":
					value = value === "true" || value === true || value === 1
					break
				case "string":
					value = String(value)
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
			if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
				errors[key] = `Minimum length is ${fieldSchema.minLength}`
				continue
			}
			if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
				errors[key] = `Maximum length is ${fieldSchema.maxLength}`
				continue
			}
			if (fieldSchema.pattern && !fieldSchema.pattern.test(value)) {
				errors[key] = "Value does not match required pattern"
				continue
			}
		}

		// Number validations
		if (fieldSchema.type === "number") {
			if (fieldSchema.min !== undefined && value < fieldSchema.min) {
				errors[key] = `Value must be >= ${fieldSchema.min}`
				continue
			}
			if (fieldSchema.max !== undefined && value > fieldSchema.max) {
				errors[key] = `Value must be <= ${fieldSchema.max}`
				continue
			}
		}

		// Array validations
		if (fieldSchema.type === "array") {
			if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
				errors[key] = `Array must have at least ${fieldSchema.minLength} items`
				continue
			}
			if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
				errors[key] = `Array must have at most ${fieldSchema.maxLength} items`
				continue
			}
			if (fieldSchema.items) {
				const itemErrors: Record<number, string> = {}
				for (let i = 0; i < value.length; i++) {
					const itemResult = validateField(value[i], fieldSchema.items, result)
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
			const validationError = fieldSchema.validator(value, result)
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

function validateType(value: any, type: string): boolean {
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
	value: any,
	schema: FieldSchema,
	parentData: any,
): string | null {
	if (!validateType(value, schema.type)) {
		return `Expected ${schema.type}`
	}

	if (schema.enum && !schema.enum.includes(value)) {
		return `Value must be one of: ${schema.enum.join(", ")}`
	}

	if (schema.type === "string") {
		if (schema.pattern && !schema.pattern.test(value)) {
			return "Invalid format"
		}
		if (schema.minLength && value.length < schema.minLength) {
			return `Minimum length is ${schema.minLength}`
		}
		if (schema.maxLength && value.length > schema.maxLength) {
			return `Maximum length is ${schema.maxLength}`
		}
	}

	if (schema.type === "number") {
		if (schema.min !== undefined && value < schema.min) {
			return `Must be >= ${schema.min}`
		}
		if (schema.max !== undefined && value > schema.max) {
			return `Must be <= ${schema.max}`
		}
	}

	if (schema.validator) {
		return schema.validator(value, parentData)
	}

	return null
}

export default validateConfig
