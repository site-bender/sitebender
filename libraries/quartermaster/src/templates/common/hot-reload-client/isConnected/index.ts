//++ Checks if either SSE or WebSocket connection is currently open
export default function isConnected(eventSource: EventSource | null) {
	return function isConnectedWithEventSource(
		webSocket: WebSocket | null,
	): boolean {
		return (
			(eventSource !== null && eventSource.readyState === EventSource.OPEN) ||
			(webSocket !== null && webSocket.readyState === WebSocket.OPEN)
		)
	}
}
