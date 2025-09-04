/**
 * Repeatedly executes an async function while a condition is true
 *
 * Continuously executes an async function as long as the predicate returns true,
 * checking the condition before each iteration. Similar to a while loop but for
 * async operations. The function collects and returns all results from each
 * iteration. Useful for polling, pagination, or any operation that needs to
 * repeat until a condition is met.
 *
 * @param predicate - Function that returns true to continue, false to stop
 * @param fn - Async function to execute repeatedly
 * @returns Promise resolving to array of all results from each iteration
 * @curried
 * @impure
 * @example
 * ```typescript
 * // NOTE: This function requires external mutable state
 * // Basic counter example
 * const count = { value: 0 }
 * const results = await whilst(
 *   () => count.value < 5
 * )(
 *   async () => {
 *     const current = count.value
 *     count.value++
 *     return current
 *   }
 * )
 * console.log(results) // [0, 1, 2, 3, 4]
 *
 * // Polling until condition is met
 * const status = { value: "pending" }
 * const pollResults = await whilst(
 *   () => status.value === "pending"
 * )(
 *   async () => {
 *     const response = await fetch("/api/job-status")
 *     const data = await response.json()
 *     status.value = data.status
 *     return data
 *   }
 * )
 *
 * // Pagination example
 * const state = { page: 1, hasMore: true }
 * const allData = await whilst(
 *   () => state.hasMore
 * )(
 *   async () => {
 *     const response = await fetch(`/api/data?page=${state.page}`)
 *     const data = await response.json()
 *     state.hasMore = data.hasNextPage
 *     state.page++
 *     return data.items
 *   }
 * ).then(results => results.flat())
 *
 * // Process queue until empty
 * const queue = { items: [1, 2, 3, 4, 5] }
 * const processed = await whilst(
 *   () => queue.items.length > 0
 * )(
 *   async () => {
 *     const item = queue.items.shift()
 *     return processItem(item)
 *   }
 * )
 *
 * // Edge cases
 * whilst(() => false)(async () => "never") // Returns []
 * whilst(() => true)(async () => "infinite") // Infinite loop!
 * ```
 */
const whilst = <T>(
	predicate: () => boolean,
) =>
(
	fn: () => Promise<T>,
): Promise<Array<T>> => {
	// Recursive implementation to avoid while loop
	const iterate = async (acc: Array<T>): Promise<Array<T>> => {
		if (!predicate()) {
			return acc
		}

		const result = await fn()
		return iterate([...acc, result])
	}

	return iterate([])
}

export default whilst
