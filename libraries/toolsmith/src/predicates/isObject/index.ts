import type { Value } from "../../types/index.ts"
import isNull from "../../predicates/isNull/index.ts"
import not from "../../logic/not/index.ts"

//++ Type guard that checks if a value is a non-null object (includes arrays, functions, dates, etc.)
export default function isObject(value: Value): value is object {
	return not(isNull(value)) && typeof value === "object"
}
