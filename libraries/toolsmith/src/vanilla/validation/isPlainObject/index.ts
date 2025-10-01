import isNull from "../isNull/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function isPlainObject(value: unknown): boolean {
	// Check if it's an object type and not null
	if (typeof value !== "object" || isNull(value)) {
		return false
	}

	// Get the prototype
	const proto = Object.getPrototypeOf(value)

	// Plain objects have either Object.prototype or null as prototype
	return isNull(proto) || proto === Object.prototype
}
