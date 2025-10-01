//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function countCurryLevels(returnType: string): number {
	const matches = returnType.match(/=>/g)
	return matches ? matches.length : 0
}
