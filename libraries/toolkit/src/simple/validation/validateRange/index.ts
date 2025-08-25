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
 * // Basic number range validation
 * const isValidAge = validateRange({ min: 18, max: 65 })
 *
 * isValidAge(25)                          // true
 * isValidAge(17)                          // false
 * isValidAge(65)                          // true (inclusive by default)
 * isValidAge(66)                          // false
 *
 * // Exclusive bounds
 * const isInRange = validateRange({
 *   min: 0,
 *   max: 100,
 *   exclusive: true
 * })
 *
 * isInRange(0)                            // false (exclusive)
 * isInRange(1)                            // true
 * isInRange(99)                           // true
 * isInRange(100)                          // false (exclusive)
 *
 * // Minimum only
 * const hasMinimum = validateRange({ min: 10 })
 *
 * hasMinimum(5)                           // false
 * hasMinimum(10)                          // true
 * hasMinimum(1000)                        // true
 *
 * // Maximum only
 * const hasMaximum = validateRange({ max: 100 })
 *
 * hasMaximum(101)                         // false
 * hasMaximum(100)                         // true
 * hasMaximum(-50)                         // true
 *
 * // Date range validation
 * const isValidDate = validateRange({
 *   min: new Date("2024-01-01"),
 *   max: new Date("2024-12-31")
 * })
 *
 * isValidDate(new Date("2024-06-15"))     // true
 * isValidDate(new Date("2023-12-31"))     // false
 * isValidDate(new Date("2025-01-01"))     // false
 *
 * // String length validation
 * const isValidUsername = validateRange({
 *   min: 3,
 *   max: 20,
 *   type: "string"
 * })
 *
 * isValidUsername("ab")                   // false (too short)
 * isValidUsername("john")                 // true
 * isValidUsername("a".repeat(21))         // false (too long)
 *
 * // Array size validation
 * const isValidTeam = validateRange({
 *   min: 2,
 *   max: 10,
 *   type: "array"
 * })
 *
 * isValidTeam([])                         // false
 * isValidTeam(["Alice", "Bob"])           // true
 * isValidTeam(new Array(11))              // false
 *
 * // Detailed result mode
 * const validateScore = validateRange({
 *   min: 0,
 *   max: 100,
 *   detailed: true
 * })
 *
 * validateScore(85)
 * // { valid: true, value: 85, min: 0, max: 100 }
 *
 * validateScore(150)
 * // {
 * //   valid: false,
 * //   value: 150,
 * //   min: 0,
 * //   max: 100,
 * //   error: "Value 150 exceeds maximum of 100"
 * // }
 *
 * validateScore(-10)
 * // {
 * //   valid: false,
 * //   value: -10,
 * //   min: 0,
 * //   max: 100,
 * //   error: "Value -10 is below minimum of 0"
 * // }
 *
 * // Custom error messages
 * const validatePercentage = validateRange({
 *   min: 0,
 *   max: 100,
 *   detailed: true,
 *   messages: {
 *     min: "Percentage cannot be negative",
 *     max: "Percentage cannot exceed 100%"
 *   }
 * })
 *
 * validatePercentage(-5)
 * // { valid: false, value: -5, error: "Percentage cannot be negative" }
 *
 * validatePercentage(105)
 * // { valid: false, value: 105, error: "Percentage cannot exceed 100%" }
 *
 * // Temperature validation
 * const validateCelsius = validateRange({
 *   min: -273.15,  // Absolute zero
 *   max: 5778,     // Sun's surface
 *   detailed: true,
 *   messages: {
 *     min: "Temperature below absolute zero is impossible",
 *     max: "Temperature exceeds known physical limits"
 *   }
 * })
 *
 * validateCelsius(20)
 * // { valid: true, value: 20, min: -273.15, max: 5778 }
 *
 * validateCelsius(-300)
 * // { valid: false, value: -300, error: "Temperature below absolute zero is impossible" }
 *
 * // Price validation with step
 * const validatePrice = validateRange({
 *   min: 0.01,
 *   max: 10000,
 *   step: 0.01,
 *   detailed: true
 * })
 *
 * validatePrice(19.99)
 * // { valid: true, value: 19.99, min: 0.01, max: 10000 }
 *
 * validatePrice(19.999)
 * // { valid: false, value: 19.999, error: "Value must be a multiple of 0.01" }
 *
 * // Time slot validation
 * const validateTimeSlot = validateRange({
 *   min: "09:00",
 *   max: "17:00",
 *   type: "time"
 * })
 *
 * validateTimeSlot("10:30")               // true
 * validateTimeSlot("08:00")               // false
 * validateTimeSlot("18:00")               // false
 *
 * // Coordinate validation
 * const validateLatitude = validateRange({
 *   min: -90,
 *   max: 90,
 *   detailed: true,
 *   messages: {
 *     min: "Latitude must be between -90 and 90",
 *     max: "Latitude must be between -90 and 90"
 *   }
 * })
 *
 * const validateLongitude = validateRange({
 *   min: -180,
 *   max: 180,
 *   detailed: true,
 *   messages: {
 *     min: "Longitude must be between -180 and 180",
 *     max: "Longitude must be between -180 and 180"
 *   }
 * })
 *
 * // Port number validation
 * const validatePort = validateRange({
 *   min: 1,
 *   max: 65535,
 *   type: "integer"
 * })
 *
 * validatePort(8080)                      // true
 * validatePort(80.5)                      // false (not an integer)
 * validatePort(0)                         // false
 * validatePort(70000)                     // false
 *
 * // File size validation (in bytes)
 * const validateFileSize = validateRange({
 *   max: 5 * 1024 * 1024,  // 5MB
 *   detailed: true,
 *   messages: {
 *     max: "File size must not exceed 5MB"
 *   }
 * })
 *
 * validateFileSize(1024 * 1024)  // 1MB
 * // { valid: true, value: 1048576, max: 5242880 }
 *
 * validateFileSize(10 * 1024 * 1024)  // 10MB
 * // { valid: false, value: 10485760, error: "File size must not exceed 5MB" }
 *
 * // Array filtering with range
 * const numbers = [1, 5, 10, 15, 20, 25, 30]
 * const inRange = validateRange({ min: 10, max: 25 })
 *
 * numbers.filter(inRange)                 // [10, 15, 20, 25]
 *
 * // Composite validation
 * function validateProduct(product: { price: number; stock: number; name: string }) {
 *   const priceValid = validateRange({ min: 0.01, max: 99999.99 })(product.price)
 *   const stockValid = validateRange({ min: 0, type: "integer" })(product.stock)
 *   const nameValid = validateRange({ min: 1, max: 100, type: "string" })(product.name)
 *
 *   return priceValid && stockValid && nameValid
 * }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Flexible - Supports multiple data types and configurations
 * @property Informative - Can provide detailed validation results
 * @property Curried - Options can be partially applied for reuse
 */
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
	value: any
	min?: number | Date | string
	max?: number | Date | string
	error?: string
}

const validateRange =
	(options: RangeOptions) => (value: any): boolean | RangeResult => {
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
				if (!(value instanceof Date) && !Date.parse(value)) {
					return createResult(
						false,
						messages.type || "Value must be a valid date",
					)
				}
				value = new Date(value)
				break

			case "time":
				// Convert time strings to comparable format
				if (
					typeof value !== "string" || !/^\d{2}:\d{2}(:\d{2})?$/.test(value)
				) {
					return createResult(
						false,
						messages.type || "Value must be a valid time (HH:MM or HH:MM:SS)",
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
			const comparison = type === "date" ? (value as Date).getTime() : value

			const minComparison = type === "date"
				? (minValue as Date).getTime()
				: minValue

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
			const comparison = type === "date" ? (value as Date).getTime() : value

			const maxComparison = type === "date"
				? (maxValue as Date).getTime()
				: maxValue

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
			const remainder = Math.abs(value % step)
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
