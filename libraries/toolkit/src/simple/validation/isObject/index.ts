/**
 * Type guard that checks if a value is a non-null object
 * 
 * Determines whether a value is an object type but not null. In JavaScript,
 * typeof null === "object" is a well-known quirk, so this function correctly
 * excludes null. Returns true for plain objects, arrays, functions, dates,
 * regex, and all other object types. For plain object checking specifically,
 * consider using isPlainObject instead.
 * 
 * Object detection:
 * - Plain objects: {} and Object.create()
 * - Arrays: [] and new Array()
 * - Functions: functions are objects in JavaScript
 * - Class instances: new MyClass()
 * - Built-in objects: Date, RegExp, Map, Set, etc.
 * - Excludes: null (despite typeof null === "object")
 * - Excludes: primitives (string, number, boolean, undefined, symbol, bigint)
 * 
 * @param value - The value to check
 * @returns True if the value is a non-null object, false otherwise
 * @example
 * ```typescript
 * // Plain objects
 * isObject({})                         // true
 * isObject({ a: 1 })                   // true
 * isObject(Object.create(null))        // true
 * isObject(Object.create({}))          // true
 * 
 * // Arrays (arrays are objects)
 * isObject([])                         // true
 * isObject([1, 2, 3])                  // true
 * isObject(new Array())                // true
 * 
 * // Functions (functions are objects)
 * isObject(function() {})              // true
 * isObject(() => {})                   // true
 * isObject(async () => {})             // true
 * isObject(Math.sqrt)                  // true
 * 
 * // Built-in objects
 * isObject(new Date())                 // true
 * isObject(/regex/)                    // true
 * isObject(new RegExp("pattern"))      // true
 * isObject(new Map())                  // true
 * isObject(new Set())                  // true
 * isObject(new WeakMap())              // true
 * isObject(new WeakSet())              // true
 * isObject(new Error())                // true
 * isObject(Promise.resolve())          // true
 * 
 * // Class instances
 * class Person { name: string }
 * isObject(new Person())               // true
 * isObject(Person)                     // true (class constructor is function)
 * 
 * // Not objects: null
 * isObject(null)                       // false (the important distinction)
 * 
 * // Not objects: primitives
 * isObject(undefined)                  // false
 * isObject(true)                       // false
 * isObject(false)                      // false
 * isObject(42)                         // false
 * isObject("string")                   // false
 * isObject(Symbol("sym"))              // false
 * isObject(BigInt(123))                // false
 * 
 * // Type narrowing in TypeScript
 * function processValue(value: unknown): void {
 *   if (isObject(value)) {
 *     // TypeScript knows value is object here
 *     console.log(Object.keys(value))
 *     console.log(Object.values(value))
 *   }
 * }
 * 
 * // Safe property access
 * function getProperty(value: unknown, key: string): unknown {
 *   if (isObject(value)) {
 *     return (value as any)[key]
 *   }
 *   return undefined
 * }
 * 
 * getProperty({ name: "Alice" }, "name")  // "Alice"
 * getProperty(null, "name")               // undefined
 * getProperty("string", "length")         // undefined (string is primitive)
 * 
 * // Filtering objects from mixed array
 * const mixed = [
 *   42,
 *   "string",
 *   null,
 *   undefined,
 *   { id: 1 },
 *   [1, 2],
 *   new Date(),
 *   () => {}
 * ]
 * 
 * const objects = mixed.filter(isObject)
 * // [{ id: 1 }, [1, 2], Date, function]
 * 
 * // Deep cloning check
 * function canDeepClone(value: unknown): boolean {
 *   if (!isObject(value)) return true  // Primitives are trivial
 *   
 *   // Some objects can't be cloned
 *   if (value instanceof Promise) return false
 *   if (value instanceof WeakMap) return false
 *   if (value instanceof WeakSet) return false
 *   
 *   return true
 * }
 * 
 * // Recursive object traversal
 * function countObjects(value: unknown): number {
 *   if (!isObject(value)) return 0
 *   
 *   let count = 1
 *   for (const key in value as object) {
 *     count += countObjects((value as any)[key])
 *   }
 *   return count
 * }
 * 
 * countObjects({ a: { b: { c: 1 } } })    // 3
 * countObjects([{}, {}, {}])              // 4 (array + 3 objects)
 * 
 * // Method detection
 * function hasMethod(value: unknown, method: string): boolean {
 *   return isObject(value) && 
 *          method in (value as object) &&
 *          typeof (value as any)[method] === "function"
 * }
 * 
 * hasMethod([], "push")                // true
 * hasMethod({}, "toString")            // true
 * hasMethod(null, "toString")          // false
 * hasMethod("string", "charAt")        // false (primitive)
 * 
 * // Plain object check (more specific)
 * function isPlainObject(value: unknown): boolean {
 *   if (!isObject(value)) return false
 *   
 *   // Check if it's a plain object (not array, function, etc.)
 *   const proto = Object.getPrototypeOf(value)
 *   return proto === null || proto === Object.prototype
 * }
 * 
 * isPlainObject({})                    // true
 * isPlainObject(Object.create(null))   // true
 * isPlainObject([])                    // false (array)
 * isPlainObject(new Date())            // false (Date instance)
 * isPlainObject(() => {})              // false (function)
 * 
 * // Serialization safety
 * function canSerialize(value: unknown): boolean {
 *   if (!isObject(value)) return true  // Primitives OK
 *   
 *   // Check for non-serializable objects
 *   if (typeof value === "function") return false
 *   if (value instanceof Symbol) return false
 *   if (value instanceof WeakMap) return false
 *   if (value instanceof WeakSet) return false
 *   
 *   return true
 * }
 * 
 * // Object merging
 * function safeMerge(target: unknown, source: unknown): object {
 *   if (!isObject(target)) {
 *     target = {}
 *   }
 *   if (!isObject(source)) {
 *     return target as object
 *   }
 *   
 *   return Object.assign({}, target, source)
 * }
 * 
 * safeMerge({ a: 1 }, { b: 2 })        // { a: 1, b: 2 }
 * safeMerge(null, { b: 2 })           // { b: 2 }
 * safeMerge({ a: 1 }, null)           // { a: 1 }
 * 
 * // React component detection
 * function isReactComponent(value: unknown): boolean {
 *   if (!isObject(value)) return false
 *   
 *   // Function components
 *   if (typeof value === "function") return true
 *   
 *   // Class components (simplified check)
 *   const proto = Object.getPrototypeOf(value)
 *   return proto && proto.isReactComponent
 * }
 * 
 * // Configuration validation
 * interface Config {
 *   [key: string]: unknown
 * }
 * 
 * function validateConfig(value: unknown): value is Config {
 *   return isObject(value) && !Array.isArray(value)
 * }
 * 
 * validateConfig({ port: 3000 })       // true
 * validateConfig([])                   // false (array)
 * validateConfig(null)                 // false
 * validateConfig("config")             // false
 * 
 * // Proxy wrapping
 * function wrapWithProxy<T extends object>(value: unknown): T | null {
 *   if (!isObject(value)) return null
 *   
 *   return new Proxy(value as T, {
 *     get(target, prop) {
 *       console.log(`Accessing ${String(prop)}`)
 *       return Reflect.get(target, prop)
 *     }
 *   })
 * }
 * 
 * // Typeof comparison
 * function typeofObject(value: unknown): string {
 *   if (value === null) return "null"
 *   if (isObject(value)) {
 *     if (Array.isArray(value)) return "array"
 *     if (typeof value === "function") return "function"
 *     return "object"
 *   }
 *   return typeof value
 * }
 * 
 * typeofObject({})                     // "object"
 * typeofObject([])                     // "array"
 * typeofObject(() => {})               // "function"
 * typeofObject(null)                   // "null"
 * typeofObject(42)                     // "number"
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to object
 * @property Null-safe - Correctly handles typeof null === "object" quirk
 * @property Inclusive - Returns true for all object types (arrays, functions, etc.)
 */
const isObject = (value: unknown): value is object => 
	value !== null && (typeof value === "object" || typeof value === "function")

export default isObject