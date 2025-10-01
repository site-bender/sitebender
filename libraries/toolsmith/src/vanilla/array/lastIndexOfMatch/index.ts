import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the last index matching a pattern
export default function lastIndexOfMatch(pattern: RegExp | string) {
	return function findLastIndexOfMatch(
		array: ReadonlyArray<string> | null | undefined,
	): number | undefined {
		if (isNullish(array) || array.length === 0) {
			return undefined
		}

		const regex = new RegExp(pattern)
		const index = array.reduce(
			function updateLastMatch(lastMatch, item, index) {
				return regex.test(item) ? index : lastMatch
			},
			-1,
		)
		return index === -1 ? undefined : index
	}
}
