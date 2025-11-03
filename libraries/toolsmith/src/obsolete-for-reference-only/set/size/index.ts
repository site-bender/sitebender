//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const size = <T>(set: Set<T> | null | undefined): number =>
	set instanceof Set ? set.size : 0

export default size
