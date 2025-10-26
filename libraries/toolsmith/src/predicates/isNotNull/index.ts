import not from "../../logic/not/index.ts"
import isNull from "../isNull/index.ts"

/*++
 + Type guard that checks if a value is not null
 + Inverse of isNull predicate
 */
export default function isNotNull<T>(value: T | null): value is T {
	return not(isNull(value))
}
