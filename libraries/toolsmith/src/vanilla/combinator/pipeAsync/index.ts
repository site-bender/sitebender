//++ Async version of pipe for Promise-returning functions, composing async functions left-to-right with automatic promise handling
//++ Async version of pipe for Promise-returning functions, composing async functions left-to-right with automatic promise handling
const pipeAsync = <T, R = unknown>(
	fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>> = [],
) =>
(input: T): Promise<R> =>
	fns.reduce<Promise<unknown>>(
		(acc, fn) => acc.then((val) => fn(val)),
		Promise.resolve(input as unknown),
	) as Promise<R>

//?? [EXAMPLE] await getUserWithTimestamp(123) // { id: 123, name: "Alice", fetchedAt: ... }
//?? [EXAMPLE] await process(5) // 20
/*??
 | [EXAMPLE]
 | ```typescript
 | // Chain async operations
 | const fetchUser = async (id: number) => ({ id, name: "Alice" })
 | const addTimestamp = async (user: any) => ({
 |   ...user,
 |   fetchedAt: Date.now()
 | })
 |
 | const getUserWithTimestamp = pipeAsync([
 |   fetchUser,
 |   addTimestamp
 | ])
 |
 | await getUserWithTimestamp(123) // { id: 123, name: "Alice", fetchedAt: ... }
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Mix sync and async functions
 | const process = pipeAsync([
 |   async (x: number) => x * 2,
 |   (x: number) => x + 10
 | ])
 |
 | await process(5) // 20
 | ```
 |
 | [GOTCHA]
 | Each function receives the resolved value from the previous promise.
 | Sync functions are automatically converted to async.
 */

export default pipeAsync
