import and from "../../logic/and/index.ts"
import isEqual from "../isEqual/index.ts"
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNumber from "../isNumber/index.ts"

export default function isZero(value: unknown): value is number {
	return and(isNumber(value))(isEqual(0)(value))
}
