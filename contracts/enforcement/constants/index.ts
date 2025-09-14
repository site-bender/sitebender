//++ Constants for contract enforcement system

//++ Default hash algorithm used for contract validation
export const DEFAULT_HASH_ALGORITHM = "sha256" as const

//++ Current hash algorithm version
export const HASH_VERSION = 1

//++ Supported hash algorithms
export const SUPPORTED_HASH_ALGORITHMS = ["sha256", "sha512"] as const

//++ Contract metadata field names
export const METADATA_FIELDS = {
	LIBRARY: "library",
	VERSION: "version",
	TIMESTAMP: "timestamp",
	CHECKSUM: "checksum",
	HASH_ALGO: "hashAlgo",
	HASH_VERSION: "hashVersion",
	HASH: "hash",
	FROZEN: "frozen",
} as const