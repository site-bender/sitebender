//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getQuarter(date: Date): number {
	return Math.floor(date.getMonth() / 3) + 1
}
