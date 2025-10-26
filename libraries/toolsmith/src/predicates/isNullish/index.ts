import isNull from "../isNull/index.ts"
import isUndefined from "../isUndefined/index.ts"

//++ Type guard that checks if a value is null or undefined
export default function isNullish(value: unknown): value is null | undefined {
	return isNull(value) || isUndefined(value)
}
