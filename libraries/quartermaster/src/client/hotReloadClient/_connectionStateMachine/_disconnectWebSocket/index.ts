//++ Closes WebSocket connection if not null (safe disconnect)
export default function _disconnectWebSocket(webSocket: WebSocket | null) {
	return function disconnectWebSocketWithSocket(): void {
		if (webSocket !== null) {
			webSocket.close()
		}
	}
}
