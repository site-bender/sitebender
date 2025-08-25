import type { GlobalAttributes, Value } from "../../../types/index.ts"

import isBoolean from "../../guards/isBoolean/index.ts"

export default function isEmptyStringOrBoolean(
	value: unknown,
): value is "" | boolean {
	return value === "" || isBoolean(value)
}
