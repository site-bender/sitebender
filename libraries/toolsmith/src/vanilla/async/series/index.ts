//++ Executes async functions sequentially
const series = async <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<Array<T>> => {
	// Handle empty array
	if (tasks.length === 0) {
		return []
	}

	// Execute tasks sequentially using reduce
	const results = await tasks.reduce(
		async (accPromise, task) => {
			const acc = await accPromise
			const result = await task()
			return [...acc, result]
		},
		Promise.resolve([] as Array<T>),
	)

	return results
}

export default series

//?? [GOTCHA] Stops immediately on first rejection - no subsequent functions run
//?? [EXAMPLE] `await series([async () => 1, async () => 2, async () => 3]) // [1, 2, 3]`
//?? [EXAMPLE] `series([]) // Returns []`
//?? [EXAMPLE] `series([async () => "single"]) // Returns ["single"]`
/*??
 | [EXAMPLE]
 | ```ts
 | // Basic sequential execution
 | const results = await series([
 |   async () => { console.log("First"); return 1 },
 |   async () => { console.log("Second"); return 2 },
 |   async () => { console.log("Third"); return 3 }
 | ])
 | // Output: "First", "Second", "Third" (in order)
 | console.log(results) // [1, 2, 3]
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Database migrations in order
 | const runMigrations = async () => {
 |   return series([
 |     async () => db.exec("CREATE TABLE users..."),
 |     async () => db.exec("CREATE TABLE posts... REFERENCES users..."),
 |     async () => db.exec("CREATE INDEX...")
 |   ])
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Build pipeline
 | const buildProject = async () => {
 |   return series([
 |     async () => cleanBuildDir(),
 |     async () => compileTypeScript(),
 |     async () => bundleAssets(),
 |     async () => runTests()
 |   ])
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Error handling - stops on first error
 | try {
 |   await series([
 |     async () => "first",
 |     async () => { throw new Error("Failed!") },
 |     async () => "never runs"
 |   ])
 | } catch (err) {
 |   console.error(err.message) // "Failed!"
 | }
 | ```
 */
