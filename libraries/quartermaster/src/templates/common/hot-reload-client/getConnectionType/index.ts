import type { ConnectionType } from "../types/index.ts"

//++ Returns current connection type (http3-sse, http2-websocket, or none)
export default function getConnectionType(
	currentConnectionType: ConnectionType,
) {
	return function getConnectionTypeWithType(): ConnectionType {
		return currentConnectionType
	}
}
