import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

import hasDefaultAndName from "../hasDefaultAndName/index.ts"

//++ Extracts default function names from matches
export default function extractDefaultNames(
	matches: Array<RegExpExecArray>,
): Array<string> {
	return reduce<RegExpExecArray, Array<string>>(
		function addDefaultName(
			acc: Array<string>,
			match: RegExpExecArray,
		): Array<string> {
			return hasDefaultAndName(match) ? [...acc, match[3]] : acc
		},
	)([])(matches)
}
