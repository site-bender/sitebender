// Base error type
export type PathfinderError<Tag extends string> = {
	readonly _tag: Tag
}

// Connection errors
export type ConnectionError = PathfinderError<"ConnectionError"> & {
	readonly kind:
		| "TripleStoreInitFailed"
		| "VectorStoreInitFailed"
		| "VectorStoreUnhealthy"
		| "InvalidStorePath"
	readonly message: string
	readonly path?: string
	readonly host?: string
	readonly port?: number
	readonly cause?: unknown
}

// Query errors
export type QueryError = PathfinderError<"QueryError"> & {
	readonly kind:
		| "ExecutionFailed"
		| "InvalidSyntax"
		| "ResultParseFailed"
		| "Timeout"
	readonly message: string
	readonly sparql?: string
	readonly line?: number
	readonly column?: number
	readonly cause?: unknown
}

// Configuration errors
export type ConfigError = PathfinderError<"ConfigError"> & {
	readonly kind:
		| "MissingPath"
		| "MissingHost"
		| "InvalidPort"
		| "InvalidConfig"
	readonly field: string
	readonly message: string
	readonly value?: unknown
}

// Vector search errors
export type VectorError = PathfinderError<"VectorError"> & {
	readonly kind:
		| "CollectionNotFound"
		| "InsertFailed"
		| "SearchFailed"
		| "InvalidDimension"
	readonly message: string
	readonly collection?: string
	readonly dimension?: number
	readonly cause?: unknown
}

// Union of all Pathfinder errors
export type AnyPathfinderError =
	| ConnectionError
	| QueryError
	| ConfigError
	| VectorError
