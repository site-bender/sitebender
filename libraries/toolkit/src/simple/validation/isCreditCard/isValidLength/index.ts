import { MAX_CARD_LENGTH, MIN_CARD_LENGTH } from "../constants/index.ts"

//++ Checks if card number length is within valid range (13-19 digits)
export default function isValidLength(cardNumber: string): boolean {
	return cardNumber.length >= MIN_CARD_LENGTH &&
		cardNumber.length <= MAX_CARD_LENGTH
}
