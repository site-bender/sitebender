
import type { ConnectionMetrics } from "../types/index.ts"

//++ Returns immutable copy of current connection metrics
export default function getMetrics(metrics: Readonly<ConnectionMetrics>) {
	return function getMetricsWithMetrics(): ConnectionMetrics {
		return { ...metrics }
	}
}
