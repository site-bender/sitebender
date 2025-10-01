//++ Checks if a value is falsy (false, 0, "", null, undefined, or NaN)
export default function isFalsy(value: unknown): boolean {
	return !value
}
