import calculateLuhnSum from "./calculateLuhnSum/index.ts"

//++ Validates a credit card number using the Luhn algorithm
export default function passesLuhnCheck(cardNumber: string): boolean {
	const digits = cardNumber.split("").map(char => parseInt(char, 10))
	const sum = calculateLuhnSum(digits)
	return sum % 10 === 0
}