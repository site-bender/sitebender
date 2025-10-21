import isNull from "@sitebender/toolsmith/validation/isNull/index.ts"
import isObject from "@sitebender/toolsmith/validation/isObject/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

//++ Type guard that checks if a value is a plain object (object literal or Object.create(null))
export default function isPlainObject(value: unknown): boolean {
	// Check if it's an object type and not null
	//++ [EXCEPTION] sad path first to avoid the call to `.getPrototypeOf`
	if (or(not(isObject(value)))(isNull(value))) {
		return false
	}

	// Get the prototype
	const proto = Object.getPrototypeOf(value)

	// Plain objects have either Object.prototype or null as prototype
	/*++
	 + [EXCEPTION] Uses === operator to check prototype identity
	 + This is a primitive identity check with no higher-level abstraction available
	 */
	return or(isNull(proto))(proto === Object.prototype)
}
