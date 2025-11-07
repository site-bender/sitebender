export type TripleStoreConfig = {
	readonly host: string // Oxigraph server host
	readonly port: number // Oxigraph server port (default 7878)
	readonly timeout?: number // Request timeout in ms
}

export type VectorStoreConfig = {
	readonly host: string // Qdrant host
	readonly port: number // Qdrant port (default 6333)
	readonly apiKey?: string // Optional API key
	readonly timeout?: number // Request timeout in ms
}

export type PathfinderConfig = {
	readonly tripleStore: TripleStoreConfig
	readonly vectorStore: VectorStoreConfig
}

// Branded type for validated config
export type ValidPathfinderConfig = PathfinderConfig & {
	readonly __brand: "ValidPathfinderConfig"
}
