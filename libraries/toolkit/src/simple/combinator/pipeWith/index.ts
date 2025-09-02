/**
 * Like pipe but uses a custom composition function
 * Allows custom logic for combining function results
 *
 * @pure
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
 *   (x: number) => x + 10
 * ])
 *
 * debugPipe(5) // Logs: "5 -> 10", "10 -> 20", returns 20
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
(input: T): R => fns.reduce((acc, fn) => composer(fn, acc), input as any)

export default pipeWith
