/**
 * Type guard that checks if a value is a Promise
 * 
 * Determines whether a value is a Promise instance or a thenable object
 * (an object with a then method). This includes native Promises, promise-like
 * objects from libraries, and async function return values. The check uses
 * both instanceof and duck-typing to catch Promise-like objects from different
 * contexts or libraries.
 * 
 * Promise detection:
 * - Native Promise instances
 * - Async function return values
 * - Promise.resolve() and Promise.reject() results
 * - Thenable objects (objects with a then method)
 * - Promise-like objects from other contexts/libraries
 * - Not included: async functions themselves (before invocation)
 * 
 * @param value - The value to check
 * @returns True if the value is a Promise or thenable, false otherwise
 * @example
 * ```typescript
 * // Native Promises
 * isPromise(Promise.resolve(42))       // true
 * isPromise(Promise.reject("error"))   // true
 * isPromise(new Promise(() => {}))     // true
 * 
 * // Async function results
 * async function fetchData() {
 *   return "data"
 * }
 * isPromise(fetchData())               // true
 * isPromise(fetchData)                 // false (function itself)
 * 
 * // Promise methods
 * isPromise(Promise.all([]))           // true
 * isPromise(Promise.race([]))          // true
 * isPromise(Promise.allSettled([]))    // true
 * isPromise(Promise.any([]))           // true
 * 
 * // Thenable objects (duck typing)
 * const thenable = {
 *   then: (resolve: Function) => resolve(42)
 * }
 * isPromise(thenable)                  // true
 * 
 * const customPromise = {
 *   then: () => {},
 *   catch: () => {},
 *   finally: () => {}
 * }
 * isPromise(customPromise)             // true
 * 
 * // Not Promises
 * isPromise(null)                      // false
 * isPromise(undefined)                 // false
 * isPromise(42)                        // false
 * isPromise("promise")                 // false
 * isPromise(true)                      // false
 * isPromise([])                        // false
 * isPromise({})                        // false
 * isPromise(() => {})                  // false
 * isPromise(async () => {})            // false (async function, not its result)
 * 
 * // Objects without then method
 * isPromise({ catch: () => {} })       // false (no then)
 * isPromise({ value: 42 })             // false
 * 
 * // Type narrowing in TypeScript
 * async function handleValue(value: unknown): Promise<string> {
 *   if (isPromise(value)) {
 *     // TypeScript knows value is Promise-like
 *     try {
 *       const result = await value
 *       return String(result)
 *     } catch (error) {
 *       return "Error: " + error
 *     }
 *   }
 *   return String(value)
 * }
 * 
 * handleValue(Promise.resolve(42))     // "42"
 * handleValue(42)                      // "42"
 * handleValue(Promise.reject("fail"))  // "Error: fail"
 * 
 * // Filtering promises from mixed array
 * const mixed = [
 *   Promise.resolve(1),
 *   2,
 *   async () => 3,
 *   Promise.reject(4).catch(() => 4),
 *   { then: () => 5 },
 *   null,
 *   fetch("/api/data")
 * ]
 * 
 * const promises = mixed.filter(isPromise)
 * // [Promise<1>, Promise<4>, thenable, Promise<Response>]
 * 
 * // Promise wrapping
 * function ensurePromise<T>(value: T | Promise<T>): Promise<T> {
 *   if (isPromise(value)) {
 *     return value as Promise<T>
 *   }
 *   return Promise.resolve(value)
 * }
 * 
 * ensurePromise(42)                    // Promise<42>
 * ensurePromise(Promise.resolve(42))   // Promise<42> (same promise)
 * 
 * // Async operation detection
 * function isAsyncOperation(fn: unknown): boolean {
 *   if (typeof fn !== "function") return false
 *   
 *   // Try calling it to see if it returns a promise
 *   try {
 *     const result = (fn as Function)()
 *     return isPromise(result)
 *   } catch {
 *     return false
 *   }
 * }
 * 
 * // Promise.all with mixed values
 * async function waitForAll(values: Array<unknown>): Promise<Array<unknown>> {
 *   const promises = values.map(value => 
 *     isPromise(value) ? value : Promise.resolve(value)
 *   )
 *   return Promise.all(promises)
 * }
 * 
 * waitForAll([
 *   Promise.resolve(1),
 *   2,
 *   Promise.resolve(3)
 * ])
 * // Promise<[1, 2, 3]>
 * 
 * // Error boundary for promises
 * async function safeAwait<T>(
 *   value: unknown,
 *   defaultValue: T
 * ): Promise<T> {
 *   if (!isPromise(value)) {
 *     return value as T
 *   }
 *   
 *   try {
 *     return await value as T
 *   } catch {
 *     return defaultValue
 *   }
 * }
 * 
 * safeAwait(Promise.resolve(42), 0)    // 42
 * safeAwait(Promise.reject("err"), 0)  // 0
 * safeAwait(42, 0)                     // 42
 * 
 * // Timeout wrapper
 * function withTimeout<T>(
 *   value: unknown,
 *   ms: number,
 *   timeoutValue: T
 * ): Promise<T> {
 *   if (!isPromise(value)) {
 *     return Promise.resolve(value as T)
 *   }
 *   
 *   return Promise.race([
 *     value as Promise<T>,
 *     new Promise<T>(resolve => 
 *       setTimeout(() => resolve(timeoutValue), ms)
 *     )
 *   ])
 * }
 * 
 * // React Suspense data fetching
 * function wrapPromise<T>(promise: unknown) {
 *   if (!isPromise(promise)) {
 *     return { read: () => promise }
 *   }
 *   
 *   let status = "pending"
 *   let result: T
 *   let error: unknown
 *   
 *   const suspender = (promise as Promise<T>).then(
 *     r => {
 *       status = "success"
 *       result = r
 *     },
 *     e => {
 *       status = "error"
 *       error = e
 *     }
 *   )
 *   
 *   return {
 *     read() {
 *       if (status === "pending") throw suspender
 *       if (status === "error") throw error
 *       return result
 *     }
 *   }
 * }
 * 
 * // Cache with promise deduplication
 * class PromiseCache {
 *   private cache = new Map<string, unknown>()
 *   
 *   async get(key: string, factory: () => unknown): Promise<unknown> {
 *     const existing = this.cache.get(key)
 *     
 *     if (isPromise(existing)) {
 *       // Wait for in-flight promise
 *       return existing
 *     }
 *     
 *     if (existing !== undefined) {
 *       // Return cached value
 *       return existing
 *     }
 *     
 *     // Start new async operation
 *     const promise = factory()
 *     if (isPromise(promise)) {
 *       this.cache.set(key, promise)
 *       const result = await promise
 *       this.cache.set(key, result)
 *       return result
 *     }
 *     
 *     this.cache.set(key, promise)
 *     return promise
 *   }
 * }
 * 
 * // API client with promise detection
 * class ApiClient {
 *   async request(config: unknown): Promise<unknown> {
 *     if (isPromise(config)) {
 *       // Config is async, wait for it
 *       config = await config
 *     }
 *     
 *     // ... perform request
 *     return fetch("/api", config as RequestInit)
 *   }
 * }
 * 
 * // Observable to Promise conversion
 * function observableToPromise(value: unknown): Promise<unknown> {
 *   if (isPromise(value)) {
 *     return value as Promise<unknown>
 *   }
 *   
 *   if (value && typeof (value as any).subscribe === "function") {
 *     return new Promise((resolve, reject) => {
 *       (value as any).subscribe(resolve, reject)
 *     })
 *   }
 *   
 *   return Promise.resolve(value)
 * }
 * 
 * // Chaining helper
 * function chain<T>(
 *   value: unknown,
 *   ...fns: Array<(v: T) => T | Promise<T>>
 * ): Promise<T> {
 *   return fns.reduce(
 *     (acc, fn) => {
 *       if (isPromise(acc)) {
 *         return (acc as Promise<T>).then(fn)
 *       }
 *       const result = fn(acc as T)
 *       return isPromise(result) ? result : Promise.resolve(result)
 *     },
 *     isPromise(value) ? value : Promise.resolve(value)
 *   ) as Promise<T>
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows types to Promise-like in TypeScript
 * @property Duck-typed - Detects thenable objects, not just Promise instances
 * @property Async-aware - Correctly identifies async function return values
 */
const isPromise = (value: unknown): value is Promise<unknown> => {
	// Check for null/undefined first
	if (value == null) {
		return false
	}
	
	// Check for native Promise (most common case)
	if (value instanceof Promise) {
		return true
	}
	
	// Duck-type check for thenable objects
	return typeof value === "object" && 
	       typeof (value as any).then === "function"
}

export default isPromise