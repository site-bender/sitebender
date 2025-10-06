import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a number as Currency without validation - USE WITH CAUTION
export default function unsafeCurrency(n: number): Currency {
	return n as Currency
}
