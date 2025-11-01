import isNull from "../../predicates/isNull/index.ts"
import not from "../../logic/not/index.ts"

//++ Type guard that checks if a value is a non-null object (includes arrays, functions, dates, etc.)
export default function isObject(value: unknown): value is object {
	//++ [EXCEPTION] &&, typeof, and === permitted in Toolsmith for performance - provides type predicate wrapper
	return not(isNull(value)) && typeof value === "object"
}
