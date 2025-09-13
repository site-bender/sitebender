//++ [GROUP] Hash algorithm constants

//++ Default algorithm for hashing
export const DEFAULT_ALGORITHM = "sha256" as const

//++ Supported hash algorithms
export const SUPPORTED_ALGORITHMS = ["sha256", "blake3", "sha512"] as const

//++ Algorithm metadata versions
export const ALGORITHM_VERSIONS = {
	sha256: 1,
	blake3: 1,
	sha512: 1,
} as const

//++ [END]
