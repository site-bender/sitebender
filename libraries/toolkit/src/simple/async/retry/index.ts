/**
 * Retries an async function on failure with configurable attempts and delays
 *
 * Executes an async function and automatically retries if it fails, with options
 * for maximum attempts, delays between retries, exponential backoff, and custom
 * retry conditions. Useful for handling transient failures in network requests,
 * database operations, or any operation that might temporarily fail.
 *
 * @param options - Configuration for retry behavior
 * @param fn - The async function to retry
 * @returns Promise resolving to the function's successful result
 * @curried
 * @impure
 * @example
 * ```typescript
 * // Basic retry with default options (3 attempts, no delay)
 * const result = await retry()(async () => {
 *   const response = await fetch("/api/flaky")
 *   if (!response.ok) throw new Error("Failed")
 *   return response.json()
 * })
 *
 * // Retry with custom attempts and delay
 * const fetchWithRetry = retry({
 *   attempts: 5,
 *   delay: 1000
 * })
 * const data = await fetchWithRetry(async () =>
 *   fetch("/api/data").then(r => r.json())
 * )
 *
 * // Exponential backoff
 * const exponentialRetry = retry({
 *   attempts: 4,
 *   delay: 1000,
 *   exponential: true // 1s, 2s, 4s, 8s
 * })
 *
 * // Custom retry condition
 * const retryOnNetwork = retry({
 *   attempts: 3,
 *   delay: 1000,
 *   shouldRetry: (error) => error.code === "NETWORK_ERROR"
 * })
 *
 * // Database operations with retry
 * const saveToDb = retry({
 *   attempts: 3,
 *   delay: 500,
 *   shouldRetry: (e) => e.code === "ECONNREFUSED"
 * })
 * await saveToDb(async () => db.save(data))
 *
 * // Partial application for different scenarios
 * const quickRetry = retry({ attempts: 2, delay: 100 })
 * const robustRetry = retry({ attempts: 5, delay: 1000, exponential: true })
 *
 * // Edge cases
 * retry({ attempts: 1 }) // No retry, single attempt
 * retry({ attempts: 0 }) // Throws error
 * ```
 */

type RetryOptions = {
	/** Maximum number of attempts (default: 3) */
	attempts?: number
	/** Base delay between retries in milliseconds (default: 0) */
	delay?: number
	/** Use exponential backoff (default: false) */
	exponential?: boolean
	/** Multiplier for delay increase (default: 2 for exponential, 1 for linear) */
	multiplier?: number
	/** Maximum delay cap in milliseconds */
	maxDelay?: number
	/** Add random jitter to delays (default: false) */
	jitter?: boolean
	/** Custom condition for retrying (return false to stop) */
	shouldRetry?: (error: unknown, attempt: number) => boolean
	/** Callback on each error */
	onError?: (error: unknown, attempt: number, nextDelay: number) => void
	/** Callback on success */
	onSuccess?: (result: unknown, attempts: number) => void
}

const retry = (options: RetryOptions = {}) =>
<T>(
	fn: () => Promise<T>,
): Promise<T> => {
	const {
		attempts = 3,
		delay = 0,
		exponential = false,
		multiplier = exponential ? 2 : 1,
		maxDelay = Infinity,
		jitter = false,
		shouldRetry = () => true,
		onError,
		onSuccess,
	} = options

	// Validate options
	if (attempts <= 0 || !Number.isFinite(attempts)) {
		throw new Error(`Invalid attempts: ${attempts}. Must be a positive number.`)
	}
	if (delay < 0 || !Number.isFinite(delay)) {
		throw new Error(
			`Invalid delay: ${delay}. Must be a non-negative finite number.`,
		)
	}
	if (multiplier <= 0 || !Number.isFinite(multiplier)) {
		throw new Error(
			`Invalid multiplier: ${multiplier}. Must be a positive finite number.`,
		)
	}

	// Recursive retry implementation
	const attemptFn = async (
		attempt: number,
		currentDelay: number,
	): Promise<T> => {
		try {
			const result = await fn()

			// Call success callback if provided
			if (onSuccess) {
				onSuccess(result, attempt)
			}

			return result
		} catch (error) {
			// Check if we should retry
			if (attempt === attempts || !shouldRetry(error, attempt)) {
				throw error
			}

			// Calculate next delay
			const baseNextDelay = exponential
				? currentDelay * multiplier
				: multiplier !== 1
				? currentDelay + (delay * (multiplier - 1))
				: currentDelay

			// Add jitter if enabled (±25% variation)
			const jitteredDelay = jitter && baseNextDelay > 0
				? baseNextDelay + (Math.random() * 2 - 1) * baseNextDelay * 0.25
				: baseNextDelay

			// Cap the delay
			const nextDelay = Math.min(jitteredDelay, maxDelay)

			// Call error callback if provided
			if (onError) {
				onError(error, attempt, Math.round(nextDelay))
			}

			// Wait before next attempt (if delay > 0)
			if (currentDelay > 0) {
				await new Promise((resolve) => setTimeout(resolve, currentDelay))
			}

			// Recursive call for next attempt
			return attemptFn(attempt + 1, baseNextDelay)
		}
	}

	return attemptFn(1, delay)
}

export default retry
