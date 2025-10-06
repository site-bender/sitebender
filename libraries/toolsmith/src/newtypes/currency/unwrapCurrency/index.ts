import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Currency branded type back to its underlying number value
export default function unwrapCurrency(c: Currency): number {
	return c as number
}
