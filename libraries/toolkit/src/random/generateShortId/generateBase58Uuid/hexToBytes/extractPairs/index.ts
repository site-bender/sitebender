import unfold from "../../../../../simple/array/unfold/index.ts"

//++ Splits a hex string into pairs of characters
export default function extractPairs(hex: string): Array<string> {
	return unfold(function generatePair(remaining: string) {
		return remaining.length >= 2
			? [remaining.slice(0, 2), remaining.slice(2)]
			: null
	})(hex)
}

//?? [EXAMPLE] extractPairs("deadbeef") // ["de", "ad", "be", "ef"]
//?? [EXAMPLE] extractPairs("12345") // ["12", "34", "5"]
//?? [EXAMPLE] extractPairs("") // []