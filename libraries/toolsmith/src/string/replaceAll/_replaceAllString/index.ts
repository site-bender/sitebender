import type { ReplacerFunction } from "../../../types/string/index.ts"

//++ [EXCEPTION] Using native .replaceAll() method for performance
//++ This is a thin wrapper around native JavaScript .replaceAll()
export default function _replaceAllString(searchValue: string | RegExp) {
	return function _replaceAllStringWithSearch(
		replaceValue: string | ReplacerFunction,
	) {
		return function _replaceAllStringWithSearchAndReplace(
			input: string,
		): string {
			// Handle string search value
			if (typeof searchValue === "string") {
				if (typeof replaceValue === "string") {
					return input.replaceAll(searchValue, replaceValue)
				}
				return input.replaceAll(searchValue, replaceValue)
			}

			// Handle RegExp search value - ensure it has global flag
			//++ [EXCEPTION] Using .global, .source, .flags properties for RegExp
			const regex = searchValue.global
				? searchValue
				: new RegExp(searchValue.source, searchValue.flags + "g")

			if (typeof replaceValue === "string") {
				return input.replaceAll(regex, replaceValue)
			}
			return input.replaceAll(regex, replaceValue)
		}
	}
}
