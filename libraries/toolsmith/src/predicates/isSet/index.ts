/*++
 + Type guard that checks if a value is a Set
 */
export default function isSet<T>(value: unknown): value is Set<T> {
	//++ [EXCEPTION] instanceof permitted in Toolsmith for performance - provides type predicate wrapper
	return value instanceof Set
}
