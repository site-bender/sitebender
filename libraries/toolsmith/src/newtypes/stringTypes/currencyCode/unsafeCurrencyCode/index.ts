import type { CurrencyCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as CurrencyCode without validation - use only when input is guaranteed valid
export default function unsafeCurrencyCode(value: string): CurrencyCode {
	return value as CurrencyCode
}
