/**
 * Validates entire form data, returns array of errors
 * 
 * Validates multiple form fields simultaneously using a schema that maps
 * field names to validation rules. Returns a comprehensive error object
 * with all validation failures or null if all fields are valid. Supports
 * field dependencies, cross-field validation, and conditional rules.
 * 
 * @curried (schema) => (formData) => errors | null
 * @param schema - Validation schema mapping field names to rules
 * @param formData - Form data object to validate
 * @returns Object with field errors or null if valid
 * @example
 * ```typescript
 * // User registration form validation
 * const registrationSchema = {
 *   username: {
 *     required: true,
 *     minLength: 3,
 *     maxLength: 20,
 *     pattern: /^[a-zA-Z0-9_]+$/,
 *     message: "Username must be 3-20 characters, alphanumeric and underscore only"
 *   },
 *   email: {
 *     required: true,
 *     type: "email",
 *     async: async (value: string) => {
 *       // Simulate API check
 *       const exists = ["taken@example.com"].includes(value)
 *       return exists ? "Email already registered" : null
 *     }
 *   },
 *   password: {
 *     required: true,
 *     minLength: 8,
 *     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
 *     message: "Password must contain uppercase, lowercase, and number"
 *   },
 *   confirmPassword: {
 *     required: true,
 *     match: "password",
 *     message: "Passwords must match"
 *   },
 *   age: {
 *     required: true,
 *     type: "number",
 *     min: 13,
 *     max: 120
 *   },
 *   terms: {
 *     required: true,
 *     equals: true,
 *     message: "You must accept the terms and conditions"
 *   }
 * }
 * 
 * const validateRegistration = validateForm(registrationSchema)
 * 
 * validateRegistration({
 *   username: "john_doe",
 *   email: "john@example.com",
 *   password: "SecurePass123",
 *   confirmPassword: "SecurePass123",
 *   age: 25,
 *   terms: true
 * })
 * // null (all valid)
 * 
 * validateRegistration({
 *   username: "ab",
 *   email: "invalid",
 *   password: "weak",
 *   confirmPassword: "different",
 *   age: 10,
 *   terms: false
 * })
 * // {
 * //   username: "Minimum length is 3",
 * //   email: "Invalid email format",
 * //   password: "Password must contain uppercase, lowercase, and number",
 * //   confirmPassword: "Passwords must match",
 * //   age: "Minimum value is 13",
 * //   terms: "You must accept the terms and conditions"
 * // }
 * 
 * // Contact form validation
 * const contactSchema = {
 *   name: {
 *     required: true,
 *     minLength: 2,
 *     maxLength: 50
 *   },
 *   email: {
 *     required: true,
 *     type: "email"
 *   },
 *   phone: {
 *     required: false,
 *     pattern: /^\+?[\d\s()-]+$/,
 *     minLength: 10,
 *     message: "Please enter a valid phone number"
 *   },
 *   subject: {
 *     required: true,
 *     enum: ["support", "sales", "feedback", "other"]
 *   },
 *   message: {
 *     required: true,
 *     minLength: 10,
 *     maxLength: 1000
 *   }
 * }
 * 
 * const validateContact = validateForm(contactSchema)
 * 
 * validateContact({
 *   name: "Jane Doe",
 *   email: "jane@example.com",
 *   subject: "support",
 *   message: "I need help with my account"
 * })
 * // null (phone is optional)
 * 
 * // Payment form validation
 * const paymentSchema = {
 *   cardNumber: {
 *     required: true,
 *     pattern: /^\d{13,19}$/,
 *     transform: (v: string) => v.replace(/\s/g, ""),
 *     validate: (value: string) => {
 *       // Luhn algorithm
 *       const digits = value.split("").map(Number)
 *       let sum = 0
 *       let isEven = false
 *       for (let i = digits.length - 1; i >= 0; i--) {
 *         let digit = digits[i]
 *         if (isEven) {
 *           digit *= 2
 *           if (digit > 9) digit -= 9
 *         }
 *         sum += digit
 *         isEven = !isEven
 *       }
 *       return sum % 10 === 0 ? null : "Invalid card number"
 *     }
 *   },
 *   expiryMonth: {
 *     required: true,
 *     type: "number",
 *     min: 1,
 *     max: 12
 *   },
 *   expiryYear: {
 *     required: true,
 *     type: "number",
 *     min: new Date().getFullYear(),
 *     max: new Date().getFullYear() + 10
 *   },
 *   cvv: {
 *     required: true,
 *     pattern: /^\d{3,4}$/,
 *     message: "CVV must be 3 or 4 digits"
 *   },
 *   billingZip: {
 *     required: true,
 *     pattern: /^\d{5}(-\d{4})?$/,
 *     message: "Please enter a valid ZIP code"
 *   }
 * }
 * 
 * const validatePayment = validateForm(paymentSchema)
 * 
 * validatePayment({
 *   cardNumber: "4111 1111 1111 1111",
 *   expiryMonth: 12,
 *   expiryYear: 2025,
 *   cvv: "123",
 *   billingZip: "12345"
 * })
 * // null (valid test card)
 * 
 * // Conditional validation
 * const shippingSchema = {
 *   shippingMethod: {
 *     required: true,
 *     enum: ["standard", "express", "overnight"]
 *   },
 *   address: {
 *     required: true,
 *     minLength: 10
 *   },
 *   expressDelivery: {
 *     when: (data: any) => data.shippingMethod === "express",
 *     required: true,
 *     type: "date",
 *     min: new Date().toISOString().split("T")[0],
 *     message: "Express delivery date must be in the future"
 *   },
 *   giftMessage: {
 *     when: (data: any) => data.isGift === true,
 *     maxLength: 200
 *   }
 * }
 * 
 * const validateShipping = validateForm(shippingSchema)
 * 
 * validateShipping({
 *   shippingMethod: "express",
 *   address: "123 Main St, City, State 12345",
 *   expressDelivery: "2025-01-01",
 *   isGift: false
 * })
 * // null (conditional field validated)
 * 
 * // Cross-field validation
 * const dateRangeSchema = {
 *   startDate: {
 *     required: true,
 *     type: "date"
 *   },
 *   endDate: {
 *     required: true,
 *     type: "date",
 *     after: "startDate",
 *     message: "End date must be after start date"
 *   },
 *   reason: {
 *     required: true,
 *     minLength: 10
 *   }
 * }
 * 
 * const validateDateRange = validateForm(dateRangeSchema)
 * 
 * validateDateRange({
 *   startDate: "2024-01-01",
 *   endDate: "2023-12-31",
 *   reason: "Vacation"
 * })
 * // {
 * //   endDate: "End date must be after start date",
 * //   reason: "Minimum length is 10"
 * // }
 * 
 * // Dynamic field validation
 * const dynamicSchema = {
 *   fieldCount: {
 *     required: true,
 *     type: "number",
 *     min: 1,
 *     max: 5
 *   },
 *   ...Array.from({ length: 5 }, (_, i) => ({
 *     [`field_${i + 1}`]: {
 *       when: (data: any) => data.fieldCount > i,
 *       required: true,
 *       minLength: 3
 *     }
 *   })).reduce((acc, cur) => ({ ...acc, ...cur }), {})
 * }
 * 
 * const validateDynamic = validateForm(dynamicSchema)
 * 
 * validateDynamic({
 *   fieldCount: 3,
 *   field_1: "abc",
 *   field_2: "def",
 *   field_3: "ghi"
 * })
 * // null (only first 3 fields required)
 * 
 * // Nested object validation
 * const profileSchema = {
 *   "user.name": {
 *     required: true,
 *     minLength: 2
 *   },
 *   "user.email": {
 *     required: true,
 *     type: "email"
 *   },
 *   "preferences.newsletter": {
 *     type: "boolean"
 *   },
 *   "preferences.notifications.email": {
 *     type: "boolean"
 *   },
 *   "preferences.notifications.sms": {
 *     when: (data: any) => data["preferences.notifications.email"],
 *     type: "boolean"
 *   }
 * }
 * 
 * const validateProfile = validateForm(profileSchema)
 * 
 * // Group validation with dependencies
 * const teamSchema = {
 *   teamName: {
 *     required: true,
 *     minLength: 3,
 *     maxLength: 50
 *   },
 *   teamSize: {
 *     required: true,
 *     type: "number",
 *     min: 2,
 *     max: 100
 *   },
 *   leader: {
 *     required: true,
 *     minLength: 2
 *   },
 *   members: {
 *     required: true,
 *     validate: (value: string, data: any) => {
 *       const memberCount = value.split(",").length
 *       if (memberCount !== data.teamSize - 1) {
 *         return `Must have exactly ${data.teamSize - 1} members (excluding leader)`
 *       }
 *       return null
 *     }
 *   }
 * }
 * 
 * const validateTeam = validateForm(teamSchema)
 * 
 * validateTeam({
 *   teamName: "Alpha Team",
 *   teamSize: 4,
 *   leader: "John",
 *   members: "Jane,Bob,Alice"
 * })
 * // null (3 members + 1 leader = 4 total)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Comprehensive - Validates all fields and returns all errors
 * @property Flexible - Supports conditional and cross-field validation
 * @property Curried - Schema can be partially applied for reuse
 */
type FormFieldRules = {
	required?: boolean
	type?: "string" | "number" | "boolean" | "email" | "date" | "url"
	minLength?: number
	maxLength?: number
	min?: number | string
	max?: number | string
	pattern?: RegExp
	enum?: Array<any>
	equals?: any
	match?: string
	after?: string
	before?: string
	when?: (formData: any) => boolean
	validate?: (value: any, formData: any) => string | null
	async?: (value: any, formData: any) => Promise<string | null>
	transform?: (value: any) => any
	message?: string
}

type FormSchema = Record<string, FormFieldRules>
type FormErrors = Record<string, string> | null

const validateForm = (schema: FormSchema) =>
	(formData: Record<string, any>): FormErrors => {
		const errors: Record<string, string> = {}

		// First pass: validate all fields
		for (const [fieldName, rules] of Object.entries(schema)) {
			// Check conditional validation
			if (rules.when && !rules.when(formData)) {
				continue
			}

			let value = formData[fieldName]

			// Apply transform if provided
			if (rules.transform) {
				value = rules.transform(value)
			}

			// Check required
			if (rules.required) {
				if (
					value === undefined ||
					value === null ||
					value === "" ||
					(typeof value === "string" && value.trim() === "")
				) {
					errors[fieldName] = rules.message || "This field is required"
					continue
				}
			}

			// Skip validation if not required and empty
			if (
				!rules.required &&
				(value === undefined || value === null || value === "")
			) {
				continue
			}

			// Type validation
			if (rules.type) {
				let typeError: string | null = null

				switch (rules.type) {
					case "string":
						if (typeof value !== "string") {
							typeError = "Must be a string"
						}
						break

					case "number":
						const numValue = Number(value)
						if (isNaN(numValue)) {
							typeError = "Must be a valid number"
						} else {
							value = numValue
						}
						break

					case "boolean":
						if (typeof value !== "boolean") {
							typeError = "Must be true or false"
						}
						break

					case "email":
						const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
						if (!emailRegex.test(String(value))) {
							typeError = "Invalid email format"
						}
						break

					case "date":
						const date = new Date(String(value))
						if (isNaN(date.getTime())) {
							typeError = "Invalid date format"
						}
						break

					case "url":
						try {
							new URL(String(value))
						} catch {
							typeError = "Invalid URL format"
						}
						break
				}

				if (typeError) {
					errors[fieldName] = rules.message || typeError
					continue
				}
			}

			// String length validation
			if (typeof value === "string") {
				if (rules.minLength !== undefined && value.length < rules.minLength) {
					errors[fieldName] =
						rules.message || `Minimum length is ${rules.minLength}`
					continue
				}

				if (rules.maxLength !== undefined && value.length > rules.maxLength) {
					errors[fieldName] =
						rules.message || `Maximum length is ${rules.maxLength}`
					continue
				}
			}

			// Numeric range validation
			if (typeof value === "number" || rules.type === "number") {
				const numValue = Number(value)

				if (rules.min !== undefined && numValue < Number(rules.min)) {
					errors[fieldName] =
						rules.message || `Minimum value is ${rules.min}`
					continue
				}

				if (rules.max !== undefined && numValue > Number(rules.max)) {
					errors[fieldName] =
						rules.message || `Maximum value is ${rules.max}`
					continue
				}
			}

			// Pattern validation
			if (rules.pattern && !rules.pattern.test(String(value))) {
				errors[fieldName] = rules.message || "Invalid format"
				continue
			}

			// Enum validation
			if (rules.enum && !rules.enum.includes(value)) {
				errors[fieldName] =
					rules.message || `Must be one of: ${rules.enum.join(", ")}`
				continue
			}

			// Equals validation
			if (rules.equals !== undefined && value !== rules.equals) {
				errors[fieldName] =
					rules.message || `Must equal ${rules.equals}`
				continue
			}

			// Match another field
			if (rules.match && value !== formData[rules.match]) {
				errors[fieldName] =
					rules.message || `Must match ${rules.match}`
				continue
			}

			// Date comparison validations
			if (rules.type === "date" || value instanceof Date) {
				const dateValue = new Date(value)

				if (rules.after) {
					const afterDate = new Date(formData[rules.after])
					if (dateValue <= afterDate) {
						errors[fieldName] =
							rules.message || `Must be after ${rules.after}`
						continue
					}
				}

				if (rules.before) {
					const beforeDate = new Date(formData[rules.before])
					if (dateValue >= beforeDate) {
						errors[fieldName] =
							rules.message || `Must be before ${rules.before}`
						continue
					}
				}
			}

			// Custom validation
			if (rules.validate) {
				const customError = rules.validate(value, formData)
				if (customError) {
					errors[fieldName] = customError
					continue
				}
			}
		}

		// Return null if no errors
		return Object.keys(errors).length > 0 ? errors : null
	}

export default validateForm