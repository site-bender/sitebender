/**
 * Checks if a value is within a specified range
 *
 * Validates that a value falls within the specified minimum and maximum
 * bounds. Supports numbers, dates, strings (by length), and arrays (by size).
 * Can be configured for inclusive or exclusive bounds. Returns a boolean
 * or detailed validation result with error messages.
 *
 * @curried (options) => (value) => boolean | result
 * @param options - Range validation configuration
 * @param value - The value to validate
 * @returns Boolean or detailed result based on options
 * @example
 * ```typescript
 * // Basic number range
 * const isValidAge = validateRange({ min: 18, max: 65 })
 * isValidAge(25)   // true
 * isValidAge(17)   // false
 * isValidAge(65)   // true (inclusive)
 *
 * // Exclusive bounds
 * const isInRange = validateRange({ min: 0, max: 100, exclusive: true })
 * isInRange(0)     // false
 * isInRange(50)    // true
 * isInRange(100)   // false
 *
 * // String length
 * const isValidUsername = validateRange({ min: 3, max: 20, type: "string" })
 * isValidUsername("ab")    // false
 * isValidUsername("john")  // true
 *
 * // Detailed results
 * const validate = validateRange({ min: 0, max: 100, detailed: true })
 * validate(150)
 * // { valid: false, value: 150, min: 0, max: 100, error: "Value 150 exceeds maximum of 100" }
 *
 * // Custom messages
 * const validatePercent = validateRange({
 *   min: 0,
 *   max: 100,
 *   detailed: true,
 *   messages: { min: "Cannot be negative", max: "Cannot exceed 100%" }
 * })
 * ```
 * @pure
 * @curried
 */
//++ Range validator — number/string/array/date with inclusive/exclusive and detailed options
type RangeOptions = {
	min?: number | Date | string
	max?: number | Date | string
	exclusive?: boolean
	type?: "number" | "string" | "array" | "date" | "time" | "integer"
	step?: number
	detailed?: boolean
	messages?: {
		min?: string
		max?: string
		step?: string
		type?: string
	}
}

type RangeResult = {
	valid: boolean
	value: unknown
	min?: number | Date | string
	max?: number | Date | string
	error?: string
}

const validateRange =
	(options: RangeOptions) => (value: unknown): boolean | RangeResult => {
		const {
			min,
			max,
			exclusive = false,
			type = "number",
			step,
			detailed = false,
			messages = {},
		} = options

		// Helper to create result
		const createResult = (
			valid: boolean,
			error?: string,
		): boolean | RangeResult => {
			if (!detailed) return valid
			return {
				valid,
				value,
				...(min !== undefined && { min }),
				...(max !== undefined && { max }),
				...(error && { error }),
			}
		}

		// Type validation
		switch (type) {
			case "number":
				if (typeof value !== "number" || isNaN(value)) {
					return createResult(
						false,
						messages.type || "Value must be a number",
					)
				}
				break

			case "integer":
				if (typeof value !== "number" || !Number.isInteger(value)) {
					return createResult(
						false,
						messages.type || "Value must be an integer",
					)
				}
				break

			case "string":
				if (typeof value !== "string") {
					return createResult(
						false,
						messages.type || "Value must be a string",
					)
				}
				// For strings, we validate length
				value = value.length
				break

			case "array":
				if (!Array.isArray(value)) {
					return createResult(
						false,
						messages.type || "Value must be an array",
					)
				}
				// For arrays, we validate length
				value = value.length
				break

			case "date":
				if (
					!(value instanceof Date) &&
					(typeof value !== "string" || !Date.parse(value))
				) {
					return createResult(
						false,
						messages.type || "Value must be a valid date",
					)
				}
				value = value instanceof Date ? value : new Date(String(value))
				break

			case "time":
				// Convert time strings to comparable format
				if (
					typeof value !== "string" ||
					!/^\d{2}:\d{2}(:\d{2})?$/.test(value)
				) {
					return createResult(
						false,
						messages.type ||
							"Value must be a valid time (HH:MM or HH:MM:SS)",
					)
				}
				break
		}

		// Convert min/max based on type
		let minValue = min
		let maxValue = max

		if (type === "date" && min !== undefined) {
			minValue = new Date(min)
		}
		if (type === "date" && max !== undefined) {
			maxValue = new Date(max)
		}

		// Check minimum bound
		if (minValue !== undefined) {
			const comparison = type === "date"
				? (value as Date).getTime()
				: (value as number)

			const minComparison = type === "date"
				? (minValue as Date).getTime()
				: (minValue as number)

			if (exclusive) {
				if (comparison <= minComparison) {
					return createResult(
						false,
						messages.min ||
							`Value ${value} must be greater than ${min}`,
					)
				}
			} else {
				if (comparison < minComparison) {
					return createResult(
						false,
						messages.min ||
							`Value ${value} is below minimum of ${min}`,
					)
				}
			}
		}

		// Check maximum bound
		if (maxValue !== undefined) {
			const comparison = type === "date"
				? (value as Date).getTime()
				: (value as number)

			const maxComparison = type === "date"
				? (maxValue as Date).getTime()
				: (maxValue as number)

			if (exclusive) {
				if (comparison >= maxComparison) {
					return createResult(
						false,
						messages.max ||
							`Value ${value} must be less than ${max}`,
					)
				}
			} else {
				if (comparison > maxComparison) {
					return createResult(
						false,
						messages.max ||
							`Value ${value} exceeds maximum of ${max}`,
					)
				}
			}
		}

		// Check step if provided (only for numbers)
		if (step !== undefined && type === "number") {
			const epsilon = 0.0000001 // For floating point comparison
			const remainder = Math.abs((value as number) % step)
			if (remainder > epsilon && remainder < step - epsilon) {
				return createResult(
					false,
					messages.step ||
						`Value must be a multiple of ${step}`,
				)
			}
		}

		return createResult(true)
	}

export default validateRange

//?? [EXAMPLE] validateRange({ min: 0, max: 10 })(5) // true
//?? [EXAMPLE] validateRange({ min: 0, max: 10, exclusive: true })(0) // false
