
import type { IO } from "@sitebender/toolsmith/types/fp/io"

type ConnectionEvent =
	| { type: "websocket_open" }
	| { type: "websocket_message"; data: string }
	| { type: "websocket_close" }
	| { type: "websocket_error"; error: Event }

//++ Attaches event listeners to WebSocket for open, message, close, and error events
export default function _setupWebSocketListeners(webSocket: WebSocket) {
	return function setupWebSocketListenersOnWebSocket(
		sendEvent: (event: ConnectionEvent) => void,
	) {
		return function setupWebSocketListenersWithEventSender(): IO<void> {
			return function performSetupWebSocketListeners(): void {
				webSocket.addEventListener("open", function handleWebSocketOpen() {
					sendEvent({ type: "websocket_open" })
				})

				webSocket.addEventListener(
					"message",
					function handleWebSocketMessage(event: MessageEvent) {
						sendEvent({ type: "websocket_message", data: event.data })
					},
				)

				webSocket.addEventListener("close", function handleWebSocketClose() {
					sendEvent({ type: "websocket_close" })
				})

				webSocket.addEventListener(
					"error",
					function handleWebSocketError(eventError: Event) {
						sendEvent({ type: "websocket_error", error: eventError })
					},
				)
			}
		}
	}
}
