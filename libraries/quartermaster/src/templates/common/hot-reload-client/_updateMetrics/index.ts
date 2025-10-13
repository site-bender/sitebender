import type { ConnectionMetrics, ConnectionType } from "../types/index.ts"

//++ Updates metrics based on connection status (success/failure counters and timestamps)
export default function _updateMetrics(metrics: Readonly<ConnectionMetrics>) {
	return function updateMetricsWithMetrics(
		currentConnectionType: ConnectionType,
	) {
		return function updateMetricsWithType(
			connected: boolean,
		): ConnectionMetrics {
			const baseUpdate = {
				...metrics,
				connectionType: currentConnectionType,
			}

			if (connected) {
				return {
					...baseUpdate,
					successfulConnections: metrics.successfulConnections + 1,
					lastConnectionTime: Date.now(),
				}
			}

			return {
				...baseUpdate,
				failedConnections: metrics.failedConnections + 1,
				lastDisconnectionTime: Date.now(),
			}
		}
	}
}
