import type { ReplacerFunction } from "../../../types/string/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const replace =
	(searchValue: string | RegExp) =>
	(replaceValue: string | ReplacerFunction) =>
	(str: string): string => {
		// TypeScript properly infers the overload when we check the type
		if (typeof replaceValue === "string") {
			return str.replace(searchValue, replaceValue)
		}
		// Function replacer
		return str.replace(searchValue, replaceValue)
	}

export default replace
