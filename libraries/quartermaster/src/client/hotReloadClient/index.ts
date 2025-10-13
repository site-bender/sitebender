
import type {
	HotReloadConfig,
	HotReloadState,
	HotReloadClient,
	ConnectionType,
	ConnectionMetrics,
} from "./types/index.ts"
import { DEFAULT_CONFIG } from "./constants/index.ts"

import runIO from "@sitebender/toolsmith/monads/io/runIO"
import log from "./_log/index.ts"
import error from "./_error/index.ts"
import isConnected from "./isConnected/index.ts"
import getConnectionType from "./getConnectionType/index.ts"
import getMetrics from "./getMetrics/index.ts"
import connectionStateMachine from "./_connectionStateMachine/index.ts"
import setupSSEListeners from "./_setupSSEListeners/index.ts"
import setupWebSocketListeners from "./_setupWebSocketListeners/index.ts"
function _hotReloadClient(config: HotReloadConfig = {}) {
	return function initHotReloadWithConfig(): HotReloadClient {
		const configuration: Required<HotReloadConfig> = {
			...DEFAULT_CONFIG,
			...config,
		}

		const logFunction = log(configuration)

		const errorFunction = error(configuration)

		// Create the generator state machine
		const stateMachine = connectionStateMachine(configuration)(logFunction)(
			errorFunction,
		)

		// Get initial state
		let currentState: HotReloadState = stateMachine.next().value as HotReloadState

		// Function to send events to the state machine
		function sendEvent(event: {
			type: string
			error?: Event
			data?: string
			reason?: string
		}) {
			return function sendEventWithEvent(): void {
				const result = stateMachine.next(event as never)
				if (!result.done) {
					currentState = result.value

					// Handle side effects based on new state
					if (
						currentState.eventSource !== null && event.type === "connect_sse"
					) {
						runIO(setupSSEListeners(currentState.eventSource)(sendEvent)())
					}

					if (
						currentState.webSocket !== null &&
						event.type === "connect_websocket"
					) {
						runIO(setupWebSocketListeners(currentState.webSocket)(sendEvent)())
					}
				}
			}
		}

		// Start initial connection
		sendEvent({ type: "connect_sse" })()

		// Public API
		const disconnect = function disconnect(): void {
			sendEvent({ type: "disconnect" })()
		}

		const isConnectedCheck = function isConnectedCheck(): boolean {
			return isConnected(currentState.eventSource)(currentState.webSocket)
		}

		const getConnectionTypeValue =
			function getConnectionTypeValue(): ConnectionType {
				return getConnectionType(currentState.currentConnectionType)()
			}

		const getMetricsValue = function getMetricsValue(): ConnectionMetrics {
			return getMetrics(currentState.metrics)()
		}

		return {
			disconnect,
			isConnected: isConnectedCheck,
			getConnectionType: getConnectionTypeValue,
			getMetrics: getMetricsValue,
		}
	}
}

// Auto-initialization removed - should be handled by consumer

export default _hotReloadClient
