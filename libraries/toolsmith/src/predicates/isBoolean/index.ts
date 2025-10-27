//++ Type guard that checks if a value is a boolean primitive (not Boolean object)
export default function isBoolean(value: unknown): value is boolean {
	/*++
	 + [EXCEPTION] Uses === operator to check prototype identity for performance reasons
	 */
	return typeof value === "boolean"
}
