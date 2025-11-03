import isEmpty from "../../array/isEmpty/index.ts"

//++ Limits concurrent async function execution
export default function parallelLimit(limit: number) {
	return async function runWithLimit<T>(
		tasks: ReadonlyArray<() => Promise<T>>,
	): Promise<Array<T>> {
		// Validate limit
		if (limit <= 0 || !Number.isFinite(limit)) {
			throw new Error(
				`Invalid limit: ${limit}. Must be a positive finite number.`,
			)
		}

		// Handle empty array
		if (isEmpty(tasks)) {
			return []
		}

		// If limit is greater than tasks, just run all in parallel
		if (limit >= tasks.length) {
			return Promise.all(tasks.map(function executeTask(task) {
				return task()
			}))
		}

		// Initialize results array with proper length
		const results: Array<T> = new Array(tasks.length)

		// Track which tasks are complete
		let nextTaskIndex = 0
		const _inProgress = new Set<Promise<void>>()

		// Runner function that processes tasks via promise chaining (no await in loop)
		function runNext(): Promise<void> {
			const currentIndex = nextTaskIndex++
			if (currentIndex >= tasks.length) return Promise.resolve()
			const task = tasks[currentIndex]
			return task()
				.then(function storeResult(value) {
					results[currentIndex] = value
				})
				.then(runNext)
		}

		// Start initial runners up to the limit
		const runnerCount = Math.min(limit, tasks.length)
		const runners = Array.from(
			{ length: runnerCount },
			function createRunner() {
				return runNext()
			},
		)

		// Wait for all runners to complete
		await Promise.all(runners)

		return results
	}
}
