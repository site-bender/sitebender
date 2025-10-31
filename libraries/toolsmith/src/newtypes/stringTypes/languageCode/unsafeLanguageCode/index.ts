import type { LanguageCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as LanguageCode without validation - use only when input is guaranteed valid
export default function unsafeLanguageCode(value: string): LanguageCode {
	return value as LanguageCode
}
