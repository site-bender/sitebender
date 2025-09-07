export type GatewayResult = {
	data: Uint8Array
	gateway: string
	latency: number
}

export type CacheEntry = {
	data: Uint8Array
	timestamp: number
}
