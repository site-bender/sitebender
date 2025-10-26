import type { ConnectionEvent } from "../../hotReloadClient/types/index.ts"
import type { Io } from "@sitebender/toolsmith/types/fp/io"

//++ Disconnects the hot reload client (private helper)
export default function _disconnect(
	sendEvent: (event: ConnectionEvent) => Io<void>,
) {
	return function disconnectWithSendEvent(): void {
		sendEvent({ type: "disconnect" })()
	}
}
