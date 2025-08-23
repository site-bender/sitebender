/**
 * Safely converts any value to its string representation
 * 
 * Converts values to strings with consistent, predictable rules.
 * Handles all JavaScript types safely without throwing errors.
 * Objects and arrays are converted to JSON for better debugging.
 * 
 * Conversion rules:
 * - Strings: returned as-is
 * - Numbers: standard toString conversion
 * - Booleans: "true" or "false"
 * - null: "null"
 * - undefined: "undefined"
 * - Arrays: JSON stringified
 * - Objects: JSON stringified (with circular reference handling)
 * - Functions: returns function signature
 * - Symbols: returns symbol description
 * - Dates: ISO string format
 * - RegExp: returns pattern as string
 * - Errors: returns error message
 * 
 * @param value - The value to convert to string
 * @returns The string representation of the value
 * @example
 * ```typescript
 * // Strings pass through
 * toString("hello")                // "hello"
 * toString("")                     // ""
 * toString("  spaces  ")           // "  spaces  "
 * 
 * // Numbers
 * toString(42)                     // "42"
 * toString(42.5)                   // "42.5"
 * toString(-42.5)                  // "-42.5"
 * toString(0)                      // "0"
 * toString(-0)                     // "0"
 * toString(1e3)                    // "1000"
 * toString(1e-3)                   // "0.001"
 * toString(Infinity)               // "Infinity"
 * toString(-Infinity)              // "-Infinity"
 * toString(NaN)                    // "NaN"
 * 
 * // Booleans
 * toString(true)                   // "true"
 * toString(false)                  // "false"
 * 
 * // Nullish values
 * toString(null)                   // "null"
 * toString(undefined)              // "undefined"
 * 
 * // Arrays (JSON stringified)
 * toString([])                     // "[]"
 * toString([1, 2, 3])              // "[1,2,3]"
 * toString(["a", "b"])             // '["a","b"]'
 * toString([1, "a", true, null])   // '[1,"a",true,null]'
 * 
 * // Objects (JSON stringified)
 * toString({})                     // "{}"
 * toString({ a: 1 })               // '{"a":1}'
 * toString({ a: 1, b: "test" })    // '{"a":1,"b":"test"}'
 * toString({ nested: { x: 1 } })   // '{"nested":{"x":1}}'
 * 
 * // Circular references handled
 * const obj: any = { a: 1 }
 * obj.self = obj
 * toString(obj)                    // '{"a":1,"self":"[Circular]"}'
 * 
 * // Functions
 * toString(() => {})               // "() => {}"
 * toString(function test() {})     // "function test() {}"
 * toString(Math.max)               // "function max() { [native code] }"
 * 
 * // Symbols
 * toString(Symbol())               // "Symbol()"
 * toString(Symbol("test"))         // "Symbol(test)"
 * toString(Symbol.iterator)        // "Symbol(Symbol.iterator)"
 * 
 * // Dates
 * const date = new Date("2024-03-15T12:00:00Z")
 * toString(date)                   // "2024-03-15T12:00:00.000Z"
 * 
 * // RegExp
 * toString(/test/gi)               // "/test/gi"
 * toString(new RegExp("\\d+"))     // "/\\d+/"
 * 
 * // Errors
 * toString(new Error("Oops"))      // "Error: Oops"
 * toString(new TypeError("Bad"))   // "TypeError: Bad"
 * 
 * // Special objects
 * toString(new Map([["a", 1]]))    // '{"dataType":"Map","entries":[["a",1]]}'
 * toString(new Set([1, 2, 3]))     // '{"dataType":"Set","values":[1,2,3]}'
 * 
 * // Logging and debugging
 * function log(message: unknown, data?: unknown) {
 *   const timestamp = new Date().toISOString()
 *   const msg = toString(message)
 *   const dataStr = data !== undefined ? toString(data) : ""
 *   console.log(`[${timestamp}] ${msg} ${dataStr}`)
 * }
 * 
 * log("User action", { action: "click", target: "button" })
 * // [2024-03-15T12:00:00.000Z] User action {"action":"click","target":"button"}
 * 
 * // Form data serialization
 * function serializeFormData(data: Record<string, unknown>): string {
 *   const params = new URLSearchParams()
 *   for (const [key, value] of Object.entries(data)) {
 *     params.set(key, toString(value))
 *   }
 *   return params.toString()
 * }
 * 
 * serializeFormData({ 
 *   name: "John",
 *   age: 30,
 *   active: true 
 * })
 * // "name=John&age=30&active=true"
 * 
 * // Template literal helper
 * function template(strings: TemplateStringsArray, ...values: unknown[]): string {
 *   return strings.reduce((result, str, i) => {
 *     const value = i < values.length ? toString(values[i]) : ""
 *     return result + str + value
 *   }, "")
 * }
 * 
 * const user = { name: "Alice", id: 123 }
 * template`User: ${user}`
 * // 'User: {"name":"Alice","id":123}'
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Never throws errors
 * @property Informative - Provides useful string representations
 */
const toString = (value: unknown): string => {
	// Handle nullish values
	if (value === null) {
		return "null"
	}
	if (value === undefined) {
		return "undefined"
	}
	
	// If already a string, return as-is
	if (typeof value === "string") {
		return value
	}
	
	// Handle primitives
	if (typeof value === "number") {
		// Special handling for -0 to return "0"
		if (Object.is(value, -0)) {
			return "0"
		}
		return String(value)
	}
	
	if (typeof value === "boolean") {
		return value ? "true" : "false"
	}
	
	if (typeof value === "symbol") {
		return value.toString()
	}
	
	if (typeof value === "bigint") {
		return value.toString()
	}
	
	// Handle functions
	if (typeof value === "function") {
		return value.toString()
	}
	
	// Handle objects
	if (typeof value === "object") {
		// Special handling for Dates
		if (value instanceof Date) {
			return value.toISOString()
		}
		
		// Special handling for RegExp
		if (value instanceof RegExp) {
			return value.toString()
		}
		
		// Special handling for Errors
		if (value instanceof Error) {
			return `${value.name}: ${value.message}`
		}
		
		// Special handling for Map
		if (value instanceof Map) {
			try {
				return JSON.stringify({
					dataType: "Map",
					entries: Array.from(value.entries())
				})
			} catch {
				return "[Map]"
			}
		}
		
		// Special handling for Set
		if (value instanceof Set) {
			try {
				return JSON.stringify({
					dataType: "Set",
					values: Array.from(value.values())
				})
			} catch {
				return "[Set]"
			}
		}
		
		// For arrays and plain objects, use JSON.stringify with circular reference handling
		try {
			const seen = new WeakSet()
			return JSON.stringify(value, (key, val) => {
				if (typeof val === "object" && val !== null) {
					if (seen.has(val)) {
						return "[Circular]"
					}
					seen.add(val)
				}
				if (typeof val === "bigint") {
					return val.toString()
				}
				if (typeof val === "symbol") {
					return val.toString()
				}
				if (typeof val === "function") {
					return "[Function]"
				}
				return val
			})
		} catch {
			// Fallback for any JSON.stringify errors
			return Object.prototype.toString.call(value)
		}
	}
	
	// Fallback (should never reach here)
	return String(value)
}

export default toString