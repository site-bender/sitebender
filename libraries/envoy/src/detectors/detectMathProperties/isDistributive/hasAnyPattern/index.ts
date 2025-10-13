import some from "../../../../../../toolsmith/src/array/some/index.ts"
import test from "../../../../../../toolsmith/src/string/test/index.ts"

//++ Checks if source matches any of the provided patterns
export default function hasAnyPattern(patterns: ReadonlyArray<RegExp>) {
	return function checkSource(source: string): boolean {
		return some(function matchesPattern(pattern: RegExp) {
			return test(pattern)(source)
		})(Array.from(patterns))
	}
}
