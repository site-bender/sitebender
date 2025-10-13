export type ConnectionType = "http3-sse" | "http2-websocket" | "none"

export interface HotReloadConfig {
	wsEndpoint?: string
	sseEndpoint?: string
	debug?: boolean
	connectionTimeout?: number
	maxReconnectDelay?: number
	initialReconnectDelay?: number
	onReload?: () => void
	onConnect?: (type: ConnectionType) => void
	onDisconnect?: () => void
	onFallback?: (
		from: ConnectionType,
		to: ConnectionType,
		reason: string,
	) => void
}

export interface HotReloadClient {
	disconnect: () => void
	isConnected: () => boolean
	getConnectionType: () => ConnectionType
	getMetrics: () => ConnectionMetrics
}

export interface ConnectionMetrics {
	attempts: number
	failedConnections: number
	lastConnectionTime: number | null
	lastDisconnectionTime: number | null
	reloadEventsReceived: number
	fallbacks: number
	successfulConnections: number
	connectionType: ConnectionType
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

export type ConnectionEvent =
	| { type: "connect_sse" }
	| { type: "connect_websocket" }
	| { type: "sse_open" }
	| { type: "sse_error"; error: Event }
	| { type: "sse_reload" }
	| { type: "websocket_open" }
	| { type: "websocket_message"; data: string }
	| { type: "websocket_close" }
	| { type: "websocket_error"; error: Event }
	| { type: "connection_timeout" }
	| { type: "reconnect_timer" }
	| { type: "disconnect" }
	| { type: "fallback"; reason: string }
