import isNull from "@sitebender/toolsmith/validation/isNull/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

//++ Type guard that checks if a value is a non-null object (includes arrays, functions, dates, etc.)
export default function isObject(value: unknown): value is object {
	return not(isNull(value)) && typeof value === "object"
}
