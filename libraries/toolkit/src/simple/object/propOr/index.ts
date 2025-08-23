import type { Value } from "../../../types/index.ts"

/**
 * Returns the value of a property or a default value if not found
 * 
 * Like prop, but returns a default value when the property doesn't exist
 * or when the object is null/undefined. Useful for safe property access
 * with fallback values in functional pipelines.
 * 
 * @curried (defaultValue) => (key) => (obj) => value
 * @param defaultValue - The value to return if property is not found
 * @param key - The property key to extract
 * @param obj - The object to extract from
 * @returns The value of the property, or defaultValue if not found
 * @example
 * ```typescript
 * // Basic usage with defaults
 * propOr("Unknown")("name")({ name: "Alice" })         // "Alice"
 * propOr("Unknown")("name")({})                        // "Unknown"
 * propOr(0)("count")({ count: 5 })                     // 5
 * propOr(0)("count")({})                               // 0
 * 
 * // Different default types
 * propOr(false)("active")({ active: true })            // true
 * propOr(false)("active")({})                          // false
 * propOr([])("items")({ items: [1, 2, 3] })           // [1, 2, 3]
 * propOr([])("items")({})                             // []
 * 
 * // Null and undefined values (returns actual value, not default)
 * propOr("default")("value")({ value: null })          // null
 * propOr("default")("value")({ value: undefined })     // undefined
 * propOr("default")("missing")({ other: "data" })      // "default"
 * 
 * // Falsy values are returned as-is
 * propOr(10)("count")({ count: 0 })                    // 0
 * propOr("default")("text")({ text: "" })              // ""
 * propOr(true)("flag")({ flag: false })                // false
 * 
 * // Complex default values
 * propOr({ x: 0, y: 0 })("position")({ position: { x: 10, y: 20 } })
 * // { x: 10, y: 20 }
 * 
 * propOr({ x: 0, y: 0 })("position")({})
 * // { x: 0, y: 0 }
 * 
 * // Null/undefined objects
 * propOr("default")("any")(null)                       // "default"
 * propOr("default")("any")(undefined)                  // "default"
 * 
 * // Symbol keys
 * const sym = Symbol("id")
 * propOr(0)(sym)({ [sym]: 123 })                       // 123
 * propOr(0)(sym)({})                                   // 0
 * 
 * // Practical use cases
 * 
 * // Configuration with defaults
 * const getPort = propOr(3000)("port")
 * const getHost = propOr("localhost")("host")
 * const getTimeout = propOr(5000)("timeout")
 * 
 * const config1 = { port: 8080, host: "0.0.0.0" }
 * const config2 = { port: 9000 }
 * const config3 = {}
 * 
 * getPort(config1)                                     // 8080
 * getPort(config2)                                     // 9000
 * getPort(config3)                                     // 3000
 * 
 * getHost(config1)                                     // "0.0.0.0"
 * getHost(config2)                                     // "localhost"
 * 
 * // Safe data extraction
 * const users = [
 *   { id: 1, name: "Alice", email: "alice@ex.com" },
 *   { id: 2, name: "Bob" },
 *   { id: 3 }
 * ]
 * 
 * const getName = propOr("Anonymous")("name")
 * const getEmail = propOr("no-email@example.com")("email")
 * 
 * users.map(getName)
 * // ["Alice", "Bob", "Anonymous"]
 * 
 * users.map(getEmail)
 * // ["alice@ex.com", "no-email@example.com", "no-email@example.com"]
 * 
 * // Settings with fallbacks
 * const getTheme = propOr("light")("theme")
 * const getLanguage = propOr("en")("language")
 * const getFontSize = propOr(14)("fontSize")
 * 
 * const userSettings = { theme: "dark", fontSize: 16 }
 * 
 * getTheme(userSettings)                               // "dark"
 * getLanguage(userSettings)                            // "en"
 * getFontSize(userSettings)                            // 16
 * 
 * // API response handling
 * const getStatus = propOr(200)("status")
 * const getMessage = propOr("Success")("message")
 * const getData = propOr([])("data")
 * 
 * const response1 = { status: 404, message: "Not found" }
 * const response2 = { data: [1, 2, 3] }
 * const response3 = {}
 * 
 * getStatus(response1)                                 // 404
 * getStatus(response2)                                 // 200
 * getMessage(response1)                                // "Not found"
 * getMessage(response3)                                // "Success"
 * getData(response2)                                   // [1, 2, 3]
 * getData(response3)                                   // []
 * 
 * // Score calculations with defaults
 * const getScore = propOr(0)("score")
 * const scores = [
 *   { player: "Alice", score: 100 },
 *   { player: "Bob" },
 *   { player: "Carol", score: 85 }
 * ]
 * 
 * const totalScore = scores.reduce((sum, player) => 
 *   sum + getScore(player), 0
 * )
 * // 185 (Bob gets default score of 0)
 * 
 * // Feature flags with defaults
 * const isEnabled = (feature: string) => 
 *   propOr(false)(feature)
 * 
 * const features = {
 *   darkMode: true,
 *   analytics: true
 * }
 * 
 * isEnabled("darkMode")(features)                      // true
 * isEnabled("betaFeatures")(features)                  // false (default)
 * isEnabled("analytics")(features)                     // true
 * 
 * // Pagination defaults
 * const getPage = propOr(1)("page")
 * const getLimit = propOr(10)("limit")
 * const getSort = propOr("asc")("sort")
 * 
 * const query1 = { page: 3, limit: 20, sort: "desc" }
 * const query2 = { page: 2 }
 * const query3 = {}
 * 
 * getPage(query1)                                      // 3
 * getLimit(query1)                                     // 20
 * getSort(query1)                                      // "desc"
 * 
 * getPage(query2)                                      // 2
 * getLimit(query2)                                     // 10 (default)
 * getSort(query2)                                      // "asc" (default)
 * 
 * // Partial application for consistent defaults
 * const withDefault = <T>(defaultVal: T) => (key: string) =>
 *   propOr(defaultVal)(key)
 * 
 * const stringWithDefault = withDefault("")
 * const numberWithDefault = withDefault(0)
 * const arrayWithDefault = withDefault([])
 * 
 * const obj = { name: "Test", count: 5 }
 * 
 * stringWithDefault("name")(obj)                       // "Test"
 * stringWithDefault("description")(obj)                // ""
 * numberWithDefault("count")(obj)                      // 5
 * numberWithDefault("total")(obj)                      // 0
 * arrayWithDefault("items")(obj)                       // []
 * ```
 * @property Safe access - never throws, always returns a value
 * @property Preserves actual values - returns null/undefined/falsy values as-is
 * @property Flexible defaults - default can be any type
 */
const propOr = <D extends Value>(
	defaultValue: D,
) => <K extends string | symbol, V extends Value>(
	key: K,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): V | D => {
	// Handle null/undefined objects
	if (obj == null) {
		return defaultValue
	}
	
	// Check if property exists (including undefined values)
	if (Object.prototype.hasOwnProperty.call(obj, key as string | symbol)) {
		return obj[key] as V
	}
	
	// Return default for missing properties
	return defaultValue
}

export default propOr