import bytesToHex from "./bytesToHex/index.ts"
//++ SHA-256 specific hex hashing implementation (internal)
import toUint8Array from "./toUint8Array/index.ts"

export async function sha256HexInternal(
	input: ArrayBuffer | Uint8Array | string,
): Promise<string> {
	const data = toUint8Array(input)
	const hashBuffer = await crypto.subtle.digest("SHA-256", data)
	return bytesToHex(new Uint8Array(hashBuffer))
}

export default sha256HexInternal
