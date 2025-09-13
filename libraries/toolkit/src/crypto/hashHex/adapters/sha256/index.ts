import type { HashInput } from "../../types/index.ts"
import normalizeInput from "./normalizeInput/index.ts"
import bytesToHex from "../../utilities/bytesToHex/index.ts"

//++ SHA-256 adapter for hashHex using Deno's native crypto.subtle API

export default async function sha256Adapter(input: HashInput): Promise<string> {
	const data = normalizeInput(input)
	const hashBuffer = await crypto.subtle.digest("SHA-256", data)
	const hashArray = new Uint8Array(hashBuffer)

	return bytesToHex(hashArray)
}

//?? [EXAMPLE]
// const hex = await sha256Adapter("hello world")
// console.log(hex) // "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
