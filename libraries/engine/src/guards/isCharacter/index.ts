import type { Value } from "@sitebender/engine-types/index.ts"

import isString from "../../guards/isString/index.ts"

export default function isCharacter(value: Value): value is string {
	return isString(value) && value.length === 1
}
