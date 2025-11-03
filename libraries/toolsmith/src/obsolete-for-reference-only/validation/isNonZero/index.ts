import and from "../../logic/and/index.ts"
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNumber from "../isNumber/index.ts"
import isUnequal from "../isUnequal/index.ts"

export default function isNonZero(value: unknown): value is number {
	return and(isNumber(value))(isUnequal(0)(value))
}
