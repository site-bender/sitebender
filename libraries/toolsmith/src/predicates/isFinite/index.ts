//++ Type guard that checks if a value is a finite number
export default function isFinite(value: unknown): value is number {
	/*++
	 + [EXCEPTION] Uses Number.isFinite for primitive finite checking
	 + This is a primitive type checking operation with no higher-level abstraction available
	 + Returns false for non-numbers, Infinity, -Infinity, and NaN
	 */
	return Number.isFinite(value)
}
