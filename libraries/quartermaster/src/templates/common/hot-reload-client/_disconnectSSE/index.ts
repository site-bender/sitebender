import clearConnectionTimeout from "../_clearConnectionTimeout/index.ts"

//++ Closes EventSource connection and clears associated timeout
export default function _disconnectSSE(eventSource: EventSource | null) {
	return function disconnectSSEFromEventSource(
		connectionTimeoutId: number | null,
	): void {
		clearConnectionTimeout(connectionTimeoutId)()
		if (eventSource !== null) {
			eventSource.close()
		}
	}
}
