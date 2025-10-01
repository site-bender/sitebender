//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const splitAt = (index: number) => (str: string): Array<string> => {
	// Handle negative indices
	const actualIndex = index < 0
		? Math.max(0, str.length + index)
		: Math.min(index, str.length)

	return [str.slice(0, actualIndex), str.slice(actualIndex)]
}

export default splitAt
