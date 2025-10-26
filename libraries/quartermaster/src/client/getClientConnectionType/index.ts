import type {
	ConnectionType,
	HotReloadConnection,
} from "../hotReloadClient/types/index.ts"

//++ Gets the current connection type of the hot reload client
export default function getClientConnectionType(
	connection: HotReloadConnection,
): ConnectionType {
	const state = connection.next().value!
	return state.currentConnectionType
}
