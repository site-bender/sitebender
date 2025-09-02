import type { Value } from "@engineTypes/index.ts"

import isBoolean from "../../guards/isBoolean/index.ts"

export default function isEmptyStringOrBoolean(
	value: Value,
): value is "" | boolean {
	return value === "" || isBoolean(value)
}
