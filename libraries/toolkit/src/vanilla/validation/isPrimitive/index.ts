import isNull from "../isNull/index.ts"
import isObject from "../isObject/index.ts"
import isFunction from "../isFunction/index.ts"
import not from "../../logic/not/index.ts"
import or from "../../logic/or/index.ts"
import and from "../../logic/and/index.ts"

export default function isPrimitive(value: unknown): boolean {
	return or(
		isNull(value),
	)(
		and(
			not(isObject(value)),
		)(
			not(isFunction(value)),
		),
	)
}
