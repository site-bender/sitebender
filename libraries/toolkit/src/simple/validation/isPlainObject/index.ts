/**
 * Checks if a value is a plain object
 * 
 * Determines whether a value is a plain object created by the Object constructor
 * or with object literal syntax {}. Returns false for arrays, functions, dates,
 * regex, class instances, and other specialized objects. A plain object has either
 * Object.prototype or null as its prototype. This is useful for configuration
 * objects, JSON-like data, and API payloads.
 * 
 * Plain object criteria:
 * - Created with {} or new Object()
 * - Has Object.prototype or null as prototype
 * - Not an array, function, or built-in object type
 * - Not a class instance (except Object)
 * - Includes objects from Object.create(null)
 * 
 * @param value - The value to check
 * @returns True if the value is a plain object, false otherwise
 * @example
 * ```typescript
 * // Plain objects
 * isPlainObject({})                    // true
 * isPlainObject({ a: 1, b: 2 })        // true
 * isPlainObject(new Object())          // true
 * isPlainObject(Object.create(null))   // true (null prototype)
 * isPlainObject({ nested: { obj: 1 } }) // true
 * 
 * // Not plain objects: null and primitives
 * isPlainObject(null)                  // false
 * isPlainObject(undefined)             // false
 * isPlainObject(42)                    // false
 * isPlainObject("string")              // false
 * isPlainObject(true)                  // false
 * isPlainObject(Symbol())              // false
 * 
 * // Not plain objects: arrays
 * isPlainObject([])                    // false
 * isPlainObject([1, 2, 3])             // false
 * isPlainObject(new Array())           // false
 * 
 * // Not plain objects: functions
 * isPlainObject(function() {})         // false
 * isPlainObject(() => {})              // false
 * isPlainObject(async () => {})        // false
 * isPlainObject(class MyClass {})      // false
 * 
 * // Not plain objects: built-in objects
 * isPlainObject(new Date())            // false
 * isPlainObject(/regex/)               // false
 * isPlainObject(new RegExp(""))        // false
 * isPlainObject(new Map())             // false
 * isPlainObject(new Set())             // false
 * isPlainObject(new WeakMap())         // false
 * isPlainObject(new WeakSet())         // false
 * isPlainObject(new Error())           // false
 * isPlainObject(Promise.resolve())     // false
 * 
 * // Not plain objects: class instances
 * class Person {
 *   constructor(public name: string) {}
 * }
 * isPlainObject(new Person("Alice"))   // false
 * 
 * class EmptyClass {}
 * isPlainObject(new EmptyClass())      // false
 * 
 * // Object.create variations
 * isPlainObject(Object.create({}))     // false (not Object.prototype)
 * isPlainObject(Object.create(Object.prototype)) // true
 * isPlainObject(Object.create(null))   // true (null prototype is plain)
 * 
 * // Deep merge safety check
 * function canDeepMerge(value: unknown): boolean {
 *   return isPlainObject(value) || Array.isArray(value)
 * }
 * 
 * function deepMerge(target: any, source: any): any {
 *   if (!isPlainObject(target) || !isPlainObject(source)) {
 *     return source
 *   }
 *   
 *   const result = { ...target }
 *   for (const key in source) {
 *     if (isPlainObject(source[key]) && isPlainObject(target[key])) {
 *       result[key] = deepMerge(target[key], source[key])
 *     } else {
 *       result[key] = source[key]
 *     }
 *   }
 *   return result
 * }
 * 
 * deepMerge(
 *   { a: 1, b: { c: 2 } },
 *   { b: { d: 3 }, e: 4 }
 * )
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * 
 * // Configuration validation
 * interface Config {
 *   [key: string]: unknown
 * }
 * 
 * function validateConfig(value: unknown): value is Config {
 *   return isPlainObject(value)
 * }
 * 
 * validateConfig({ port: 3000, host: "localhost" })  // true
 * validateConfig(new URL("http://example.com"))      // false
 * validateConfig([])                                 // false
 * 
 * // JSON serialization safety
 * function isSafeToStringify(value: unknown): boolean {
 *   if (value === null || typeof value !== "object") {
 *     return true  // Primitives are safe
 *   }
 *   
 *   if (Array.isArray(value)) {
 *     return value.every(isSafeToStringify)
 *   }
 *   
 *   if (isPlainObject(value)) {
 *     return Object.values(value).every(isSafeToStringify)
 *   }
 *   
 *   // Non-plain objects might have issues
 *   return false
 * }
 * 
 * isSafeToStringify({ a: 1, b: [2, 3] })            // true
 * isSafeToStringify({ a: new Date() })              // false
 * isSafeToStringify({ a: () => {} })                // false
 * 
 * // API payload validation
 * function isValidApiPayload(data: unknown): boolean {
 *   if (!isPlainObject(data)) return false
 *   
 *   // Check all values are serializable
 *   for (const value of Object.values(data)) {
 *     if (typeof value === "function") return false
 *     if (typeof value === "symbol") return false
 *     if (typeof value === "undefined") return false
 *   }
 *   
 *   return true
 * }
 * 
 * isValidApiPayload({ name: "Alice", age: 30 })     // true
 * isValidApiPayload({ fn: () => {} })               // false
 * isValidApiPayload(new FormData())                 // false
 * 
 * // Redux action checking
 * interface Action {
 *   type: string
 *   payload?: unknown
 * }
 * 
 * function isAction(value: unknown): value is Action {
 *   return isPlainObject(value) && 
 *          "type" in value &&
 *          typeof (value as any).type === "string"
 * }
 * 
 * isAction({ type: "INCREMENT" })                   // true
 * isAction({ type: "SET_USER", payload: {} })       // true
 * isAction(new Event("click"))                      // false
 * 
 * // Object cloning
 * function clonePlainObject<T>(value: T): T {
 *   if (!isPlainObject(value)) {
 *     throw new Error("Can only clone plain objects")
 *   }
 *   
 *   return JSON.parse(JSON.stringify(value))
 * }
 * 
 * const original = { a: 1, b: { c: 2 } }
 * const cloned = clonePlainObject(original)
 * // Deep clone of the object
 * 
 * // React props validation
 * function areValidProps(props: unknown): boolean {
 *   if (!isPlainObject(props)) return false
 *   
 *   // Check for invalid prop types
 *   for (const [key, value] of Object.entries(props)) {
 *     if (key.startsWith("on") && typeof value !== "function") {
 *       return false  // Event handlers must be functions
 *     }
 *   }
 *   
 *   return true
 * }
 * 
 * areValidProps({ onClick: () => {}, title: "Test" }) // true
 * areValidProps({ onClick: "not a function" })        // false
 * areValidProps([])                                   // false
 * 
 * // GraphQL variables validation
 * function validateGraphQLVariables(variables: unknown): boolean {
 *   if (!isPlainObject(variables)) return false
 *   
 *   // GraphQL variables must be JSON-serializable
 *   try {
 *     JSON.stringify(variables)
 *     return true
 *   } catch {
 *     return false
 *   }
 * }
 * 
 * // Object vs Map comparison
 * function toPlainObject(value: unknown): object | null {
 *   if (isPlainObject(value)) return value
 *   
 *   if (value instanceof Map) {
 *     const obj: any = {}
 *     for (const [key, val] of value) {
 *       if (typeof key === "string" || typeof key === "symbol") {
 *         obj[key] = val
 *       }
 *     }
 *     return obj
 *   }
 *   
 *   return null
 * }
 * 
 * toPlainObject({ a: 1 })                           // { a: 1 }
 * toPlainObject(new Map([["a", 1]]))                // { a: 1 }
 * toPlainObject([])                                 // null
 * 
 * // Prototype chain inspection
 * function getPrototypeChain(value: unknown): string {
 *   if (!isPlainObject(value)) return "not a plain object"
 *   
 *   const proto = Object.getPrototypeOf(value)
 *   if (proto === null) return "null prototype"
 *   if (proto === Object.prototype) return "Object.prototype"
 *   return "custom prototype"
 * }
 * 
 * getPrototypeChain({})                             // "Object.prototype"
 * getPrototypeChain(Object.create(null))            // "null prototype"
 * getPrototypeChain(new Date())                     // "not a plain object"
 * 
 * // Form data to plain object
 * function formDataToPlainObject(formData: FormData): object {
 *   const result: any = {}
 *   for (const [key, value] of formData.entries()) {
 *     result[key] = value
 *   }
 *   return result
 * }
 * 
 * // Environment variables filtering
 * function getPlainEnvVars(env: NodeJS.ProcessEnv): object {
 *   const result: any = {}
 *   for (const [key, value] of Object.entries(env)) {
 *     if (typeof value === "string") {
 *       result[key] = value
 *     }
 *   }
 *   return result
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Specific - Only true for plain objects, not other object types
 * @property Prototype-aware - Checks prototype chain correctly
 * @property JSON-friendly - Plain objects are typically JSON-serializable
 */
const isPlainObject = (value: unknown): boolean => {
	// Check if it's an object type and not null
	if (typeof value !== "object" || value === null) {
		return false
	}
	
	// Get the prototype
	const proto = Object.getPrototypeOf(value)
	
	// Plain objects have either Object.prototype or null as prototype
	return proto === null || proto === Object.prototype
}

export default isPlainObject