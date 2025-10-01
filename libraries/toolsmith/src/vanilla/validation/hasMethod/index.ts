import hasProperty from "../hasProperty/index.ts"
import isFunction from "../isFunction/index.ts"
import isNotNull from "../isNotNull/index.ts"
import isObject from "../isObject/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function hasMethod<T extends string>(
	name: T,
): (
	obj: unknown,
) => obj is
	& Record<string, unknown>
	& { [K in T]: (...args: Array<unknown>) => unknown } {
	return (
		obj: unknown,
	): obj is
		& Record<string, unknown>
		& { [K in T]: (...args: Array<unknown>) => unknown } =>
		isObject(obj) && isNotNull(obj) && hasProperty(name)(obj) &&
		isFunction((obj as Record<string, unknown>)[name])
}
