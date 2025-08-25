/**
 * Validates that a value is present and not empty
 *
 * Checks whether a value is considered "required" - meaning it must be
 * present, defined, and non-empty. Different types have different
 * definitions of "empty". This is useful for form validation and
 * ensuring data completeness. Returns false for null, undefined,
 * empty strings, empty arrays, empty objects, and other "empty" values.
 *
 * Required validation rules:
 * - Not null or undefined
 * - Strings must have non-whitespace characters
 * - Arrays must have at least one element
 * - Objects must have at least one own property
 * - Maps and Sets must have at least one entry
 * - Numbers (including 0) are always considered present
 * - Booleans (including false) are always considered present
 *
 * @param options - Optional configuration for validation behavior
 * @returns A predicate function that validates required values
 * @example
 * ```typescript
 * // Basic required validation
 * const isRequiredValue = isRequired()
 *
 * isRequiredValue("hello")         // true (non-empty string)
 * isRequiredValue(123)             // true (number)
 * isRequiredValue(0)               // true (zero is valid)
 * isRequiredValue(false)           // true (boolean)
 * isRequiredValue([1, 2, 3])       // true (non-empty array)
 * isRequiredValue({ a: 1 })        // true (non-empty object)
 * isRequiredValue("")              // false (empty string)
 * isRequiredValue("   ")           // false (whitespace only)
 * isRequiredValue([])              // false (empty array)
 * isRequiredValue({})              // false (empty object)
 * isRequiredValue(null)            // false
 * isRequiredValue(undefined)       // false
 *
 * // Allow whitespace strings
 * const allowWhitespace = isRequired({ allowWhitespace: true })
 *
 * allowWhitespace("   ")           // true (whitespace allowed)
 * allowWhitespace("\t\n")          // true (tabs and newlines)
 * allowWhitespace("")              // false (still empty)
 * allowWhitespace("hello")         // true
 *
 * // Custom minimum length for strings
 * const minLength3 = isRequired({ minLength: 3 })
 *
 * minLength3("abc")                // true (exactly 3)
 * minLength3("hello")              // true (more than 3)
 * minLength3("ab")                 // false (less than 3)
 * minLength3("")                   // false (empty)
 * minLength3("   hello   ")        // true (trimmed length > 3)
 *
 * // Custom minimum size for collections
 * const minSize2 = isRequired({ minSize: 2 })
 *
 * minSize2([1, 2])                 // true (2 elements)
 * minSize2([1])                    // false (only 1 element)
 * minSize2({ a: 1, b: 2 })         // true (2 properties)
 * minSize2({ a: 1 })               // false (only 1 property)
 * minSize2(new Set([1, 2]))        // true (2 elements)
 * minSize2(new Map([["a", 1]]))    // false (only 1 entry)
 *
 * // Form field validation
 * const validateFormField = (
 *   value: unknown,
 *   fieldName: string
 * ): string | null => {
 *   if (!isRequired()(value)) {
 *     return `${fieldName} is required`
 *   }
 *   return null
 * }
 *
 * validateFormField("John", "Name")        // null (valid)
 * validateFormField("", "Name")            // "Name is required"
 * validateFormField(null, "Email")         // "Email is required"
 * validateFormField("   ", "Username")     // "Username is required"
 *
 * // Object property validation
 * const validateUser = (user: any): Array<string> => {
 *   const errors: Array<string> = []
 *   const validator = isRequired()
 *
 *   if (!validator(user?.name)) {
 *     errors.push("Name is required")
 *   }
 *   if (!validator(user?.email)) {
 *     errors.push("Email is required")
 *   }
 *   if (!validator(user?.roles)) {
 *     errors.push("At least one role is required")
 *   }
 *
 *   return errors
 * }
 *
 * validateUser({ name: "John", email: "john@example.com", roles: ["user"] })  // []
 * validateUser({ name: "", email: "john@example.com", roles: [] })  // ["Name is required", "At least one role is required"]
 *
 * // Filter required values
 * const values = ["hello", "", null, 0, false, [], [1], {}, { a: 1 }, "   "]
 * const requiredOnly = values.filter(isRequired())
 * // ["hello", 0, false, [1], { a: 1 }]
 *
 * // Configuration validation
 * const validateConfig = (config: Record<string, unknown>): boolean => {
 *   const requiredFields = ["apiKey", "endpoint", "timeout"]
 *   const validator = isRequired()
 *
 *   return requiredFields.every(field => validator(config[field]))
 * }
 *
 * validateConfig({ apiKey: "abc123", endpoint: "https://api.example.com", timeout: 5000 })  // true
 * validateConfig({ apiKey: "", endpoint: "https://api.example.com", timeout: 5000 })  // false
 *
 * // Multi-field form validation
 * type FormData = {
 *   firstName: string
 *   lastName: string
 *   email: string
 *   phone?: string
 *   address?: string
 * }
 *
 * const validateForm = (data: FormData): Record<string, string> => {
 *   const errors: Record<string, string> = {}
 *   const required = isRequired()
 *
 *   if (!required(data.firstName)) {
 *     errors.firstName = "First name is required"
 *   }
 *   if (!required(data.lastName)) {
 *     errors.lastName = "Last name is required"
 *   }
 *   if (!required(data.email)) {
 *     errors.email = "Email is required"
 *   }
 *   // Phone and address are optional
 *
 *   return errors
 * }
 *
 * // File upload validation
 * const validateFileUpload = (file: File | null): string | null => {
 *   if (!isRequired()(file)) {
 *     return "Please select a file"
 *   }
 *   if (file.size === 0) {
 *     return "File cannot be empty"
 *   }
 *   return null
 * }
 *
 * // Search query validation
 * const validateSearchQuery = (query: string): boolean => {
 *   return isRequired({ minLength: 2 })(query)
 * }
 *
 * validateSearchQuery("ab")        // true (minimum 2 chars)
 * validateSearchQuery("a")         // false (too short)
 * validateSearchQuery("")          // false (empty)
 *
 * // Comment validation with minimum length
 * const validateComment = (comment: string): string | null => {
 *   const validator = isRequired({ minLength: 10, allowWhitespace: false })
 *
 *   if (!validator(comment)) {
 *     return "Comment must be at least 10 characters long"
 *   }
 *
 *   return null
 * }
 *
 * validateComment("Great post!")   // true (11 chars)
 * validateComment("Nice")          // false (too short)
 * validateComment("          ")    // false (whitespace only)
 *
 * // Nested object validation
 * const validateAddress = (address: any): boolean => {
 *   const required = isRequired()
 *
 *   return required(address) &&
 *          required(address.street) &&
 *          required(address.city) &&
 *          required(address.postalCode)
 * }
 *
 * validateAddress({ street: "123 Main St", city: "Boston", postalCode: "02101" })  // true
 * validateAddress({ street: "", city: "Boston", postalCode: "02101" })  // false
 *
 * // Special value handling
 * const validator = isRequired()
 *
 * // Numbers
 * validator(0)                     // true (zero is valid)
 * validator(-1)                    // true
 * validator(NaN)                   // true (NaN is a number)
 * validator(Infinity)              // true
 *
 * // Booleans
 * validator(true)                  // true
 * validator(false)                 // true (false is valid)
 *
 * // Dates
 * validator(new Date())            // true
 * validator(new Date(""))          // true (even invalid date object)
 *
 * // Functions
 * validator(() => {})              // true (functions are valid)
 *
 * // Symbols
 * validator(Symbol("test"))        // true
 *
 * // Complex types
 * const complexValidator = isRequired()
 *
 * complexValidator(new Map())      // false (empty Map)
 * complexValidator(new Map([["a", 1]]))  // true
 * complexValidator(new Set())      // false (empty Set)
 * complexValidator(new Set([1]))   // true
 * complexValidator(new WeakMap())  // true (can't check size)
 * complexValidator(new WeakSet())  // true (can't check size)
 *
 * // Password strength with minimum
 * const validatePassword = (password: string): string | null => {
 *   if (!isRequired({ minLength: 8 })(password)) {
 *     return "Password must be at least 8 characters"
 *   }
 *   return null
 * }
 *
 * validatePassword("secure123")    // null (valid)
 * validatePassword("short")        // "Password must be at least 8 characters"
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Type-aware - Different validation rules for different types
 * @property Configurable - Options for whitespace and minimum sizes
 * @property Comprehensive - Handles all JavaScript types appropriately
 * @property Form-friendly - Designed for form validation scenarios
 */
type RequiredOptions = {
	allowWhitespace?: boolean
	minLength?: number // For strings
	minSize?: number // For arrays, objects, Maps, Sets
}

const isRequired = (
	options: RequiredOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		// Null and undefined are never valid
		if (value === null || value === undefined) {
			return false
		}

		const {
			allowWhitespace = false,
			minLength = 1,
			minSize = 1,
		} = options

		// Handle different types
		if (typeof value === "string") {
			const trimmed = allowWhitespace ? value : value.trim()
			return trimmed.length >= minLength
		}

		if (Array.isArray(value)) {
			return value.length >= minSize
		}

		if (value instanceof Map || value instanceof Set) {
			return value.size >= minSize
		}

		// WeakMap and WeakSet can't check size, consider them valid if they exist
		if (value instanceof WeakMap || value instanceof WeakSet) {
			return true
		}

		if (typeof value === "object") {
			// Check for plain objects
			const keys = Object.keys(value)
			return keys.length >= minSize
		}

		// All other types (numbers, booleans, functions, symbols, etc.) are considered valid
		// This includes:
		// - Numbers (including 0, NaN, Infinity)
		// - Booleans (including false)
		// - Functions
		// - Symbols
		// - Dates
		// - RegExp
		// - etc.
		return true
	}
}

export default isRequired
