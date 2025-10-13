
export type ConnectionType = "http3-sse" | "http2-websocket" | "none"

export interface HotReloadConfig {
	wsEndpoint?: string
	connectionTimeout?: number
	initialReconnectDelay?: number
	onConnect?: (type: ConnectionType) => void
	onFallback?: (
		from: ConnectionType,
		to: ConnectionType,
		reason: string,
	) => void
}

export interface HotReloadClient {
	isConnected: () => boolean
	getMetrics: () => ConnectionMetrics
}

export interface ConnectionMetrics {
	attempts: number
	failedConnections: number
	lastConnectionTime: number | null
	reloadEventsReceived: number
}

export type HotReloadState = {
	readonly currentConnectionType: ConnectionType
	readonly metrics: Readonly<ConnectionMetrics>
	readonly reconnectDelay: number
	readonly triedPrimaryPath: boolean
	readonly intentionalDisconnect: boolean
	readonly eventSource: EventSource | null
	readonly webSocket: WebSocket | null
	readonly connectionTimeoutId: number | null
	readonly reconnectTimeout: number | null
}

export type EventSourceCreationError = {
	readonly _tag: "EventSourceCreationError"
	readonly endpoint: string
	readonly cause: unknown
}

export type WebSocketCreationError = {
	readonly _tag: "WebSocketCreationError"
	readonly endpoint: string
	readonly cause: unknown
}

export type MessageParseError = {
	readonly _tag: "MessageParseError"
	readonly data: string
	readonly cause: unknown
}
