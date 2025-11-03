import type { CreditCardNumber } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as CreditCardNumber without validation - use only when input is guaranteed valid
export default function unsafeCreditCardNumber(
	value: string,
): CreditCardNumber {
	return value as CreditCardNumber
}
