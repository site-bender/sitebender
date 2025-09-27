import isEmpty from "../../array/isEmpty/index.ts"

//++ Pipes async functions, passing results through a chain
const waterfall =
	<I, O = I>(initial: I) =>
	async <T extends ReadonlyArray<(arg: Awaited<I>) => Promise<unknown>>>(
		tasks: T,
	): Promise<
		T extends ReadonlyArray<(...args: unknown[]) => Promise<infer R>> ? R
			: Awaited<I>
	> => {
		// Handle empty array - return initial value
		if (isEmpty(tasks)) {
			return initial as unknown as T extends ReadonlyArray<
				(...args: unknown[]) => Promise<infer R>
			> ? R
				: Awaited<I>
		}

		// Execute tasks in sequence using typed reduce
		const result = await tasks.reduce<Promise<unknown>>(
			async (prevPromise, task) => {
				const prev = await prevPromise as Awaited<I>
				return task(prev)
			},
			Promise.resolve(initial as Awaited<I>),
		)

		return result as T extends ReadonlyArray<
			(...args: unknown[]) => Promise<infer R>
		> ? R
			: Awaited<I>
	}

export default waterfall

//?? [EXAMPLE] `await waterfall(5)([async (n) => n * 2, async (n) => n + 3]) // 13`
//?? [EXAMPLE] `waterfall("initial")([]) // Returns "initial"`
//?? [EXAMPLE] `waterfall(null)([async (x) => x]) // Returns null`
/*??
 | [EXAMPLE]
 | ```ts
 | // Basic waterfall pipeline
 | const result = await waterfall(5)([
 |   async (n) => n * 2,      // 10
 |   async (n) => n + 3,       // 13
 |   async (n) => n.toString() // "13"
 | ])
 | console.log(result) // "13"
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Data processing pipeline
 | const processUser = await waterfall({ id: 123 })([
 |   async (user) => db.users.findById(user.id),
 |   async (user) => ({ ...user, posts: await db.posts.findByUserId(user.id) }),
 |   async (data) => ({ ...data, count: data.posts.length })
 | ])
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // File processing pipeline
 | const processFile = waterfall("/path/to/file.txt")([
 |   async (path) => readFile(path),
 |   async (content) => JSON.parse(content),
 |   async (data) => validateData(data),
 |   async (valid) => transformData(valid),
 |   async (transformed) => db.save(transformed)
 | ])
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Error handling - stops on first error
 | try {
 |   await waterfall(10)([
 |     async (n) => n * 2,
 |     async () => { throw new Error("Failed!") },
 |     async (n) => n + 1   // Never runs
 |   ])
 | } catch (err) {
 |   console.error(err.message) // "Failed!"
 | }
 | ```
 */
