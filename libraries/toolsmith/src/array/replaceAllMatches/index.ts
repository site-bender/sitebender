import isNullish from "../../predicates/isNullish/index.ts"

//++ Replaces strings matching a pattern
const replaceAllMatches =
	(pattern: RegExp) =>
	(replacer: (item: string) => string) =>
	<T>(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		return array.map((item) =>
			typeof item === "string" && pattern.test(item)
				? (replacer(item) as T)
				: item
		)
	}

export default replaceAllMatches
