import type { ConnectionMetrics } from "../types/index.ts"

//++ Increments the attempts counter in metrics immutably
export default function _incrementAttempts(
	metrics: Readonly<ConnectionMetrics>,
) {
	return function incrementAttemptsWithMetrics(): Readonly<ConnectionMetrics> {
		return {
			...metrics,
			attempts: metrics.attempts + 1,
		}
	}
}
