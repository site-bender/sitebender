import type { Result } from "@sitebender/toolsmith/types/fp/result"
import type { WebSocketCreationError } from "../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok"
import error from "@sitebender/toolsmith/monads/result/error"

//++ [IO] [EXCEPTION] Creates WebSocket safely, returning Result instead of throwing
//++ Browser API may throw - this is the ONE place we handle that exception
export default function _createWebSocketSafely(
	endpoint: string,
) {
	return function createWebSocketSafelyWithEndpoint(): Result<
		WebSocketCreationError,
		WebSocket
	> {
		try {
			const webSocket = new WebSocket(endpoint)
			return ok<WebSocket>(webSocket)
		} catch (cause) {
			return error<WebSocketCreationError>({
				_tag: "WebSocketCreationError",
				endpoint,
				cause,
			})
		}
	}
}
