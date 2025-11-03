import isNotNull from "../isNotNull/index.ts"
import isObject from "../isObject/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function hasProperty<T extends string>(
	name: T,
): (obj: unknown) => obj is Record<string, unknown> & { [K in T]: unknown } {
	return (
		obj: unknown,
	): obj is Record<string, unknown> & { [K in T]: unknown } =>
		isObject(obj) && isNotNull(obj) && name in obj
}
