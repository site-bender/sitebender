//++ Like pipe but uses a custom composition function, allowing custom logic for combining function results
//++ Like pipe but uses a custom composition function, allowing custom logic for combining function results
const pipeWith = <T, R>(
	composer: (fn: (value: unknown) => unknown, value: unknown) => unknown,
	fns: ReadonlyArray<(value: unknown) => unknown> = [],
) =>
(input: T): R =>
	fns.reduce((acc, fn) => composer(fn, acc), input as unknown) as R

//?? [EXAMPLE] debugPipe(5) // Logs: "5 -> 10", "10 -> 20", returns 20
/*??
 | [EXAMPLE]
 | ```typescript
 | // Log between each step
 | const debugComposer = (fn: Function, value: unknown) => {
 |   const result = fn(value)
 |   console.log(`${value} -> ${result}`)
 |   return result
 | }
 |
 | const debugPipe = pipeWith(debugComposer, [
 |   (x: number) => x * 2,
 |   (x: number) => x + 10
 | ])
 |
 | debugPipe(5) // Logs: "5 -> 10", "10 -> 20", returns 20
 | ```
 |
 | [GOTCHA]
 | The composer function receives each function and the current value,
 | allowing you to intercept, modify, or wrap the execution.
 */

export default pipeWith
