/**
 * Retries an async function on failure with configurable attempts and delays
 *
 * Executes an async function and automatically retries if it fails, with options
 * for maximum attempts, delays between retries, exponential backoff, and custom
 * retry conditions. Useful for handling transient failures in network requests,
 * database operations, or any operation that might temporarily fail.
 *
 * @curried (options) => (fn) => Promise<T>
 * @param options - Configuration for retry behavior
 * @param fn - The async function to retry
 * @returns Promise resolving to the function's successful result
 * @example
 * ```typescript
 * // Basic retry with default options (3 attempts, no delay)
 * const result = await retry()(async () => {
 *   const response = await fetch("/api/flaky-endpoint")
 *   if (!response.ok) throw new Error("Request failed")
 *   return response.json()
 * })
 *
 * // Retry with custom attempts and delay
 * const fetchWithRetry = retry({
 *   attempts: 5,
 *   delay: 1000 // 1 second between retries
 * })
 *
 * const data = await fetchWithRetry(async () => {
 *   return fetch("/api/data").then(r => r.json())
 * })
 *
 * // Exponential backoff
 * const exponentialRetry = retry({
 *   attempts: 4,
 *   delay: 1000,
 *   exponential: true // 1s, 2s, 4s, 8s
 * })
 *
 * const result = await exponentialRetry(async () => {
 *   return unstableOperation()
 * })
 *
 * // Linear backoff with multiplier
 * const linearRetry = retry({
 *   attempts: 5,
 *   delay: 500,
 *   multiplier: 1.5 // 500ms, 750ms, 1125ms, ...
 * })
 *
 * // Custom retry condition
 * const retryOnSpecificErrors = retry({
 *   attempts: 3,
 *   delay: 1000,
 *   shouldRetry: (error, attempt) => {
 *     // Only retry on network errors or 5xx status codes
 *     if (error.code === "NETWORK_ERROR") return true
 *     if (error.status >= 500 && error.status < 600) return true
 *     return false
 *   }
 * })
 *
 * // With maximum delay cap
 * const cappedBackoff = retry({
 *   attempts: 10,
 *   delay: 100,
 *   exponential: true,
 *   maxDelay: 5000 // Never wait more than 5 seconds
 * })
 *
 * // Retry with jitter to prevent thundering herd
 * const jitteredRetry = retry({
 *   attempts: 5,
 *   delay: 1000,
 *   jitter: true // Adds random variation to delays
 * })
 *
 * // Custom error handling
 * const retryWithLogging = retry({
 *   attempts: 3,
 *   delay: 1000,
 *   onError: (error, attempt) => {
 *     console.log(`Attempt ${attempt} failed:`, error.message)
 *   }
 * })
 *
 * // Database operations with retry
 * const saveToDatabase = retry({
 *   attempts: 3,
 *   delay: 500,
 *   shouldRetry: (error) => {
 *     // Retry on connection errors, not on validation errors
 *     return error.code === "ECONNREFUSED" ||
 *            error.code === "ETIMEDOUT"
 *   }
 * })
 *
 * await saveToDatabase(async () => {
 *   return db.collection("users").insertOne(userData)
 * })
 *
 * // API rate limit handling
 * const respectRateLimit = retry({
 *   attempts: 5,
 *   delay: 0,
 *   shouldRetry: (error) => error.status === 429,
 *   onError: (error, attempt) => {
 *     if (error.status === 429) {
 *       const retryAfter = error.headers?.["retry-after"]
 *       if (retryAfter) {
 *         return { delay: parseInt(retryAfter) * 1000 }
 *       }
 *     }
 *   }
 * })
 *
 * // Immediate retry for specific conditions
 * const immediateRetry = retry({
 *   attempts: 3,
 *   delay: 0, // No delay between retries
 *   shouldRetry: (error) => error.temporary === true
 * })
 *
 * // Circuit breaker pattern
 * let consecutiveFailures = 0
 * const circuitBreaker = retry({
 *   attempts: 3,
 *   delay: 1000,
 *   shouldRetry: (error, attempt) => {
 *     if (consecutiveFailures >= 10) {
 *       console.error("Circuit breaker open")
 *       return false
 *     }
 *     return true
 *   },
 *   onError: () => consecutiveFailures++,
 *   onSuccess: () => consecutiveFailures = 0
 * })
 *
 * // Retry with timeout per attempt
 * import race from "../race/index.ts"
 * import delayReject from "../delayReject/index.ts"
 *
 * const retryWithTimeout = retry({
 *   attempts: 3,
 *   delay: 1000
 * })
 *
 * const result = await retryWithTimeout(async () => {
 *   return race([
 *     async () => slowOperation(),
 *     async () => delayReject(5000)(new Error("Timeout"))
 *   ])
 * })
 *
 * // Partial application for different scenarios
 * const quickRetry = retry({ attempts: 2, delay: 100 })
 * const robustRetry = retry({ attempts: 5, delay: 1000, exponential: true })
 * const infiniteRetry = retry({ attempts: Infinity, delay: 5000 })
 *
 * // Use based on criticality
 * const fetchData = critical
 *   ? robustRetry(fetchOperation)
 *   : quickRetry(fetchOperation)
 *
 * // Testing with controlled failures
 * let callCount = 0
 * const result = await retry({ attempts: 3 })(async () => {
 *   callCount++
 *   if (callCount < 3) {
 *     throw new Error(`Attempt ${callCount} failed`)
 *   }
 *   return "Success on third try"
 * })
 * console.log(result) // "Success on third try"
 * console.log(callCount) // 3
 *
 * // No retry (attempts = 1)
 * const noRetry = retry({ attempts: 1 })
 * try {
 *   await noRetry(async () => { throw new Error("Fail") })
 * } catch (err) {
 *   console.log("Failed immediately, no retry")
 * }
 *
 * // Complex retry strategy
 * const advancedRetry = retry({
 *   attempts: 10,
 *   delay: 100,
 *   multiplier: 2,
 *   maxDelay: 10000,
 *   jitter: true,
 *   shouldRetry: (error, attempt) => {
 *     // Stop retrying after 5 attempts for permanent errors
 *     if (error.permanent && attempt > 5) return false
 *     // Always retry temporary errors
 *     if (error.temporary) return true
 *     // Retry others up to max attempts
 *     return true
 *   },
 *   onError: (error, attempt, nextDelay) => {
 *     console.log(`Attempt ${attempt} failed, retrying in ${nextDelay}ms`)
 *   }
 * })
 *
 * // Type preservation
 * const typedRetry = retry({ attempts: 3 })
 * const stringResult = await typedRetry(async () => "hello")
 * const numberResult = await typedRetry(async () => 42)
 * // TypeScript preserves return types
 * ```
 * @property Configurable - Flexible retry strategies via options
 * @property Exponential backoff - Optional exponential delay increase
 * @property Conditional - Custom logic for when to retry
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
	shouldRetry?: (error: any, attempt: number) => boolean
	/** Callback on each error */
	onError?: (error: any, attempt: number, nextDelay: number) => void
	/** Callback on success */
	onSuccess?: (result: any, attempts: number) => void
}

const retry = (options: RetryOptions = {}) =>
async <T>(
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

	let lastError: any
	let currentDelay = delay

	for (let attempt = 1; attempt <= attempts; attempt++) {
		try {
			const result = await fn()

			// Call success callback if provided
			if (onSuccess) {
				onSuccess(result, attempt)
			}

			return result
		} catch (error) {
			lastError = error

			// Check if we should retry
			if (attempt === attempts || !shouldRetry(error, attempt)) {
				throw error
			}

			// Calculate next delay
			let nextDelay = currentDelay

			// Add jitter if enabled (±25% variation)
			if (jitter && nextDelay > 0) {
				const jitterAmount = nextDelay * 0.25
				nextDelay = nextDelay + (Math.random() * 2 - 1) * jitterAmount
			}

			// Cap the delay
			nextDelay = Math.min(nextDelay, maxDelay)

			// Call error callback if provided
			if (onError) {
				onError(error, attempt, Math.round(nextDelay))
			}

			// Wait before next attempt (if delay > 0)
			if (nextDelay > 0) {
				await new Promise((resolve) => setTimeout(resolve, nextDelay))
			}

			// Update delay for next iteration
			if (exponential) {
				currentDelay = currentDelay * multiplier
			} else if (multiplier !== 1) {
				currentDelay = currentDelay + (delay * (multiplier - 1))
			}
		}
	}

	// This should never be reached due to the throw in the loop
	throw lastError
}

export default retry
