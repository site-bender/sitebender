import type { CreditCardNumber } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Extracts the underlying string value from a CreditCardNumber
export default function unwrapCreditCardNumber(creditCardNumber: CreditCardNumber): string {
	return creditCardNumber
}
