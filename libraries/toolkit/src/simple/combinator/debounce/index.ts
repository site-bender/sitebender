/**
 * Returns a debounced version of a function that delays invoking
 * until after wait milliseconds have elapsed since the last call
 *
 * @param wait - Milliseconds to wait before invoking
 * @param fn - Function to debounce
 * @returns Debounced function with cancel method
 * @impure
 * @example
 * ```typescript
 * const expensiveOperation = (value: string) => {
 *   console.log("Processing:", value)
 *   return value.toUpperCase()
 * }
 *
 * const debounced = debounce(300, expensiveOperation)
 *
 * // Rapid calls - only the last one executes after 300ms
 * debounced("first")
 * debounced("second")
 * debounced("third") // Only this executes, logging "Processing: third"
 *
 * // Can cancel pending invocations
 * debounced("value")
 * debounced.cancel() // Prevents execution
 * ```
 */
const debounce = <T extends ReadonlyArray<unknown>, R>(
	wait: number,
	fn: (...args: T) => R,
): ((...args: T) => void) & { cancel: () => void } => {
	let timeoutId: number | undefined

	const debounced = (...args: T): void => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			timeoutId = undefined
			fn(...args)
		}, wait)
	}

	debounced.cancel = (): void => {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId)
			timeoutId = undefined
		}
	}

	return debounced
}

export default debounce
