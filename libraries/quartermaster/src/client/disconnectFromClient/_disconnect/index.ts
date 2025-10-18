import type { ConnectionEvent } from "../../hotReloadClient/types/index.ts"
import type { IO } from "@sitebender/toolsmith/types/fp/io"

//++ Disconnects the hot reload client (private helper)
export default function _disconnect(
	sendEvent: (event: ConnectionEvent) => IO<void>,
) {
	return function disconnectWithSendEvent(): void {
		sendEvent({ type: "disconnect" })()
	}
}
