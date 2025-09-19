import type { CastResult, CastType } from "../../../types/conversion/index.ts"

import toBoolean from "./toBoolean/index.ts"
import toFloat from "./toFloat/index.ts"
import toInteger from "./toInteger/index.ts"
import toString from "./toString/index.ts"

/**
 * Casts a value to a specific datatype
 *
 * A dispatcher function that selects and applies the appropriate type
 * conversion based on the specified target type. This provides a unified
 * interface for type coercion with consistent behavior across different
 * conversion types.
 *
 * Available cast types:
 * - "boolean": Converts to boolean using toBoolean rules
 * - "float": Flexibly parses as floating-point number
 * - "integer": Strictly parses as integer (no decimals)
 * - "string": Safely converts to string representation
 *
 * @curried (type) => (value) => result
 * @param type - The target type to cast to
 * @param value - The value to cast
 * @returns The value cast to the specified type
 * @example
 * ```typescript
 * // Boolean casting
 * const toBool = castValue("boolean")
 * toBool("true")                   // true
 * toBool("false")                  // false
 * toBool(1)                        // true
 * toBool(0)                        // false
 * toBool("yes")                    // true
 * toBool("")                       // false
 *
 * // Integer casting
 * const toInt = castValue("integer")
 * toInt("42")                      // 42
 * toInt(42.7)                      // 42 (truncated)
 * toInt("42.5")                    // NaN (string decimals not allowed)
 * toInt(true)                      // 1
 * toInt(false)                     // 0
 *
 * // Float casting
 * const toNum = castValue("float")
 * toNum("42.5")                    // 42.5
 * toNum("1e3")                     // 1000
 * toNum(true)                      // 1
 * toNum("")                        // 0
 * toNum("abc")                     // NaN
 *
 * // String casting
 * const toStr = castValue("string")
 * toStr(42)                        // "42"
 * toStr(true)                      // "true"
 * toStr(null)                      // "null"
 * toStr([1, 2, 3])                 // "[1,2,3]"
 * toStr({ a: 1 })                  // '{"a":1}'
 *
 * // Direct usage
 * castValue("boolean")("yes")      // true
 * castValue("integer")("100")      // 100
 * castValue("float")("3.14")      // 3.14
 * castValue("string")(123)         // "123"
 *
 * // Configuration parsing
 * interface RawConfig {
 *   port: string
 *   debug: string
 *   timeout: string
 *   name: unknown
 * }
 *
 * function parseConfig(raw: RawConfig) {
 *   return {
 *     port: castValue("integer")(raw.port),
 *     debug: castValue("boolean")(raw.debug),
 *     timeout: castValue("float")(raw.timeout),
 *     name: castValue("string")(raw.name)
 *   }
 * }
 *
 * parseConfig({
 *   port: "3000",
 *   debug: "true",
 *   timeout: "5.5",
 *   name: "MyApp"
 * })
 * // { port: 3000, debug: true, timeout: 5.5, name: "MyApp" }
 *
 * // Form data processing
 * const formData = new FormData()
 * formData.set("age", "25")
 * formData.set("active", "on")
 * formData.set("score", "98.5")
 *
 * const data = {
 *   age: castValue("integer")(formData.get("age")),
 *   active: castValue("boolean")(formData.get("active")),
 *   score: castValue("float")(formData.get("score"))
 * }
 * // { age: 25, active: true, score: 98.5 }
 *
 * // Type-safe casting with generics
 * function safeCast<T extends CastType>(
 *   type: T,
 *   value: unknown
 * ): CastResult<T> {
 *   return castValue(type)(value) as CastResult<T>
 * }
 *
 * const bool = safeCast("boolean", "true")   // boolean type
 * const int = safeCast("integer", "42")      // number type
 * const num = safeCast("float", "3.14")     // number type
 * const str = safeCast("string", 123)        // string type
 *
 * // Validation with casting
 * function validateAge(input: unknown): number | null {
 *   const age = castValue("integer")(input)
 *   if (isNaN(age) || age < 0 || age > 150) {
 *     return null
 *   }
 *   return age
 * }
 *
 * validateAge("25")                // 25
 * validateAge("25.5")              // null (decimals not allowed)
 * validateAge(200)                 // null (out of range)
 *
 * // Dynamic type selection
 * const typeMap = {
 *   id: "integer",
 *   enabled: "boolean",
 *   price: "float",
 *   description: "string"
 * } as const
 *
 * function castField(field: keyof typeof typeMap, value: unknown) {
 *   return castValue(typeMap[field])(value)
 * }
 *
 * castField("id", "123")           // 123
 * castField("enabled", "yes")      // true
 * castField("price", "19.99")      // 19.99
 * castField("description", null)   // "null"
 * ```
 * @pure
 * @safe
 * @curried
 */
export default function castValue<T extends CastType>(type: T) {
	return function castValueInner(value: unknown): CastResult<T> {
		switch (type) {
			case "boolean":
				return toBoolean(value) as CastResult<T>
			case "float":
				return toFloat(value) as CastResult<T>
			case "integer":
				return toInteger(value) as CastResult<T>
			case "string":
				return toString(value) as CastResult<T>
			default: {
				// TypeScript exhaustiveness check
				const _exhaustive: never = type
				throw new Error(`Unknown cast type: ${_exhaustive}`)
			}
		}
	}
}
