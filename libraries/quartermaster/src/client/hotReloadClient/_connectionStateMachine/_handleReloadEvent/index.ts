import type { ConnectionMetrics, HotReloadConfig } from "../../types/index.ts"

//++ Processes reload event by incrementing counter and triggering onReload callback
export default function _handleReloadEvent(
	metrics: Readonly<ConnectionMetrics>,
) {
	return function handleReloadEventWithMetrics(
		configuration: Readonly<Required<HotReloadConfig>>,
	) {
		return function handleReloadEventWithConfiguration(
			logFunction: (...args: ReadonlyArray<unknown>) => void,
		): ConnectionMetrics {
			logFunction("Reload event received")
			configuration.onReload()
			return {
				...metrics,
				reloadEventsReceived: metrics.reloadEventsReceived + 1,
			}
		}
	}
}
