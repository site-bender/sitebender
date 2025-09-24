import unfold from "@sitebender/toolsmith/vanilla/array/unfold/index.ts"

//++ Regex match state for unfold
type RegexState = { regex: RegExp; str: string }

//++ Extracts all regex matches from a string using unfold
export default function extractMatches(regex: RegExp): (str: string) => Array<RegExpExecArray> {
	return function extractMatchesFromString(str: string): Array<RegExpExecArray> {
		return unfold<RegexState, RegExpExecArray>(
			function getNextMatch(state: RegexState) {
				const match = state.regex.exec(state.str)
				return match ? [match, state] : null
			}
		)({ regex, str })
	}
}
