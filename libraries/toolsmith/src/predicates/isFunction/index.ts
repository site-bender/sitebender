/*++
 + Type predicate that checks if a value is a function
 + [EXCEPTION] unknown is permitted in predicates
 */
export default function isFunction(
	value: unknown,
): value is (...args: Array<unknown>) => unknown {
	//++ [EXCEPTION] typeof and === permitted in Toolsmith for performance - provides type predicate wrapper
	return typeof value === "function"
}
