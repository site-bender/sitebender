import type { HashInput } from "../../types/index.ts"

import bytesToHex from "../../utilities/bytesToHex/index.ts"
import normalizeInput from "./normalizeInput/index.ts"

//++ SHA-256 adapter for hashHex using Deno's native crypto.subtle API

export default async function sha256Adapter(input: HashInput): Promise<string> {
	const data = normalizeInput(input)
	//++ [EXCEPTION] crypto.subtle.digest permitted in Toolsmith for performance - provides SHA-256 crypto wrapper
	const hashBuffer = await crypto.subtle.digest("SHA-256", data)
	//++ [EXCEPTION] Uint8Array constructor permitted in Toolsmith for performance - provides typed array wrapper
	const hashArray = new Uint8Array(hashBuffer)

	return bytesToHex(hashArray)
}

// const hex = await sha256Adapter("hello world")
// console.log(hex) // "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
