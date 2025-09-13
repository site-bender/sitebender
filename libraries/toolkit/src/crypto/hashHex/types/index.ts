//++ Type definitions for the generic hashHex function

export type HashAlgorithm = "sha256" | "blake3" | "sha512"

export type HashInput = string | ArrayBuffer | Uint8Array

export type HashAdapter = (input: HashInput) => Promise<string>

export type HashOptions = {
	readonly algorithm?: HashAlgorithm
	readonly adapter?: HashAdapter
}

export type HashMetadata = {
	readonly algorithm: HashAlgorithm
	readonly version: number
	readonly timestamp: string
}

export type HashResult = {
	readonly hex: string
	readonly metadata: HashMetadata
}
