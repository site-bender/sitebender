import isNull from "../isNull/index.ts"
import isUndefined from "../isUndefined/index.ts"

//++ Type guard that checks if a value is null or undefined
export default function isNullish(value: unknown): value is null | undefined {
	//++ [EXCEPTION] || permitted in Toolsmith for performance - provides type predicate wrapper
	return isNull(value) || isUndefined(value)
}
