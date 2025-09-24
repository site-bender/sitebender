import type { CardType } from "../types/index.ts"

import { CARD_TYPE_PATTERNS } from "../constants/index.ts"
import test from "../../../string/test/index.ts"

//++ Checks if a card number matches a specific card type pattern
export default function matchesCardType(cardType: CardType) {
	return function matchesCardTypeWithType(cardNumber: string): boolean {
		const pattern = CARD_TYPE_PATTERNS[cardType]

		return test(pattern)(cardNumber)
	}
}

//?? [EXAMPLE] matchesCardType("visa")("4111111111111111") // true
//?? [EXAMPLE] matchesCardType("mastercard")("5500000000000004") // true
//?? [EXAMPLE] matchesCardType("amex")("340000000000009") // true
