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
	HASH_ALGORITHM: "hashAlgo",
	HASH_VERSION: "hashVersion",
	HASH: "hash",
	FROZEN: "frozen",
} as const

//++ Privacy constants
export const PRIVATE_FUNCTION_PREFIX = "_"

//++ Regular expressions for detecting private functions
export const MATCH_PRIVATE_FUNCTION_NAME = /\/_[^/]*\.ts$/
export const MATCH_NESTED_PRIVATE_FUNCTION = /\/_[^/]*\/_[^/]*\.ts$/
export const MATCH_DEEP_NESTED_PRIVATE_FUNCTION =
	/\/_[^/]*\/_[^/]*\/_[^/]*\.ts$/
