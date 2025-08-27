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
 * // Regular functions
 * isFunction(function() {})            // true
 * isFunction(function named() {})      // true
 * const fn = function() {}
 * isFunction(fn)                       // true
 *
 * // Arrow functions
 * isFunction(() => {})                 // true
 * isFunction(() => 42)                 // true
 * isFunction((a: number) => a * 2)     // true
 *
 * // Async functions
 * isFunction(async () => {})           // true
 * isFunction(async function() {})      // true
 * async function asyncFn() {}
 * isFunction(asyncFn)                  // true
 *
 * // Generator functions
 * isFunction(function* () {})          // true
 * function* generator() { yield 1 }
 * isFunction(generator)                // true
 *
 * // Class constructors
 * isFunction(class MyClass {})         // true
 * class Person { name: string }
 * isFunction(Person)                   // true
 * isFunction(new Person())             // false (instance, not constructor)
 *
 * // Built-in functions
 * isFunction(Array.isArray)            // true
 * isFunction(Object.keys)              // true
 * isFunction(JSON.parse)               // true
 * isFunction(Math.sqrt)                // true
 * isFunction(Number.parseInt)          // true
 * isFunction(String.fromCharCode)      // true
 *
 * // Methods
 * const obj = { method() {} }
 * isFunction(obj.method)               // true
 * isFunction([].push)                  // true
 * isFunction("".charAt)                // true
 *
 * // Not functions
 * isFunction(null)                     // false
 * isFunction(undefined)                // false
 * isFunction(42)                       // false
 * isFunction("function")               // false
 * isFunction(true)                     // false
 * isFunction({})                       // false
 * isFunction([])                       // false
 * isFunction(/regex/)                  // false
 * isFunction(new Date())               // false
 *
 * // Type narrowing in TypeScript
 * function invokeIfFunction(
 *   value: unknown,
 *   ...args: Array<unknown>
 * ): unknown {
 *   if (isFunction(value)) {
 *     // TypeScript knows value is Function here
 *     return value(...args)
 *   }
 *   return undefined
 * }
 *
 * invokeIfFunction(() => "hello")      // "hello"
 * invokeIfFunction((a, b) => a + b, 2, 3)  // 5
 * invokeIfFunction("not a function")   // undefined
 *
 * // Filtering functions from mixed array
 * const mixed = [
 *   () => {},
 *   "string",
 *   42,
 *   function named() {},
 *   null,
 *   Math.sqrt,
 *   { method: () => {} }
 * ]
 *
 * const functions = mixed.filter(isFunction)
 * // [() => {}, function named() {}, Math.sqrt]
 *
 * // Event handler validation
 * interface EventHandlers {
 *   onClick?: unknown
 *   onHover?: unknown
 *   onLoad?: unknown
 * }
 *
 * function validateHandlers(handlers: EventHandlers): boolean {
 *   return Object.values(handlers).every(handler =>
 *     handler === undefined || isFunction(handler)
 *   )
 * }
 *
 * validateHandlers({
 *   onClick: () => console.log("clicked"),
 *   onHover: undefined
 * })                                   // true
 *
 * validateHandlers({
 *   onClick: "not a function"
 * })                                   // false
 *
 * // Callback wrapper
 * function safeCallback<T extends Array<unknown>>(
 *   callback: unknown,
 *   defaultReturn?: unknown
 * ): (...args: T) => unknown {
 *   if (isFunction(callback)) {
 *     return callback as (...args: T) => unknown
 *   }
 *   return () => defaultReturn
 * }
 *
 * const cb1 = safeCallback((x: number) => x * 2)
 * cb1(5)                               // 10
 *
 * const cb2 = safeCallback("not a function", 0)
 * cb2(5)                               // 0
 *
 * // Method detection
 * function hasMethod(obj: unknown, methodName: string): boolean {
 *   if (obj == null) return false
 *   return isFunction((obj as any)[methodName])
 * }
 *
 * hasMethod([], "push")                // true
 * hasMethod([], "invalid")             // false
 * hasMethod({}, "toString")            // true
 * hasMethod(null, "toString")          // false
 *
 * // Composition helper
 * function compose(...fns: Array<unknown>): Function | null {
 *   const functions = fns.filter(isFunction) as Array<Function>
 *   if (functions.length === 0) return null
 *
 *   return functions.reduce((f, g) =>
 *     (...args: Array<unknown>) => f(g(...args))
 *   )
 * }
 *
 * const add1 = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const composed = compose(add1, double)
 * composed?.(5)                        // 11 (5 * 2 + 1)
 *
 * // Memoization wrapper
 * function memoize(fn: unknown): Function {
 *   if (!isFunction(fn)) {
 *     throw new Error("Argument must be a function")
 *   }
 *
 *   const cache = new Map()
 *   return (...args: Array<unknown>) => {
 *     const key = JSON.stringify(args)
 *     if (!cache.has(key)) {
 *       cache.set(key, fn(...args))
 *     }
 *     return cache.get(key)
 *   }
 * }
 *
 * // Plugin system
 * interface Plugin {
 *   name: string
 *   install: unknown
 * }
 *
 * function loadPlugin(plugin: Plugin): void {
 *   if (!isFunction(plugin.install)) {
 *     throw new Error(`Plugin ${plugin.name} must have install function`)
 *   }
 *   plugin.install()
 * }
 *
 * // React component detection
 * function isComponent(value: unknown): boolean {
 *   return isFunction(value) ||
 *          (typeof value === "object" &&
 *           value !== null &&
 *           isFunction((value as any).render))
 * }
 *
 * // Promise executor validation
 * function createPromise(executor: unknown): Promise<unknown> {
 *   if (!isFunction(executor)) {
 *     return Promise.reject(new Error("Executor must be a function"))
 *   }
 *   return new Promise(executor as any)
 * }
 *
 * // Debounce implementation
 * function debounce(fn: unknown, delay: number): Function {
 *   if (!isFunction(fn)) {
 *     return () => {}
 *   }
 *
 *   let timeoutId: number
 *   return (...args: Array<unknown>) => {
 *     clearTimeout(timeoutId)
 *     timeoutId = setTimeout(() => fn(...args), delay)
 *   }
 * }
 *
 * // Constructor detection
 * function isConstructor(value: unknown): boolean {
 *   if (!isFunction(value)) return false
 *
 *   try {
 *     new (value as any)()
 *     return true
 *   } catch {
 *     return false
 *   }
 * }
 *
 * isConstructor(class {})              // true
 * isConstructor(function() {})         // true
 * isConstructor(() => {})              // false (arrow functions can't be constructors)
 * isConstructor(Math.sqrt)             // false
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isFunction = (value: unknown): value is Function =>
	typeof value === "function"

export default isFunction
