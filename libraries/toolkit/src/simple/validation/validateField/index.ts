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
 * // Email field validation
 * const validateEmail = validateField({
 *   required: true,
 *   type: "email",
 *   maxLength: 255
 * })
 *
 * validateEmail("")                        // "This field is required"
 * validateEmail("invalid")                 // "Please enter a valid email address"
 * validateEmail("user@example.com")        // null (valid)
 * validateEmail("a@b." + "c".repeat(250)) // "Maximum length is 255 characters"
 *
 * // Password validation
 * const validatePassword = validateField({
 *   required: true,
 *   minLength: 8,
 *   maxLength: 128,
 *   pattern: {
 *     regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
 *     message: "Password must contain lowercase, uppercase, and number"
 *   }
 * })
 *
 * validatePassword("")                     // "This field is required"
 * validatePassword("short")                // "Minimum length is 8 characters"
 * validatePassword("alllowercase")         // "Password must contain lowercase, uppercase, and number"
 * validatePassword("ValidPass123")         // null (valid)
 *
 * // Username validation
 * const validateUsername = validateField({
 *   required: true,
 *   minLength: 3,
 *   maxLength: 20,
 *   pattern: {
 *     regex: /^[a-zA-Z0-9_]+$/,
 *     message: "Username can only contain letters, numbers, and underscores"
 *   },
 *   custom: (value: string) => {
 *     if (value.toLowerCase() === "admin") {
 *       return "This username is reserved"
 *     }
 *     return null
 *   }
 * })
 *
 * validateUsername("ab")                   // "Minimum length is 3 characters"
 * validateUsername("user@123")             // "Username can only contain letters, numbers, and underscores"
 * validateUsername("admin")                // "This username is reserved"
 * validateUsername("john_doe")             // null (valid)
 *
 * // Age validation
 * const validateAge = validateField({
 *   required: true,
 *   type: "number",
 *   min: { value: 13, message: "Must be at least 13 years old" },
 *   max: { value: 120, message: "Please enter a valid age" }
 * })
 *
 * validateAge("")                          // "This field is required"
 * validateAge("abc")                       // "Please enter a valid number"
 * validateAge("10")                        // "Must be at least 13 years old"
 * validateAge("150")                       // "Please enter a valid age"
 * validateAge("25")                        // null (valid)
 *
 * // URL validation
 * const validateUrl = validateField({
 *   required: false,
 *   type: "url",
 *   allowedProtocols: ["http", "https"]
 * })
 *
 * validateUrl("")                          // null (optional field)
 * validateUrl("not-a-url")                 // "Please enter a valid URL"
 * validateUrl("ftp://example.com")         // "URL must use http or https protocol"
 * validateUrl("https://example.com")       // null (valid)
 *
 * // Phone number validation
 * const validatePhone = validateField({
 *   required: true,
 *   pattern: {
 *     regex: /^\+?[1-9]\d{1,14}$/,
 *     message: "Please enter a valid international phone number"
 *   },
 *   transform: (value: string) => value.replace(/\s/g, "")
 * })
 *
 * validatePhone("")                        // "This field is required"
 * validatePhone("123")                     // "Please enter a valid international phone number"
 * validatePhone("+1 555 123 4567")        // null (valid, spaces removed by transform)
 * validatePhone("+44 20 7123 4567")       // null (valid)
 *
 * // Date validation
 * const validateBirthDate = validateField({
 *   required: true,
 *   type: "date",
 *   min: {
 *     value: "1900-01-01",
 *     message: "Please enter a valid birth date"
 *   },
 *   max: {
 *     value: new Date().toISOString().split("T")[0],
 *     message: "Birth date cannot be in the future"
 *   }
 * })
 *
 * validateBirthDate("")                    // "This field is required"
 * validateBirthDate("invalid-date")        // "Please enter a valid date"
 * validateBirthDate("2050-01-01")         // "Birth date cannot be in the future"
 * validateBirthDate("1990-05-15")         // null (valid)
 *
 * // Credit card validation
 * const validateCreditCard = validateField({
 *   required: true,
 *   pattern: {
 *     regex: /^\d{13,19}$/,
 *     message: "Please enter a valid card number"
 *   },
 *   custom: (value: string) => {
 *     // Luhn algorithm check
 *     const digits = value.split("").map(Number)
 *     let sum = 0
 *     let isEven = false
 *
 *     for (let i = digits.length - 1; i >= 0; i--) {
 *       let digit = digits[i]
 *       if (isEven) {
 *         digit *= 2
 *         if (digit > 9) digit -= 9
 *       }
 *       sum += digit
 *       isEven = !isEven
 *     }
 *
 *     return sum % 10 === 0 ? null : "Invalid card number"
 *   },
 *   transform: (value: string) => value.replace(/\s/g, "")
 * })
 *
 * validateCreditCard("4111 1111 1111 1111") // null (valid Visa test card)
 * validateCreditCard("1234567812345678")    // "Invalid card number"
 *
 * // Conditional validation
 * const validateConfirmEmail = (email: string) => validateField({
 *   required: !!email,
 *   type: "email",
 *   custom: (value: string) =>
 *     value !== email ? "Email addresses must match" : null
 * })
 *
 * const confirmValidator = validateConfirmEmail("user@example.com")
 * confirmValidator("")                     // "This field is required"
 * confirmValidator("different@example.com") // "Email addresses must match"
 * confirmValidator("user@example.com")     // null (valid)
 *
 * // File upload validation
 * const validateFileUpload = validateField({
 *   required: true,
 *   type: "file",
 *   maxSize: 5 * 1024 * 1024, // 5MB
 *   allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
 *   custom: (file: File) => {
 *     if (!file.name.match(/\.(jpg|jpeg|png|pdf)$/i)) {
 *       return "Only JPG, PNG, and PDF files are allowed"
 *     }
 *     return null
 *   }
 * })
 *
 * // Select field validation
 * const validateCountry = validateField({
 *   required: true,
 *   enum: ["US", "CA", "UK", "AU", "NZ"],
 *   messages: {
 *     required: "Please select a country",
 *     enum: "Please select a valid country"
 *   }
 * })
 *
 * validateCountry("")                     // "Please select a country"
 * validateCountry("FR")                   // "Please select a valid country"
 * validateCountry("US")                   // null (valid)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Flexible - Supports many validation rule types
 * @property User-friendly - Returns readable error messages
 * @property Curried - Rules can be partially applied for reuse
 */
type ValidationRules = {
	required?: boolean
	type?: "string" | "number" | "email" | "url" | "date" | "file"
	minLength?: number
	maxLength?: number
	min?: { value: number | string; message?: string } | number
	max?: { value: number | string; message?: string } | number
	pattern?: { regex: RegExp; message?: string } | RegExp
	enum?: Array<any>
	custom?: (value: any) => string | null
	transform?: (value: any) => any
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
	(rules: ValidationRules) => (value: any): string | null => {
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
				(typeof transformedValue === "string" && transformedValue.trim() === "")
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
						return rules.messages?.type || "Please enter a valid number"
					}
					transformedValue = Number(transformedValue)
					break

				case "email":
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
					if (!emailRegex.test(String(transformedValue))) {
						return rules.messages?.type || "Please enter a valid email address"
					}
					break

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
						return rules.messages?.type || "Please enter a valid URL"
					}
					break

				case "date":
					const date = new Date(String(transformedValue))
					if (isNaN(date.getTime())) {
						return rules.messages?.type || "Please enter a valid date"
					}
					transformedValue = date.toISOString().split("T")[0]
					break

				case "file":
					if (!(transformedValue instanceof File)) {
						return rules.messages?.type || "Please select a valid file"
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
			const dateValue = new Date(transformedValue)

			if (rules.min !== undefined) {
				const minConfig = typeof rules.min === "object"
					? rules.min
					: { value: rules.min }
				const minDate = new Date(String(minConfig.value))
				if (dateValue < minDate) {
					return (
						minConfig.message ||
						rules.messages?.min ||
						`Date must be after ${minDate.toISOString().split("T")[0]}`
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
						`Date must be before ${maxDate.toISOString().split("T")[0]}`
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
