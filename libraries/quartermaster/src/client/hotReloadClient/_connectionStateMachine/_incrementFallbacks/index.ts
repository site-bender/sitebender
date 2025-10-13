import type { ConnectionMetrics } from "../../types/index.ts"

//++ Increments the fallbacks counter in metrics immutably
export default function _incrementFallbacks(
	metrics: Readonly<ConnectionMetrics>,
) {
	return function incrementFallbacksWithMetrics(): Readonly<ConnectionMetrics> {
		return {
			...metrics,
			fallbacks: metrics.fallbacks + 1,
		}
	}
}
