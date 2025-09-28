//++ Asynchronous function composition utility that composes async functions right-to-left (mathematical composition)
const composeAsync = <T, R = unknown>(
 	fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>> = [],
 ) =>
 (input: T): Promise<R> =>
 	fns.reduceRight<Promise<unknown>>(
 		(resultPromise, fn) => resultPromise.then((val) => fn(val)),
 		Promise.resolve(input as unknown),
 	) as Promise<R>

//?? [EXAMPLE] await composed(5) // "Score: 50"
//?? [EXAMPLE] await identity("hello") // "hello"
//?? [EXAMPLE] await transform("  hello  ") // "HELLO"
/*??
 | [EXAMPLE]
 | ```typescript
 | const fetchUser = async (id: number) => ({ id, name: `User${id}` })
 | const getScore = async (user: { id: number }) => ({ ...user, score: user.id * 10 })
 | const formatResult = async (data: { score: number }) => `Score: ${data.score}`
 |
 | const composed = composeAsync([formatResult, getScore, fetchUser])
 | await composed(5) // "Score: 50"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Empty array returns identity function
 | const identity = composeAsync([])
 | await identity("hello") // "hello"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // String processing pipeline
 | const trim = async (s: string) => s.trim()
 | const upper = async (s: string) => s.toUpperCase()
 | const transform = composeAsync([upper, trim])
 | await transform("  hello  ") // "HELLO"
 | ```
 |
 | [GOTCHA]
 | TypeScript cannot properly type variadic async compose without extensive overloads.
 | The 'any' type here is justified for the same reasons as the sync compose function.
 */

export default composeAsync
