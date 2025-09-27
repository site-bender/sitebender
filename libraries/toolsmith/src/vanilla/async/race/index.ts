import isEmpty from "../../array/isEmpty/index.ts"

//++ Races async functions and returns the first to complete
const race = <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<T> => {
	// Handle empty array - this would never resolve
	if (isEmpty(tasks)) {
		throw new Error(
			"Cannot race an empty array of tasks - the Promise would never settle",
		)
	}

	// Handle single task
	if (tasks.length === 1) {
		return tasks[0]()
	}

	// Execute all tasks concurrently and race them
	const promises = tasks.map((task) => task())
	return Promise.race(promises)
}

export default race

//?? [EXAMPLE] `await race([async () => delay(100)("fast"), async () => delay(300)("slow")]) // "fast"`
//?? [EXAMPLE] `race([async () => "single"]) // Returns "single"`
//?? [GOTCHA] `race([]) // Throws - would never settle`
/*??
 | [EXAMPLE]
 | ```ts
 | // Timeout pattern
 | const fetchWithTimeout = async (url: string, timeoutMs = 5000) => {
 |   return race([
 |     async () => fetch(url).then(r => r.json()),
 |     async () => delayReject(timeoutMs)(new Error("Timeout"))
 |   ])
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Fallback pattern - try multiple sources
 | const fetchFromFastest = async () => {
 |   return race([
 |     async () => fetch("https://primary.com/data"),
 |     async () => fetch("https://backup.com/data")
 |   ])
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Load balancing - use fastest server
 | const servers = ["server1.com", "server2.com", "server3.com"]
 | const tasks = servers.map(server =>
 |   async () => fetch(`https://${server}/api`)
 | )
 | const fastest = await race(tasks)
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // First rejection wins if it's fastest
 | try {
 |   await race([
 |     async () => { throw new Error("Instant fail") },
 |     async () => delay(100)("too late")
 |   ])
 | } catch (err) {
 |   console.error(err.message) // "Instant fail"
 | }
 | ```
 */
