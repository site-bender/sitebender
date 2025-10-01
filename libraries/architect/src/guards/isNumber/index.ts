import type { Value } from "@sitebender/architect-types/index.ts"

import { MATCHERS } from "../../guards/constants/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function isNumber(value: Value): value is number {
	return MATCHERS.number.test(String(value))
}
