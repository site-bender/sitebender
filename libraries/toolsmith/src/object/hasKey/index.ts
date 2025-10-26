import isPlainObject from "../../predicates/isPlainObject/index.ts"
import isString from "../../predicates/isString/index.ts"

/*++
 + Checks if a key exists in an object (own property only, not prototype)
 + Returns boolean indicating presence
 + Curried for partial application with fixed object
 */
export default function hasKey(obj: Readonly<Record<string, unknown>>) {
	return function hasKeyInObject(key: string): boolean {
		/*++
		 + [EXCEPTION] .hasOwn is permitted here for performance reasons
		 + This is the ONLY place .hasOwn should be used
		 + Everywhere else, use the `hasKey` function instead
		 */
		return isPlainObject(obj) && isString(key) && Object.hasOwn(obj, key)
	}
}
