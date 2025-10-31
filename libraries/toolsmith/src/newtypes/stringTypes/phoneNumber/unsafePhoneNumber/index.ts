import type { PhoneNumber } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as PhoneNumber without validation - use only when input is guaranteed valid
export default function unsafePhoneNumber(value: string): PhoneNumber {
	return value as PhoneNumber
}
