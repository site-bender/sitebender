/**
 * Like pipe but uses a custom composition function
 * Allows custom logic for combining function results
 *
 * @param composer - Function that combines results between steps
 * @param fns - Array of functions to compose
 * @returns Function that pipes with custom composition
 * @example
 * ```typescript
 * // Log between each step
 * const debugComposer = (fn: Function, value: unknown) => {
 *   const result = fn(value)
 *   console.log(`${value} -> ${result}`)
 *   return result
 * }
 *
 * const debugPipe = pipeWith(debugComposer, [
 *   (x: number) => x * 2,
 *   (x: number) => x + 10,
 *   (x: number) => x / 2
 * ])
 *
 * debugPipe(5) // Logs: "5 -> 10", "10 -> 20", "20 -> 10", returns 10
 *
 * // Error handling between steps
 * const safeComposer = (fn: Function, value: unknown) => {
 *   try {
 *     return fn(value)
 *   } catch (e) {
 *     console.error(`Error: ${e.message}`)
 *     return null
 *   }
 * }
 *
 * const safePipe = pipeWith(safeComposer, [
 *   (x: number) => x * 2,
 *   (x: number) => {
 *     if (x > 10) throw new Error("Too large")
 *     return x
 *   },
 *   (x: number | null) => x ? x + 5 : 0
 * ])
 *
 * safePipe(3) // 11 (3 * 2 = 6, 6 + 5 = 11)
 * safePipe(10) // 0 (10 * 2 = 20, error caught, null + 5 = 0)
 *
 * // Async composition
 * const asyncComposer = async (fn: Function, value: unknown) => {
 *   await new Promise(r => setTimeout(r, 100))
 *   return fn(value)
 * }
 *
 * const slowPipe = pipeWith(asyncComposer, [
 *   (x: number) => x + 1,
 *   (x: number) => x * 2
 * ])
 *
 * // Each step waits 100ms
 * await slowPipe(5) // 12 after 200ms
 * ```
 *
 * Note: The composer function receives each function and the current value,
 * allowing you to intercept, modify, or wrap the execution.
 */
// deno-lint-ignore no-explicit-any
const pipeWith = <T, R>(
	composer: (fn: (value: any) => any, value: any) => any,
	fns: ReadonlyArray<(value: any) => any> = [],
) =>
(input: T): R => {
	let result: any = input
	for (const fn of fns) {
		result = composer(fn, result)
	}
	return result
}

export default pipeWith
