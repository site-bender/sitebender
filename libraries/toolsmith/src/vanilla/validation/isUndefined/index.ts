//++ Type guard that checks if a value is strictly undefined (not null or falsy)
export default function isUndefined(value: unknown): value is undefined {
	return value === undefined
}
