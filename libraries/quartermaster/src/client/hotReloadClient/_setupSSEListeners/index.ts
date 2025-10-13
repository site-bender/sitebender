
import type { IO } from "@sitebender/toolsmith/types/fp/io"

type ConnectionEvent =
	| { type: "sse_open" }
	| { type: "sse_error"; error: Event }
	| { type: "sse_reload" }

//++ Attaches event listeners to EventSource for open, reload, and error events
export default function _setupSSEListeners(eventSource: EventSource) {
	return function setupSSEListenersOnEventSource(
		sendEvent: (event: ConnectionEvent) => void,
	) {
		return function setupSSEListenersWithEventSender(): IO<void> {
			return function performSetupSSEListeners(): void {
				eventSource.addEventListener("open", function handleSSEOpen() {
					sendEvent({ type: "sse_open" })
				})

				eventSource.addEventListener("reload", function handleSSEReload() {
					sendEvent({ type: "sse_reload" })
				})

				eventSource.addEventListener(
					"error",
					function handleSSEError(eventError: Event) {
						sendEvent({ type: "sse_error", error: eventError })
					},
				)
			}
		}
	}
}
