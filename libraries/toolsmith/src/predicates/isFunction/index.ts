/*++
 + Type predicate that checks if a value is a function
 + [EXCEPTION] unknown is permitted in predicates
 */
export default function isFunction(value: unknown): value is (...args: Array<unknown>) => unknown {
	return typeof value === "function"
}
