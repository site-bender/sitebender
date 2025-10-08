import isNull from "@sitebender/toolsmith/validation/isNull/index.ts"
import isUndefined from "@sitebender/toolsmith/validation/isUndefined/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

//++ Type guard that checks if a value is null or undefined
export default function isNullish(value: unknown): value is null | undefined {
	return or(isNull)(isUndefined)(value)
}
