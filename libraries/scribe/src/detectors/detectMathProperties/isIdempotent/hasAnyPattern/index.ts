import some from "../../../../../../../libraries/toolkit/src/simple/array/some/index.ts"
import test from "../../../../../../../libraries/toolkit/src/simple/string/test/index.ts"

//++ Checks if source matches any of the provided patterns
export default function hasAnyPattern(patterns: ReadonlyArray<RegExp>) {
	return function checkSource(source: string): boolean {
		return some(function matchesPattern(pattern: RegExp) {
			return test(pattern)(source)
		})(Array.from(patterns))
	}
}

//?? [EXAMPLE] hasAnyPattern([/Math\.abs/, /Math\.floor/])("Math.abs(x)") // true
//?? [EXAMPLE] hasAnyPattern([/Set/, /Map/])("new Set()") // true