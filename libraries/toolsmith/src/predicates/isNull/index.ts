//++ Type guard that checks if a value is strictly null (not undefined or falsy)
export default function isNull(value: unknown): value is null {
	return value === null
}
