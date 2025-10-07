//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function createDeterministicId(seed: string) {
	let counter = 0
	return () => `${seed}-${(counter++).toString(36)}`
}
