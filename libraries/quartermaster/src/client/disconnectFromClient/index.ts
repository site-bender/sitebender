import type { HotReloadConnection } from "../hotReloadClient/types/index.ts"
import type { IO } from "@sitebender/toolsmith/types/fp/io"
import _disconnect from "./_disconnect/index.ts"

//++ Disconnects the hot reload client connection
// [IO] This function performs side effects
export default function disconnectFromClient(connection: HotReloadConnection) {
	return function disconnectFromClientWithConnection(): IO<void> {
		return _disconnect(connection.sendEvent)
	}
}
