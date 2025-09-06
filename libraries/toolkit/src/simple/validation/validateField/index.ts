/**
 * Validates a single form field with rules
 *
 * Applies a set of validation rules to a single field value, returning
 * the first error message encountered or null if valid. Supports common
 * validation rules like required, length, pattern, and custom validators.
 * Designed for form field validation with user-friendly error messages.
 *
 * @curried (rules) => (value) => error | null
 * @param rules - Validation rules to apply to the field
 * @param value - The field value to validate
 * @returns Error message or null if valid
 * @example
 * ```typescript
 * // Email validation
 * const validateEmail = validateField({
 *   required: true,
 *   type: "email",
 *   maxLength: 255
 * })
 *
 * validateEmail("")                 // "This field is required"
 * validateEmail("invalid")          // "Please enter a valid email address"
 * validateEmail("user@example.com") // null (valid)
 *
 * // Password validation
 * const validatePassword = validateField({
 *   required: true,
 *   minLength: 8,
 *   pattern: {
 *     regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
 *     message: "Must contain lowercase, uppercase, and number"
 *   }
 * })
 *
 * validatePassword("short")     // "Minimum length is 8 characters"
 * validatePassword("Pass123")   // null (valid)
 *
 * // Custom validation
 * const validateAge = validateField({
 *   type: "number",
 *   min: { value: 13, message: "Must be at least 13" },
 *   max: { value: 120, message: "Invalid age" }
 * })
 *
 * validateAge("10")  // "Must be at least 13"
 * validateAge("25")  // null (valid)
 * ```
 * @pure
 * @curried
 */
type ValidationRules = {
	required?: boolean
	type?: "string" | "number" | "email" | "url" | "date" | "file"
	minLength?: number
	maxLength?: number
	min?: { value: number | string; message?: string } | number
	max?: { value: number | string; message?: string } | number
	pattern?: { regex: RegExp; message?: string } | RegExp
	enum?: Array<unknown>
	custom?: (value: unknown) => string | null
	transform?: (value: unknown) => unknown
	maxSize?: number
	allowedTypes?: Array<string>
	allowedProtocols?: Array<string>
	messages?: {
		required?: string
		type?: string
		minLength?: string
		maxLength?: string
		min?: string
		max?: string
		pattern?: string
		enum?: string
		maxSize?: string
		allowedTypes?: string
	}
}

const validateField =
	(rules: ValidationRules) => (value: unknown): string | null => {
		// Apply transform if provided
		let transformedValue = value
		if (rules.transform) {
			transformedValue = rules.transform(value)
		}

		// Check required
		if (rules.required) {
			if (
				transformedValue === undefined ||
				transformedValue === null ||
				transformedValue === "" ||
				(typeof transformedValue === "string" &&
					transformedValue.trim() === "")
			) {
				return rules.messages?.required || "This field is required"
			}
		}

		// If not required and empty, skip other validations
		if (
			!rules.required &&
			(transformedValue === undefined ||
				transformedValue === null ||
				transformedValue === "")
		) {
			return null
		}

		// Type validation
		if (rules.type) {
			switch (rules.type) {
				case "number":
					if (isNaN(Number(transformedValue))) {
						return rules.messages?.type ||
							"Please enter a valid number"
					}
					transformedValue = Number(transformedValue)
					break

				case "email": {
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
					if (!emailRegex.test(String(transformedValue))) {
						return rules.messages?.type ||
							"Please enter a valid email address"
					}
					break
				}

				case "url":
					try {
						const url = new URL(String(transformedValue))
						if (rules.allowedProtocols) {
							const protocol = url.protocol.slice(0, -1) // Remove trailing ':'
							if (!rules.allowedProtocols.includes(protocol)) {
								return `URL must use ${
									rules.allowedProtocols.join(" or ")
								} protocol`
							}
						}
					} catch {
						return rules.messages?.type ||
							"Please enter a valid URL"
					}
					break

				case "date": {
					const date = new Date(String(transformedValue))
					if (isNaN(date.getTime())) {
						return rules.messages?.type ||
							"Please enter a valid date"
					}
					transformedValue = date.toISOString().split("T")[0]
					break
				}

				case "file":
					if (!(transformedValue instanceof File)) {
						return rules.messages?.type ||
							"Please select a valid file"
					}
					break
			}
		}

		// String length validations
		if (typeof transformedValue === "string") {
			if (
				rules.minLength !== undefined &&
				transformedValue.length < rules.minLength
			) {
				return (
					rules.messages?.minLength ||
					`Minimum length is ${rules.minLength} characters`
				)
			}

			if (
				rules.maxLength !== undefined &&
				transformedValue.length > rules.maxLength
			) {
				return (
					rules.messages?.maxLength ||
					`Maximum length is ${rules.maxLength} characters`
				)
			}
		}

		// Numeric range validations
		if (rules.type === "number" || typeof transformedValue === "number") {
			const numValue = Number(transformedValue)

			if (rules.min !== undefined) {
				const minConfig = typeof rules.min === "object"
					? rules.min
					: { value: rules.min }
				if (numValue < Number(minConfig.value)) {
					return (
						minConfig.message ||
						rules.messages?.min ||
						`Minimum value is ${minConfig.value}`
					)
				}
			}

			if (rules.max !== undefined) {
				const maxConfig = typeof rules.max === "object"
					? rules.max
					: { value: rules.max }
				if (numValue > Number(maxConfig.value)) {
					return (
						maxConfig.message ||
						rules.messages?.max ||
						`Maximum value is ${maxConfig.value}`
					)
				}
			}
		}

		// Date range validations
		if (rules.type === "date") {
			const dateValue = new Date(String(transformedValue))

			if (rules.min !== undefined) {
				const minConfig = typeof rules.min === "object"
					? rules.min
					: { value: rules.min }
				const minDate = new Date(String(minConfig.value))
				if (dateValue < minDate) {
					return (
						minConfig.message ||
						rules.messages?.min ||
						`Date must be after ${
							minDate.toISOString().split("T")[0]
						}`
					)
				}
			}

			if (rules.max !== undefined) {
				const maxConfig = typeof rules.max === "object"
					? rules.max
					: { value: rules.max }
				const maxDate = new Date(String(maxConfig.value))
				if (dateValue > maxDate) {
					return (
						maxConfig.message ||
						rules.messages?.max ||
						`Date must be before ${
							maxDate.toISOString().split("T")[0]
						}`
					)
				}
			}
		}

		// Pattern validation
		if (rules.pattern) {
			const patternConfig = rules.pattern instanceof RegExp
				? { regex: rules.pattern }
				: rules.pattern

			if (!patternConfig.regex.test(String(transformedValue))) {
				return (
					patternConfig.message ||
					rules.messages?.pattern ||
					"Invalid format"
				)
			}
		}

		// Enum validation
		if (rules.enum && !rules.enum.includes(transformedValue)) {
			return (
				rules.messages?.enum ||
				`Please select one of: ${rules.enum.join(", ")}`
			)
		}

		// File validations
		if (rules.type === "file" && transformedValue instanceof File) {
			if (rules.maxSize && transformedValue.size > rules.maxSize) {
				const sizeMB = (rules.maxSize / (1024 * 1024)).toFixed(1)
				return (
					rules.messages?.maxSize ||
					`File size must be less than ${sizeMB}MB`
				)
			}

			if (
				rules.allowedTypes &&
				!rules.allowedTypes.includes(transformedValue.type)
			) {
				return (
					rules.messages?.allowedTypes ||
					`File type must be: ${rules.allowedTypes.join(", ")}`
				)
			}
		}

		// Custom validation
		if (rules.custom) {
			const customError = rules.custom(transformedValue)
			if (customError) {
				return customError
			}
		}

		return null
	}

export default validateField
