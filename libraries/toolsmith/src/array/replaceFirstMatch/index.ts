import isNullish from "../../predicates/isNullish/index.ts"
import findIndex from "../findIndex/index.ts"

//++ Replaces first string matching pattern
export default function replaceFirstMatch(pattern: RegExp) {
	return function withReplacer(replacer: (item: string) => string) {
		return function replaceInArray<T>(
			array: ReadonlyArray<T> | null | undefined,
		): Array<T> {
			if (isNullish(array)) {
				return []
			}
			const index = findIndex(function matchesPattern(item: T) {
				return typeof item === "string" && pattern.test(item)
			})(array as Array<T>)

			if (index === undefined) {
				return [...array]
			}
			const out = [...array]
			out[index] = replacer(out[index] as unknown as string) as T
			return out
		}
	}
}
