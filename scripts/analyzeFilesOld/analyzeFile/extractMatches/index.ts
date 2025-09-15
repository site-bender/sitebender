import until from "@sitebender/toolkit/vanilla/combinator/until/index.ts"

//++ Extracts all regex matches from text functionally without mutation
export default function extractMatches(regex: RegExp): (text: string) => Array<RegExpExecArray> {
	return function extractMatchesFromText(text: string): Array<RegExpExecArray> {
		regex.lastIndex = 0 // Reset regex state

		const isDone = (state: { done: boolean; matches: Array<RegExpExecArray> }): boolean => state.done

		const getNextState = (state: { done: boolean; matches: Array<RegExpExecArray> }): { done: boolean; matches: Array<RegExpExecArray> } => {
			const match = regex.exec(text)
			return match === null
				? { done: true, matches: state.matches }
				: { done: false, matches: [...state.matches, match] }
		}

		const initialState = { done: false, matches: [] as Array<RegExpExecArray> }

		return until(isDone)(getNextState)(initialState).matches
	}
}