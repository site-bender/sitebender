import type { Base58 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Base58 alphabet (Bitcoin/IPFS style) - excludes 0, O, I, l to avoid confusion
const BASE58_ALPHABET =
	"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

//++ Type predicate that checks if a string is valid Base58
export default function isBase58(value: string): value is Base58 {
	//++ [EXCEPTION] typeof, !==, ||, .length, ===, Array.from, .every(), and .includes() permitted in Toolsmith for performance - provides Base58 validation wrapper
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	//++ Check if all characters are in Base58 alphabet using functional approach
	return Array.from(value).every(function isValidBase58Char(ch) {
		return BASE58_ALPHABET.includes(ch)
	})
}
