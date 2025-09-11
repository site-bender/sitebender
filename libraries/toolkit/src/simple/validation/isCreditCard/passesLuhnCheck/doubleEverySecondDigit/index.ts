//++ Doubles a digit and subtracts 9 if result is greater than 9 (Luhn algorithm step)
export default function doubleEverySecondDigit(digit: number): number {
	const doubled = digit * 2

	return doubled > 9 ? doubled - 9 : doubled
}
