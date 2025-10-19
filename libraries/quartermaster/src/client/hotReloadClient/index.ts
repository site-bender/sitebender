
import type { HotReloadConfig, HotReloadConnection } from "./types/index.ts"
import type { IO } from "@sitebender/toolsmith/types/fp/io"
import { DEFAULT_CONFIG } from "./constants/index.ts"

import io from "@sitebender/toolsmith/monads/io/io"
import map from "@sitebender/toolsmith/monads/io/map"
import _log from "./_log/index.ts"
import _error from "./_error/index.ts"
import _connectionStateMachine from "./_connectionStateMachine/index.ts"
import _startConnection from "./_startConnection/index.ts"

//++ Creates a hot reload connection with deferred initialization
// [IO] This function performs side effects
export default function _hotReloadClient(config: HotReloadConfig = {}) {
	return function initHotReloadWithConfig(): IO<HotReloadConnection> {
		const configuration: Required<HotReloadConfig> = {
			...DEFAULT_CONFIG,
			...config,
		}

		const logFunction = _log(configuration)

		const errorFunction = _error(configuration)

		// Create the generator state machine - this IS the connection
		const connection = _connectionStateMachine(configuration)(logFunction)(
			errorFunction,
		)

		// Initialize the generator (first .next() yields initial state)
		connection.next()

		// Start the connection (send initial connect event)
		return map(_startConnection(connection))(io(connection))
	}
}

// Auto-initialization removed - should be handled by consumer
