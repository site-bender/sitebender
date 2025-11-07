import type { PostalCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as PostalCode without validation - use only when input is guaranteed valid
export default function unsafePostalCode(value: string): PostalCode {
	return value as PostalCode
}
