//++ Checks if a value is an integer (whole number with no fractional component)
export default function isInteger(value: unknown): value is number {
	return Number.isInteger(value)
}
