import doubleEverySecondDigit from "../doubleEverySecondDigit/index.ts"

//++ Calculates the Luhn checksum for an array of digits
export default function calculateLuhnSum(digits: Array<number>): number {
	return digits
		.reverse()
		.reduce((sum, digit, index) => {
			const isEvenPosition = index % 2 === 1
			return sum + (isEvenPosition ? doubleEverySecondDigit(digit) : digit)
		}, 0)
}