/**
 * Checks if a value is a JavaScript primitive
 *
 * Determines whether a value is one of the JavaScript primitive types:
 * string, number, boolean, null, undefined, symbol, or bigint. Primitives
 * are immutable values that are not objects and have no methods (though
 * JavaScript auto-boxes them when accessing properties). This is useful for
 * type checking, serialization, and understanding value vs reference semantics.
 *
 * Primitive types:
 * - string: Text values
 * - number: Numeric values (including NaN and Infinity)
 * - boolean: true or false
 * - null: The null value
 * - undefined: The undefined value
 * - symbol: Unique identifiers (ES6+)
 * - bigint: Large integers (ES2020+)
 *
 * @param value - The value to check
 * @returns True if the value is a primitive, false if it's an object
 * @example
 * ```typescript
 * // String primitives
 * isPrimitive("hello")                 // true
 * isPrimitive("")                      // true
 * isPrimitive(`template`)              // true
 * isPrimitive(String("text"))          // true (returns primitive)
 *
 * // Number primitives
 * isPrimitive(42)                      // true
 * isPrimitive(3.14)                    // true
 * isPrimitive(0)                       // true
 * isPrimitive(NaN)                     // true
 * isPrimitive(Infinity)                // true
 * isPrimitive(-Infinity)               // true
 *
 * // Boolean primitives
 * isPrimitive(true)                    // true
 * isPrimitive(false)                   // true
 * isPrimitive(Boolean(1))              // true (returns primitive)
 *
 * // Null and undefined
 * isPrimitive(null)                    // true
 * isPrimitive(undefined)               // true
 * isPrimitive(void 0)                  // true (void 0 is undefined)
 *
 * // Symbol primitives (ES6+)
 * isPrimitive(Symbol())                // true
 * isPrimitive(Symbol("id"))            // true
 * isPrimitive(Symbol.for("global"))    // true
 *
 * // BigInt primitives (ES2020+)
 * isPrimitive(BigInt(123))             // true
 * isPrimitive(123n)                    // true
 * isPrimitive(0n)                      // true
 *
 * // Not primitives: objects
 * isPrimitive({})                      // false
 * isPrimitive({ a: 1 })                // false
 * isPrimitive([])                      // false
 * isPrimitive([1, 2, 3])               // false
 * isPrimitive(new Date())              // false
 * isPrimitive(/regex/)                 // false
 * isPrimitive(new Map())               // false
 * isPrimitive(new Set())               // false
 *
 * // Not primitives: functions
 * isPrimitive(function() {})           // false
 * isPrimitive(() => {})                // false
 * isPrimitive(Math.sqrt)               // false
 *
 * // Not primitives: boxed primitives
 * isPrimitive(new String("text"))      // false (String object)
 * isPrimitive(new Number(42))          // false (Number object)
 * isPrimitive(new Boolean(true))       // false (Boolean object)
 * isPrimitive(Object(Symbol()))        // false (boxed Symbol)
 *
 * // Type checking for serialization
 * function canDirectlySerialize(value: unknown): boolean {
 *   if (isPrimitive(value)) {
 *     // Primitives can be serialized, except...
 *     return typeof value !== "symbol" &&
 *            typeof value !== "bigint" &&
 *            typeof value !== "undefined"
 *   }
 *   // Objects need deeper inspection
 *   return false
 * }
 *
 * canDirectlySerialize("text")         // true
 * canDirectlySerialize(42)             // true
 * canDirectlySerialize(null)           // true
 * canDirectlySerialize(Symbol())       // false
 * canDirectlySerialize({})             // false
 *
 * // Value vs reference semantics
 * function demonstrateValueSemantics(value: unknown): string {
 *   if (isPrimitive(value)) {
 *     return "Passed by value - changes won't affect original"
 *   }
 *   return "Passed by reference - changes may affect original"
 * }
 *
 * // Immutability checking
 * function isImmutable(value: unknown): boolean {
 *   // All primitives are immutable
 *   if (isPrimitive(value)) return true
 *
 *   // Some objects are also immutable (frozen, etc.)
 *   if (Object.isFrozen(value)) return true
 *
 *   return false
 * }
 *
 * isImmutable("can't change me")       // true
 * isImmutable([1, 2, 3])               // false
 * isImmutable(Object.freeze({}))       // true
 *
 * // Filtering primitives from mixed array
 * const mixed = [
 *   42,
 *   "string",
 *   true,
 *   null,
 *   undefined,
 *   Symbol("sym"),
 *   123n,
 *   {},
 *   [],
 *   new Date()
 * ]
 *
 * const primitives = mixed.filter(isPrimitive)
 * // [42, "string", true, null, undefined, Symbol("sym"), 123n]
 *
 * const objects = mixed.filter(v => !isPrimitive(v))
 * // [{}, [], Date]
 *
 * // Deep equality for primitives
 * function primitivesEqual(a: unknown, b: unknown): boolean {
 *   if (!isPrimitive(a) || !isPrimitive(b)) {
 *     return false
 *   }
 *
 *   // Special case for NaN
 *   if (Number.isNaN(a) && Number.isNaN(b)) {
 *     return true
 *   }
 *
 *   return a === b
 * }
 *
 * primitivesEqual(5, 5)                // true
 * primitivesEqual("a", "a")            // true
 * primitivesEqual(NaN, NaN)            // true (special handling)
 * primitivesEqual(null, undefined)     // false
 * primitivesEqual(0, -0)               // true (=== doesn't distinguish)
 *
 * // Type coercion detection
 * function willCoerce(value: unknown): boolean {
 *   if (!isPrimitive(value)) return false
 *
 *   // null and undefined don't auto-box
 *   if (value == null) return false
 *
 *   // Other primitives auto-box when accessing properties
 *   return true
 * }
 *
 * willCoerce("string")                 // true (can access .length)
 * willCoerce(42)                       // true (can access .toFixed)
 * willCoerce(null)                     // false (throws on property access)
 *
 * // Memory efficiency analysis
 * function getMemoryType(value: unknown): string {
 *   if (isPrimitive(value)) {
 *     if (value == null) return "null/undefined (singleton)"
 *     if (typeof value === "boolean") return "boolean (singleton)"
 *     if (typeof value === "number") return "number (8 bytes)"
 *     if (typeof value === "string") return `string (${(value as string).length * 2} bytes approx)`
 *     if (typeof value === "symbol") return "symbol (unique reference)"
 *     if (typeof value === "bigint") return "bigint (variable size)"
 *   }
 *   return "object (heap allocated)"
 * }
 *
 * // React prop validation
 * function isPrimitiveProp(prop: unknown): boolean {
 *   // Primitives are safe React props (except symbols)
 *   return isPrimitive(prop) && typeof prop !== "symbol"
 * }
 *
 * isPrimitiveProp("text")              // true
 * isPrimitiveProp(42)                  // true
 * isPrimitiveProp(true)                // true
 * isPrimitiveProp(Symbol())            // false (React can't render symbols)
 * isPrimitiveProp({ obj: 1 })          // false
 *
 * // typeof vs isPrimitive comparison
 * function getTypeCategory(value: unknown): string {
 *   if (isPrimitive(value)) {
 *     if (value === null) return "primitive:null"
 *     return `primitive:${typeof value}`
 *   }
 *   if (Array.isArray(value)) return "object:array"
 *   if (typeof value === "function") return "object:function"
 *   return "object:object"
 * }
 *
 * getTypeCategory(42)                  // "primitive:number"
 * getTypeCategory("text")              // "primitive:string"
 * getTypeCategory(null)                // "primitive:null"
 * getTypeCategory([])                  // "object:array"
 * getTypeCategory({})                  // "object:object"
 *
 * // Structured cloning compatibility
 * function canStructuredClone(value: unknown): boolean {
 *   if (isPrimitive(value)) {
 *     // Most primitives work, except symbols
 *     return typeof value !== "symbol"
 *   }
 *
 *   // Check object types...
 *   return value instanceof Date ||
 *          value instanceof RegExp ||
 *          Array.isArray(value)
 *   // ... etc
 * }
 *
 * // Default parameter handling
 * function processValue<T>(
 *   value: T | null | undefined,
 *   defaultValue: T
 * ): T {
 *   // Use default for null/undefined primitives
 *   if (isPrimitive(value) && value == null) {
 *     return defaultValue
 *   }
 *   return value as T
 * }
 *
 * processValue(null, "default")        // "default"
 * processValue(undefined, 42)          // 42
 * processValue(0, 100)                 // 0 (0 is valid primitive)
 * processValue("", "default")          // "" (empty string is valid)
 *
 * // Type narrowing helper
 * type Primitive = string | number | boolean | null | undefined | symbol | bigint
 *
 * function asPrimitive(value: unknown): Primitive | null {
 *   return isPrimitive(value) ? value as Primitive : null
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Complete - Covers all 7 JavaScript primitive types
 * @property Type-safe - Correctly identifies primitives vs objects
 * @property ES2020+ - Includes modern primitives (symbol, bigint)
 */
const isPrimitive = (value: unknown): boolean => {
	return value === null ||
		(typeof value !== "object" && typeof value !== "function")
}

export default isPrimitive
