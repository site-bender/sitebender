//++ Checks if a string contains only digits
export default function isOnlyDigits(value: string): boolean {
	return /^\d+$/.test(value)
}