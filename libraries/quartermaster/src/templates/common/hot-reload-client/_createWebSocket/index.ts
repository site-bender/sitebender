
import type { IO } from "@sitebender/toolsmith/types/fp/io"

//++ Creates new WebSocket connection wrapped in IO monad
export default function _createWebSocket(endpoint: string) {
	return function createWebSocketAtEndpoint(): IO<WebSocket> {
		return function performCreateWebSocket(): WebSocket {
			return new WebSocket(endpoint)
		}
	}
}
