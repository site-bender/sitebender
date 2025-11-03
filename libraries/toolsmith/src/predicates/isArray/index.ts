/*++
 + Type guard that checks if a value is an Array using Array.isArray
 + [EXCEPTION] unknown is permitted in predicates
 */
export default function isArray<T = unknown>(
	value: unknown,
): value is ReadonlyArray<T> {
	/*++
	 + [EXCEPTION] Uses OOP method by permission
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return Array.isArray(value)
}
