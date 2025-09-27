import isEmpty from "../../array/isEmpty/index.ts"

//++ Executes async functions concurrently
const parallel = <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<Array<T>> => {
	// Handle empty array
	if (isEmpty(tasks)) {
		return Promise.resolve([] as Array<T>)
	}

	// Execute all tasks concurrently
	// Map each function to its invocation, creating promises
	const promises = tasks.map((task) => task())

	// Wait for all promises to resolve
	return Promise.all(promises)
}

export default parallel

//?? [GOTCHA] Fails fast - if any function rejects, the entire operation rejects immediately
//?? [EXAMPLE] `await parallel([async () => fetch("/api/users"), async () => fetch("/api/posts")])`
//?? [EXAMPLE] `await parallel([]) // []`
/*??
 | [EXAMPLE]
 | ```ts
 | // Basic parallel execution
 | const results = await parallel([
 |   async () => fetch("/api/users").then(r => r.json()),
 |   async () => fetch("/api/posts").then(r => r.json()),
 |   async () => fetch("/api/comments").then(r => r.json())
 | ])
 | // All three requests run concurrently
 | console.log(results) // [users, posts, comments]
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Error handling - fails fast on first rejection
 | try {
 |   await parallel([
 |     async () => delay(100)("first"),
 |     async () => { throw new Error("Failed!") },
 |     async () => delay(200)("third")
 |   ])
 | } catch (err) {
 |   console.error(err.message) // "Failed!"
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Database queries in parallel
 | const [user, posts, comments] = await parallel([
 |   async () => db.users.findById(userId),
 |   async () => db.posts.findByUserId(userId),
 |   async () => db.comments.findByUserId(userId)
 | ])
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // File operations in parallel
 | const processFiles = async (paths: Array<string>) => {
 |   const tasks = paths.map(path =>
 |     async () => readFile(path).then(processContent)
 |   )
 |   return parallel(tasks)
 | }
 | ```
 */
