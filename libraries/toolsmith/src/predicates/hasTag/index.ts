import isPlainObject from "../isPlainObject/index.ts"
import getTag from "../../object/getTag/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"

/*++
 + Type guard that checks if an object has a specific _tag value
 + Curried predicate for use with filter, find, map, etc.
 + Narrows the type to objects with the specified tag
 */
export default function hasTag<T extends string>(tag: T) {
	return function hasTagWithTag<O extends { _tag: string }>(
		obj: O,
	): obj is O & { _tag: T } {
		if (isPlainObject(obj)) {
			const tagResult = getTag(obj)
			const objTag = getOrElse("")(tagResult)

			/*++
			 + [EXCEPTION] Uses === operator to check prototype identity for performance reasons
			 */
			return objTag === tag
		}

		return false
	}
}
