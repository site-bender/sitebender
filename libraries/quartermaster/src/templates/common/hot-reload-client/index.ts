

import type {
	ConnectionMetrics,
	ConnectionType,
	HotReloadClient,
	HotReloadConfig,
	HotReloadState,
} from "./types/index.ts"

import {
	CONNECTION_TIMEOUT_MS,
	DEFAULT_SSE_ENDPOINT,
	DEFAULT_WEBSOCKET_ENDPOINT,
	INITIAL_RECONNECT_DELAY_MS,
	MAX_RECONNECT_DELAY_MS,
} from "./constants/index.ts"

import runIO from "@sitebender/toolsmith/monads/io/runIO"
import log from "./_log/index.ts"
import error from "./_error/index.ts"
import isConnected from "./isConnected/index.ts"
import getConnectionType from "./getConnectionType/index.ts"
import getMetrics from "./getMetrics/index.ts"
import connectionStateMachine from "./_connectionStateMachine/index.ts"
import createEventSource from "./_createEventSource/index.ts"
import createWebSocket from "./_createWebSocket/index.ts"
import setupSSEListeners from "./_setupSSEListeners/index.ts"
import setupWebSocketListeners from "./_setupWebSocketListeners/index.ts"

// Re-export types for external consumers
export type {
	ConnectionMetrics,
	ConnectionType,
	HotReloadClient,
	HotReloadConfig,
}

const DEFAULT_CONFIG: Required<HotReloadConfig> = {
	sseEndpoint: DEFAULT_SSE_ENDPOINT,
	wsEndpoint: DEFAULT_WEBSOCKET_ENDPOINT,
	debug: true,
	connectionTimeout: CONNECTION_TIMEOUT_MS,
	maxReconnectDelay: MAX_RECONNECT_DELAY_MS,
	initialReconnectDelay: INITIAL_RECONNECT_DELAY_MS,
	onReload: function reloadWindow() {
		return window.location.reload()
	},
	onConnect: function handleConnect() {},
	onDisconnect: function handleDisconnect() {},
	onFallback: function handleFallback() {},
}

export default function hot-reload-client(config: HotReloadConfig = {}) {
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
		let currentState: HotReloadState = stateMachine.next().value

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

if (typeof window !== "undefined" && typeof document !== "undefined") {
	// Auto-initialize on DOMContentLoaded
	if (document.readyState === "loading") {
		document.addEventListener(
			"DOMContentLoaded",
			function handleDOMContentLoaded() {
				initHotReload()()
			},
		)
	} else {
		// DOM already loaded
		initHotReload()()
	}
}
