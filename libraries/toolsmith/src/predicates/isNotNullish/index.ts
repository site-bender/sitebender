import not from "../../logic/not/index.ts"
import isNullish from "../isNullish/index.ts"

/*++
 + Type guard that checks if a value is not null or undefined
 + Inverse of isNullish predicate
 */
export default function isNotNullish<T>(
	value: T | null | undefined,
): value is T {
	return not(isNullish(value))
}
