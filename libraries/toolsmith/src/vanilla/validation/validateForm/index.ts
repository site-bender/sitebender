import isEmail from "../isEmail/index.ts"
import isNotUndefined from "../isNotUndefined/index.ts"
import isNullish from "../isNullish/index.ts"
import isUrl from "../isUrl/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type FormFieldRules = {
	required?: boolean
	type?: "string" | "number" | "boolean" | "email" | "date" | "url"
	minLength?: number
	maxLength?: number
	min?: number | string
	max?: number | string
	pattern?: RegExp
	enum?: Array<unknown>
	equals?: unknown
	match?: string
	after?: string
	before?: string
	when?: (formData: Record<string, unknown>) => boolean
	validate?: (
		value: unknown,
		formData: Record<string, unknown>,
	) => string | null
	async?: (
		value: unknown,
		formData: Record<string, unknown>,
	) => Promise<string | null>
	transform?: (value: unknown) => unknown
	message?: string
}

type FormSchema = Record<string, FormFieldRules>
type FormErrors = Record<string, string> | null

const validateForm =
	(schema: FormSchema) => (formData: Record<string, unknown>): FormErrors => {
		const errors: Record<string, string> = {}

		// Validate all fields
		for (const [fieldName, rules] of Object.entries(schema)) {
			// Check conditional validation
			if (rules.when && !rules.when(formData)) {
				continue
			}

			let value = (formData as Record<string, unknown>)[fieldName]

			// Apply transform if provided
			if (rules.transform) {
				value = rules.transform(value)
			}

			// Check required
			if (rules.required) {
				if (
					isNullish(value) ||
					value === "" ||
					(typeof value === "string" && value.trim() === "")
				) {
					errors[fieldName] = rules.message ||
						"This field is required"
					continue
				}
			}

			// Skip validation if not required and empty
			if (!rules.required && (isNullish(value) || value === "")) {
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

					case "number": {
						const numValue = Number(value)
						if (isNaN(numValue)) {
							typeError = "Must be a valid number"
						} else {
							value = numValue
						}
						break
					}

					case "boolean":
						if (typeof value !== "boolean") {
							typeError = "Must be true or false"
						}
						break

					case "email":
						if (!isEmail({ requireTLD: true })(value)) {
							typeError = "Invalid email format"
						}
						break

					case "date": {
						const date = new Date(String(value))
						if (isNaN(date.getTime())) {
							typeError = "Invalid date format"
						}
						break
					}

					case "url":
						if (!isUrl()(value)) {
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
				if (
					isNotUndefined(rules.minLength) &&
					value.length < rules.minLength
				) {
					errors[fieldName] = rules.message ||
						`Minimum length is ${rules.minLength}`
					continue
				}

				if (
					isNotUndefined(rules.maxLength) &&
					value.length > rules.maxLength
				) {
					errors[fieldName] = rules.message ||
						`Maximum length is ${rules.maxLength}`
					continue
				}
			}

			// Numeric range validation
			if (typeof value === "number" || rules.type === "number") {
				const numValue = Number(value)

				if (isNotUndefined(rules.min) && numValue < Number(rules.min)) {
					errors[fieldName] = rules.message ||
						`Minimum value is ${rules.min}`
					continue
				}

				if (isNotUndefined(rules.max) && numValue > Number(rules.max)) {
					errors[fieldName] = rules.message ||
						`Maximum value is ${rules.max}`
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
				errors[fieldName] = rules.message ||
					`Must be one of: ${rules.enum.join(", ")}`
				continue
			}

			// Equals validation
			if (isNotUndefined(rules.equals) && value !== rules.equals) {
				errors[fieldName] = rules.message ||
					`Must equal ${rules.equals}`
				continue
			}

			// Match another field
			if (rules.match && value !== formData[rules.match]) {
				errors[fieldName] = rules.message || `Must match ${rules.match}`
				continue
			}

			// Date comparison validations
			if (rules.type === "date" || value instanceof Date) {
				const dateValue = new Date(value as string | number | Date)

				if (rules.after) {
					const afterDate = new Date(
						(formData as Record<string, unknown>)[rules.after] as
							| string
							| number
							| Date,
					)
					if (dateValue <= afterDate) {
						errors[fieldName] = rules.message ||
							`Must be after ${rules.after}`
						continue
					}
				}

				if (rules.before) {
					const beforeDate = new Date(
						(formData as Record<string, unknown>)[rules.before] as
							| string
							| number
							| Date,
					)
					if (dateValue >= beforeDate) {
						errors[fieldName] = rules.message ||
							`Must be before ${rules.before}`
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
