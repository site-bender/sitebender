import type {
	ConnectionMetrics,
	HotReloadConnection,
} from "../hotReloadClient/types/index.ts"

//++ Gets the connection metrics of the hot reload client
export default function getClientMetrics(
	connection: HotReloadConnection,
): ConnectionMetrics {
	const state = connection.next().value!
	return { ...state.metrics }
}
