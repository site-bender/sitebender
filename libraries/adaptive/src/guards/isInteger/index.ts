import type { Value } from "@adaptiveTypes/index.ts"

import { MATCHERS } from "../../guards/constants/index.ts"

export default function isInteger(value: Value): value is number {
	return MATCHERS.integer.test(String(value))
}
