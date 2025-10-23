import { Anything } from "../../types/index.ts"

import isNull from "../isNull/index.ts"
import isUndefined from "../isUndefined/index.ts"

//++ Type guard that checks if a value is null or undefined
export default function isNullish(value: Anything): value is null | undefined {
	return isNull(value) || isUndefined(value)
}
