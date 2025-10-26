//++ Type guard that checks if a value is strictly undefined (not null or falsy)
export default function isUndefined(value: unknown): value is undefined {
	/*++
	 + [EXCEPTION] Uses === operator to check prototype identity for performance reasons
	 */
	return value === undefined
}
