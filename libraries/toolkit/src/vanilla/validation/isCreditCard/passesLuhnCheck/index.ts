import map from "../../../array/map/index.ts"
import split from "../../../string/split/index.ts"
import calculateLuhnSum from "./calculateLuhnSum/index.ts"

//++ Validates a credit card number using the Luhn algorithm
export default function passesLuhnCheck(cardNumber: string): boolean {
	const characters = split("")(cardNumber)
	const digits = map((char: string) => parseInt(char, 10))(characters)
	const sum = calculateLuhnSum(digits)

	return sum % 10 === 0
}
