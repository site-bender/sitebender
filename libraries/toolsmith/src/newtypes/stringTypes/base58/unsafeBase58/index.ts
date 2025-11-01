import type { Base58 } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Base58 without validation - use only when input is guaranteed valid
export default function unsafeBase58(value: string): Base58 {
	return value as Base58
}
