/*++
 + Type guard that checks if a value is an Array using Array.isArray
 + [EXCEPTION] unknown is permitted in predicates
 */
export default function isArray(value: unknown): value is Array<unknown> {
	/*++
	 + [EXCEPTION] Uses OOP method by permission
	 + This is a primitive type guard operation with no higher-level abstraction available
	 */
	return Array.isArray(value)
}
