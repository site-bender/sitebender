import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const escapeRegExp = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Escape all regex metacharacters
	// Characters that have special meaning in regex: . * + ? ^ $ { } ( ) | [ ] \
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export default escapeRegExp
