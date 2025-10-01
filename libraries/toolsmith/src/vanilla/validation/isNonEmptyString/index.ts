import isNotEmpty from "../isNotEmpty/index.ts"
import isString from "../isString/index.ts"

//++ Type guard that checks if a value is a non-empty string primitive
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function isNonEmptyString(value: unknown): value is string {
	return isString(value) && isNotEmpty(value)
}
