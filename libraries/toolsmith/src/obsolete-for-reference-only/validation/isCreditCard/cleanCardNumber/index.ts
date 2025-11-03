//++ Removes spaces and hyphens from a card number string
export default function cleanCardNumber(cardNumber: string): string {
	return cardNumber.replace(/[\s-]/g, "")
}
