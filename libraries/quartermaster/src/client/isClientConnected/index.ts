import type { HotReloadConnection } from "../hotReloadClient/types/index.ts"

//++ Checks if the hot reload client is currently connected
export default function isClientConnected(connection: HotReloadConnection): boolean {
	const state = connection.next().value!
	return (
		(state.eventSource !== null && state.eventSource.readyState === EventSource.OPEN) ||
		(state.webSocket !== null && state.webSocket.readyState === WebSocket.OPEN)
	)
}
