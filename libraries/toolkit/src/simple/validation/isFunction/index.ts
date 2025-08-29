/**
 * Type guard that checks if a value is a function
 *
 * Determines whether a value is callable as a function using the typeof operator.
 * This includes regular functions, arrow functions, async functions, generator functions,
 * class constructors, and built-in functions. In TypeScript, this narrows the type to
 * Function, enabling safe invocation and method access.
 *
 * Function detection:
 * - Regular functions: function declarations and expressions
 * - Arrow functions: () => {} syntax
 * - Async functions: async/await functions
 * - Generator functions: function* syntax
 * - Class constructors: class definitions
 * - Built-in functions: Array.isArray, Object.keys, etc.
 * - Methods: object methods and prototype methods
 *
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 * @example
 * ```typescript
 * // Function types
 * isFunction(function() {})            // true
 * isFunction(() => {})                 // true
 * isFunction(async () => {})           // true
 * isFunction(function* () {})          // true
 * isFunction(class MyClass {})         // true
 *
 * // Built-in functions  
 * isFunction(Array.isArray)            // true
 * isFunction(Object.keys)              // true
 * isFunction([].push)                  // true
 *
 * // Not functions
 * isFunction(null)                     // false
 * isFunction(42)                       // false
 * isFunction("function")               // false
 * isFunction({})                       // false
 * isFunction([])                       // false
 *
 * // Type narrowing
 * function invokeIfFunction(value: unknown, ...args: Array<unknown>): unknown {
 *   if (isFunction(value)) {
 *     return value(...args)  // TypeScript knows value is Function
 *   }
 *   return undefined
 * }
 * invokeIfFunction(() => "hello")      // "hello"
 * invokeIfFunction("not a function")   // undefined
 *
 * // Filtering functions
 * const mixed = [() => {}, "string", 42, Math.sqrt, null]
 * const functions = mixed.filter(isFunction)  // [() => {}, Math.sqrt]
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isFunction = (value: unknown): value is Function =>
	typeof value === "function"

export default isFunction
