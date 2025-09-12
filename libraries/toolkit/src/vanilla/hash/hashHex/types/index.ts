//++ Types for hashHex facade
export type HashAlgorithm = "sha256"

export type HashFn = (
	input: ArrayBuffer | Uint8Array | string,
	algorithm?: HashAlgorithm,
) => Promise<string>
