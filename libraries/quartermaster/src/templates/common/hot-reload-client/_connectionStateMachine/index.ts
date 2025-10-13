
import type { HotReloadConfig, HotReloadState } from "../types/index.ts"

import {
	INITIAL_ATTEMPTS,
	INITIAL_FAILED_CONNECTIONS,
	INITIAL_FALLBACKS,
	INITIAL_RELOAD_EVENTS,
	INITIAL_SUCCESSFUL_CONNECTIONS,
	RECONNECT_BACKOFF_MULTIPLIER,
} from "../constants/index.ts"
import updateMetrics from "../_updateMetrics/index.ts"
import handleReloadEvent from "../_handleReloadEvent/index.ts"
import clearConnectionTimeout from "../_clearConnectionTimeout/index.ts"
import disconnectSSE from "../_disconnectSSE/index.ts"
import disconnectWebSocket from "../_disconnectWebSocket/index.ts"
import createEventSourceSafely from "../_createEventSourceSafely/index.ts"
import createWebSocketSafely from "../_createWebSocketSafely/index.ts"
import parseMessageSafely from "../_parseMessageSafely/index.ts"
import incrementAttempts from "../_incrementAttempts/index.ts"
import incrementFallbacks from "../_incrementFallbacks/index.ts"
import calculateBackoffDelay from "../_calculateBackoffDelay/index.ts"

type ConnectionEvent =
	| { type: "connect_sse" }
	| { type: "connect_websocket" }
	| { type: "sse_open" }
	| { type: "sse_error"; error: Event }
	| { type: "sse_reload" }
	| { type: "websocket_open" }
	| { type: "websocket_message"; data: string }
	| { type: "websocket_close" }
	| { type: "websocket_error"; error: Event }
	| { type: "connection_timeout" }
	| { type: "reconnect_timer" }
	| { type: "disconnect" }
	| { type: "fallback"; reason: string }

//++ Core state machine generator managing SSE/WebSocket connections with automatic fallback and reconnection
export default function _connectionStateMachine(
	configuration: Required<HotReloadConfig>,
) {
	return function connectionStateMachineWithConfiguration(
		logFunction: (...args: ReadonlyArray<unknown>) => void,
	) {
		return function* connectionStateMachineWithLogging(
			errorFunction: (...args: ReadonlyArray<unknown>) => void,
		): Generator<HotReloadState, void, ConnectionEvent> {
			// Mutable state (permitted in generators per FP_GENERATOR_EXCEPTIONS_001)
			let currentConnectionType: "http3-sse" | "http2-websocket" | "none" =
				"none"
			let metrics = {
				connectionType: "none" as const,
				attempts: INITIAL_ATTEMPTS,
				successfulConnections: INITIAL_SUCCESSFUL_CONNECTIONS,
				failedConnections: INITIAL_FAILED_CONNECTIONS,
				fallbacks: INITIAL_FALLBACKS,
				lastConnectionTime: null,
				lastDisconnectionTime: null,
				reloadEventsReceived: INITIAL_RELOAD_EVENTS,
			}
			let reconnectDelay = configuration.initialReconnectDelay
			let triedPrimaryPath = false
			let intentionalDisconnect = false
			let eventSource: EventSource | null = null
			let webSocket: WebSocket | null = null
			let connectionTimeoutId: number | null = null
			let reconnectTimeout: number | null = null

			// Initial state
			yield {
				currentConnectionType,
				metrics,
				reconnectDelay,
				triedPrimaryPath,
				intentionalDisconnect,
				eventSource,
				webSocket,
				connectionTimeoutId,
				reconnectTimeout,
			}

			// Event loop
			while (true) {
				const event: ConnectionEvent = yield {
					currentConnectionType,
					metrics,
					reconnectDelay,
					triedPrimaryPath,
					intentionalDisconnect,
					eventSource,
					webSocket,
					connectionTimeoutId,
					reconnectTimeout,
				}

				switch (event.type) {
					case "connect_sse": {
						if (eventSource !== null || intentionalDisconnect) {
							continue
						}

						logFunction(
							"Attempting HTTP/3 + SSE connection to",
							configuration.sseEndpoint,
						)
						metrics = incrementAttempts(metrics)()

						connectionTimeoutId = window.setTimeout(
							function handleConnectionTimeout() {
								// Send timeout event back to generator
							},
							configuration.connectionTimeout,
						)

						const eventSourceResult = createEventSourceSafely(
							configuration.sseEndpoint,
						)()

						if (eventSourceResult._tag === "Ok") {
							eventSource = eventSourceResult.value
							triedPrimaryPath = true
						} else {
							clearConnectionTimeout(connectionTimeoutId)()
							connectionTimeoutId = null
							errorFunction(
								"Failed to create EventSource:",
								eventSourceResult.error.cause,
							)
							metrics = updateMetrics(metrics)("none")(false)
							eventSource = null
						}
						break
					}

					case "sse_open": {
						clearConnectionTimeout(connectionTimeoutId)()
						connectionTimeoutId = null
						currentConnectionType = "http3-sse"
						logFunction("Connected via HTTP/3 + SSE")
						reconnectDelay = configuration.initialReconnectDelay
						metrics = updateMetrics(metrics)(currentConnectionType)(true)
						configuration.onConnect("http3-sse")
						break
					}

					case "sse_reload": {
						metrics = handleReloadEvent(metrics)(configuration)(logFunction)
						break
					}

					case "sse_error": {
						clearConnectionTimeout(connectionTimeoutId)()
						connectionTimeoutId = null

						if (eventSource?.readyState === EventSource.CLOSED) {
							errorFunction("SSE connection closed")
							configuration.onDisconnect("http3-sse", event.error)
							metrics = updateMetrics(metrics)(currentConnectionType)(false)
							currentConnectionType = "none"
							eventSource = null

							if (!triedPrimaryPath) {
								// Fall back to WebSocket
								logFunction(
									"Falling back to HTTP/2 + WebSocket: Initial connection failed",
								)
								metrics = incrementFallbacks(metrics)()
								configuration.onFallback(
									"http3-sse",
									"http2-websocket",
									"Initial connection failed",
								)
							} else {
								// Schedule reconnect
								reconnectTimeout = window.setTimeout(
									function handleReconnect() {
										// Send reconnect_timer event
									},
									reconnectDelay,
								)
								reconnectDelay = calculateBackoffDelay(reconnectDelay)(
									RECONNECT_BACKOFF_MULTIPLIER,
								)(configuration.maxReconnectDelay)()
							}
						} else if (eventSource?.readyState === EventSource.CONNECTING) {
							logFunction("SSE reconnecting...")
						} else {
							errorFunction("SSE connection error:", event.error)
							configuration.onDisconnect("http3-sse", event.error)
						}
						break
					}

					case "connect_websocket": {
						if (webSocket !== null || intentionalDisconnect) {
							continue
						}

						logFunction(
							"Attempting HTTP/2 + WebSocket connection to",
							configuration.wsEndpoint,
						)
						metrics = incrementAttempts(metrics)()

						const webSocketResult = createWebSocketSafely(
							configuration.wsEndpoint,
						)()

						if (webSocketResult._tag === "Ok") {
							webSocket = webSocketResult.value
						} else {
							errorFunction(
								"Failed to create WebSocket:",
								webSocketResult.error.cause,
							)
							metrics = updateMetrics(metrics)(currentConnectionType)(false)
							webSocket = null
						}
						break
					}

					case "websocket_open": {
						currentConnectionType = "http2-websocket"
						logFunction("Connected via HTTP/2 + WebSocket")
						reconnectDelay = configuration.initialReconnectDelay
						metrics = updateMetrics(metrics)(currentConnectionType)(true)
						configuration.onConnect("http2-websocket")
						break
					}

					case "websocket_message": {
						const parseResult = parseMessageSafely(event.data)()

						if (parseResult._tag === "Ok") {
							const message = parseResult.value
							if (message.type === "reload") {
								metrics = handleReloadEvent(metrics)(configuration)(logFunction)
							}
						} else {
							errorFunction(
								"Failed to parse WebSocket message:",
								parseResult.error.cause,
							)
						}
						break
					}

					case "websocket_close": {
						logFunction("WebSocket connection closed")
						configuration.onDisconnect("http2-websocket")
						metrics = updateMetrics(metrics)(currentConnectionType)(false)
						currentConnectionType = "none"
						webSocket = null

						if (!intentionalDisconnect) {
							reconnectTimeout = window.setTimeout(function handleReconnect() {
								// Send reconnect_timer event
							}, reconnectDelay)
							reconnectDelay = calculateBackoffDelay(reconnectDelay)(
								RECONNECT_BACKOFF_MULTIPLIER,
							)(configuration.maxReconnectDelay)()
						}
						break
					}

					case "websocket_error": {
						errorFunction("WebSocket connection error:", event.error)
						configuration.onDisconnect(
							"http2-websocket",
							new Error("WebSocket error"),
						)
						metrics = updateMetrics(metrics)(currentConnectionType)(false)
						currentConnectionType = "none"
						webSocket = null

						if (!intentionalDisconnect) {
							reconnectTimeout = window.setTimeout(function handleReconnect() {
								// Send reconnect_timer event
							}, reconnectDelay)
							reconnectDelay = calculateBackoffDelay(reconnectDelay)(
								RECONNECT_BACKOFF_MULTIPLIER,
							)(configuration.maxReconnectDelay)()
						}
						break
					}

					case "connection_timeout": {
						if (
							eventSource !== null &&
							eventSource.readyState !== EventSource.OPEN
						) {
							errorFunction(
								"HTTP/3 + SSE connection timeout after",
								configuration.connectionTimeout,
								"ms",
							)
							disconnectSSE(eventSource)(connectionTimeoutId)
							eventSource = null
							connectionTimeoutId = null

							// Fall back to WebSocket
							logFunction(
								"Falling back to HTTP/2 + WebSocket: Connection timeout",
							)
							metrics = incrementFallbacks(metrics)()
							configuration.onFallback(
								"http3-sse",
								"http2-websocket",
								"Connection timeout",
							)
						}
						break
					}

					case "fallback": {
						logFunction("Falling back to HTTP/2 + WebSocket:", event.reason)
						metrics = incrementFallbacks(metrics)()
						configuration.onFallback(
							"http3-sse",
							"http2-websocket",
							event.reason,
						)
						disconnectSSE(eventSource)(connectionTimeoutId)
						eventSource = null
						connectionTimeoutId = null
						break
					}

					case "disconnect": {
						logFunction("Disconnecting")
						intentionalDisconnect = true

						clearConnectionTimeout(connectionTimeoutId)()
						connectionTimeoutId = null

						if (reconnectTimeout !== null) {
							window.clearTimeout(reconnectTimeout)
							reconnectTimeout = null
						}

						disconnectSSE(eventSource)(connectionTimeoutId)
						eventSource = null

						disconnectWebSocket(webSocket)()
						webSocket = null

						currentConnectionType = "none"
						break
					}
				}
			}
		}
	}
}
