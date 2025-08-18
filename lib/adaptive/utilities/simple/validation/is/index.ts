/**
 * Creates a predicate that checks if a value is an instance of a constructor
 * 
 * Uses the instanceof operator to check if an object's prototype chain contains
 * the prototype property of a constructor. This is a curried function for creating
 * reusable type checks. Works with built-in types, classes, and constructor functions.
 * Note that instanceof checks fail across different JavaScript realms (e.g., iframes).
 * 
 * Type checking behavior:
 * - Classes: checks if object is instance of class
 * - Built-ins: works with Date, RegExp, Error, etc.
 * - Arrays: Array.isArray is more reliable than instanceof Array
 * - Primitives: always false (primitives are not instances)
 * - null/undefined: always false
 * - Cross-realm: fails for objects from different contexts
 * 
 * @curried (constructor) => (value) => boolean
 * @param constructor - The constructor function to check against
 * @param value - The value to check
 * @returns True if value instanceof constructor, false otherwise
 * @example
 * ```typescript
 * // Built-in type checks
 * const isDate = is(Date)
 * isDate(new Date())           // true
 * isDate(Date.now())           // false (returns number)
 * isDate("2024-01-01")         // false (string)
 * 
 * const isRegExp = is(RegExp)
 * isRegExp(/abc/)              // true
 * isRegExp(new RegExp("abc"))  // true
 * isRegExp("abc")              // false
 * 
 * const isError = is(Error)
 * isError(new Error("oops"))   // true
 * isError(new TypeError())     // true (TypeError extends Error)
 * isError("error")             // false
 * 
 * // Array checking (note: has cross-realm issues)
 * const isArray = is(Array)
 * isArray([1, 2, 3])           // true
 * isArray(new Array(3))        // true
 * isArray("array")             // false
 * isArray({ length: 0 })       // false
 * 
 * // Custom class checking
 * class User {
 *   constructor(public name: string) {}
 * }
 * 
 * class Admin extends User {
 *   constructor(name: string, public level: number) {
 *     super(name)
 *   }
 * }
 * 
 * const isUser = is(User)
 * const isAdmin = is(Admin)
 * 
 * const user = new User("Alice")
 * const admin = new Admin("Bob", 5)
 * 
 * isUser(user)                // true
 * isUser(admin)               // true (Admin extends User)
 * isAdmin(admin)              // true
 * isAdmin(user)               // false (User is not Admin)
 * isUser({ name: "Charlie" }) // false (plain object)
 * 
 * // Error type checking
 * const isTypeError = is(TypeError)
 * const isRangeError = is(RangeError)
 * 
 * try {
 *   null.toString()
 * } catch (e) {
 *   isTypeError(e)           // true
 *   isRangeError(e)          // false
 * }
 * 
 * // Promise checking
 * const isPromise = is(Promise)
 * isPromise(Promise.resolve(42))        // true
 * isPromise(new Promise(() => {}))      // true
 * isPromise(async () => {})             // false (async function)
 * isPromise((async () => {})())         // true (async function call)
 * 
 * // Map and Set checking
 * const isMap = is(Map)
 * const isSet = is(Set)
 * 
 * isMap(new Map())            // true
 * isMap(new WeakMap())        // false (different type)
 * isSet(new Set([1, 2, 3]))   // true
 * isSet([1, 2, 3])            // false (array)
 * 
 * // Typed arrays
 * const isUint8Array = is(Uint8Array)
 * const isArrayBuffer = is(ArrayBuffer)
 * 
 * isUint8Array(new Uint8Array(10))      // true
 * isUint8Array(new Uint16Array(10))     // false
 * isArrayBuffer(new ArrayBuffer(10))    // true
 * isArrayBuffer(new Uint8Array(10))     // false
 * 
 * // DOM element checking (browser environment)
 * const isHTMLElement = is(HTMLElement)
 * const isHTMLDivElement = is(HTMLDivElement)
 * 
 * const div = document.createElement("div")
 * const span = document.createElement("span")
 * 
 * isHTMLElement(div)         // true
 * isHTMLElement(span)        // true
 * isHTMLDivElement(div)      // true
 * isHTMLDivElement(span)     // false
 * 
 * // Node.js Buffer (Node environment)
 * const isBuffer = is(Buffer)
 * isBuffer(Buffer.from("hello"))        // true
 * isBuffer(new Uint8Array(10))          // false
 * 
 * // Filtering by type
 * const mixed = [
 *   new Date(),
 *   "string",
 *   42,
 *   new Error("oops"),
 *   /regex/,
 *   { plain: "object" }
 * ]
 * 
 * const errors = mixed.filter(is(Error))
 * // [Error: oops]
 * 
 * const dates = mixed.filter(is(Date))
 * // [Date object]
 * 
 * // Type guards with instanceof
 * function processValue(value: unknown) {
 *   if (is(Date)(value)) {
 *     // TypeScript knows value is Date here
 *     return value.toISOString()
 *   }
 *   if (is(Error)(value)) {
 *     // TypeScript knows value is Error here
 *     return value.message
 *   }
 *   if (is(RegExp)(value)) {
 *     // TypeScript knows value is RegExp here
 *     return value.source
 *   }
 *   return String(value)
 * }
 * 
 * // Checking inheritance chain
 * class Animal {}
 * class Dog extends Animal {}
 * class Poodle extends Dog {}
 * 
 * const poodle = new Poodle()
 * 
 * is(Poodle)(poodle)         // true
 * is(Dog)(poodle)            // true
 * is(Animal)(poodle)         // true
 * is(Object)(poodle)         // true
 * 
 * // Primitives always return false
 * is(String)("hello")        // false (primitive string)
 * is(String)(new String("hello")) // true (String object)
 * is(Number)(42)             // false (primitive number)
 * is(Number)(new Number(42)) // true (Number object)
 * is(Boolean)(true)          // false (primitive boolean)
 * is(Boolean)(new Boolean(true)) // true (Boolean object)
 * 
 * // null and undefined always false
 * is(Object)(null)           // false
 * is(Object)(undefined)      // false
 * ```
 * @property Pure - Always returns the same result for the same inputs
 * @property Curried - Can be partially applied for reusable type checks
 * @property Prototype-based - Checks prototype chain, not structural shape
 * @property Realm-sensitive - May fail across different JavaScript contexts
 */
const is = <T>(constructor: new (...args: Array<any>) => T) => 
	(value: unknown): value is T => 
		value instanceof constructor

export default is