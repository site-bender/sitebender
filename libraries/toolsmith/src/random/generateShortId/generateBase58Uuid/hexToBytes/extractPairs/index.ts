import unfold from "../../../../../array/unfold/index.ts"

//++ Splits a hex string into pairs of characters
export default function extractPairs(hex: string): Array<string> {
	return unfold(function generatePair(remaining: string) {
		//++ [EXCEPTION] .length, >=, .slice() operators permitted in Toolsmith for performance - provides hex string parsing wrapper
		return remaining.length >= 2
			? [remaining.slice(0, 2), remaining.slice(2)]
			: null
	})(hex)
}
