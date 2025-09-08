type AnyFunction = (...args: ReadonlyArray<unknown>) => unknown

//++ Type guard that checks if a value is callable as a function
export default function isFunction(value: unknown): value is AnyFunction {
	return typeof value === "function"
}

//?? [EXAMPLE] isFunction(function() {}) // true
//?? [EXAMPLE] isFunction(() => {}) // true
//?? [EXAMPLE] isFunction(async () => {}) // true
//?? [EXAMPLE] isFunction(function* () {}) // true
//?? [EXAMPLE] isFunction(class MyClass {}) // true
//?? [EXAMPLE] isFunction(Array.isArray) // true
//?? [EXAMPLE] isFunction(Object.keys) // true
//?? [EXAMPLE] isFunction([].push) // true
//?? [EXAMPLE] isFunction(null) // false
//?? [EXAMPLE] isFunction(42) // false
//?? [EXAMPLE] isFunction("function") // false
//?? [EXAMPLE] isFunction({}) // false
//?? [EXAMPLE] isFunction([]) // false
/*??
 * [EXAMPLE]
 * function invokeIfFunction(value: unknown, ...args: Array<unknown>): unknown {
 *   if (isFunction(value)) {
 *     return value(...args)  // TypeScript knows value is Function
 *   }
 *   return undefined
 * }
 * invokeIfFunction(() => "hello")      // "hello"
 * invokeIfFunction("not a function")   // undefined
 *
 * const mixed = [() => {}, "string", 42, Math.sqrt, null]
 * const functions = mixed.filter(isFunction)  // [() => {}, Math.sqrt]
 *
 * [PRO] Detects all callable types: arrow, async, generator, class constructors
 * [GOTCHA] Methods become regular functions when detached from their objects
 * [GOTCHA] Classes return true (they're constructor functions)
 */
