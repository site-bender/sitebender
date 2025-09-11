import type { CardType } from "../types/index.ts"

import { CARD_TYPE_PATTERNS } from "../constants/index.ts"

//++ Checks if a card number matches a specific card type pattern
export default function matchesCardType(
	cardNumber: string,
	cardType: CardType,
): boolean {
	const pattern = CARD_TYPE_PATTERNS[cardType]

	return pattern.test(cardNumber)
}
