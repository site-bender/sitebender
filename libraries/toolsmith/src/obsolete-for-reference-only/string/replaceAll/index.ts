import type { ReplacerFunction } from "../../../types/string/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const replaceAll =
	(searchValue: string | RegExp) =>
	(replaceValue: string | ReplacerFunction) =>
	(str: string): string => {
		if (typeof searchValue === "string") {
			// Type guard to properly handle string vs function replacer
			if (typeof replaceValue === "function") {
				// For string search with function replacer, we split and rebuild
				const parts = str.split(searchValue)
				if (parts.length === 1) return str // No matches found

				return parts.reduce((result, part, index) => {
					if (index === 0) return part
					const matchIndex = result.length +
						(searchValue.length * (index - 1))
					const replacement = replaceValue(
						searchValue,
						matchIndex,
						str,
					)
					return result + replacement + part
				})
			}
			return str.replaceAll(searchValue, replaceValue)
		}
		// For RegExp, ensure it has global flag
		const regex = searchValue.global
			? searchValue
			: new RegExp(searchValue.source, searchValue.flags + "g")
		if (typeof replaceValue === "function") {
			return str.replaceAll(regex, (
				substring: string,
				...args: string[]
			) => (replaceValue as ReplacerFunction)(substring, ...args))
		}
		return str.replaceAll(regex, replaceValue)
	}

export default replaceAll
