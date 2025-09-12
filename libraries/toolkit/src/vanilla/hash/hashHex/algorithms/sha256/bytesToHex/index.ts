//++ Convert bytes to lowercase hexadecimal string
import { HEX_TABLE } from "../constants/index.ts"

export function bytesToHex(bytes: Uint8Array): string {
	return bytes.reduce((acc, v) => (
		acc + HEX_TABLE[v >>> 4] + HEX_TABLE[v & 0x0f]
	), "")
}

export default bytesToHex
