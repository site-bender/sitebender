import isNull from "@sitebender/toolsmith/validation/isNull/index.ts"
import isObject from "@sitebender/toolsmith/validation/isObject/index.ts"

//++ Type guard that checks if a value is a plain object (object literal or Object.create(null))
export default function isPlainObject(value: unknown): boolean {
	// Check if it's an object type and not null
	if (!isObject(value) || isNull(value)) {
		return false
	}

	// Get the prototype
	const proto = Object.getPrototypeOf(value)

	// Plain objects have either Object.prototype or null as prototype
	return isNull(proto) || proto === Object.prototype
}
