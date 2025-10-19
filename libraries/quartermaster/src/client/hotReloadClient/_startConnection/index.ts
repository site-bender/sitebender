import type { HotReloadConnection, ConnectionEvent } from "../types/index.ts"
import type { IO } from "@sitebender/toolsmith/types/fp/io"

//++ Starts the initial SSE connection (private helper)
export default function _startConnection(
	sendEvent: (event: ConnectionEvent) => IO<void>,
) {
	return function startConnectionWithSendEvent(
		connection: HotReloadConnection,
	) {
		return function executeStartConnection(): HotReloadConnection {
			sendEvent({ type: "connect_sse" })()
			return connection
		}
	}
}
