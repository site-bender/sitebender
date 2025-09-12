import reduce from "../../../../array/reduce/index.ts"
import reverse from "../../../../array/reverse/index.ts"
import doubleEverySecondDigit from "../doubleEverySecondDigit/index.ts"

//++ Calculates the Luhn checksum for an array of digits
export default function calculateLuhnSum(digits: Array<number>): number {
	const reversed = reverse(digits)

	return reduce<number, number>(
		(sum: number, digit: number, index?: number) => {
			const isEvenPosition = (index ?? 0) % 2 === 1

			return sum + (isEvenPosition ? doubleEverySecondDigit(digit) : digit)
		},
	)(0)(reversed)
}
