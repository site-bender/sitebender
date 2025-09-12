import test from "../../../string/test/index.ts"

const ONLY_DIGITS_PATTERN = /^\d+$/

//++ Checks if a string contains only digits
export default function isOnlyDigits(value: string): boolean {
	return test(ONLY_DIGITS_PATTERN)(value)
}
