import type { ZipCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as ZipCode without validation - use only when input is guaranteed valid
export default function unsafeZipCode(value: string): ZipCode {
	return value as ZipCode
}
