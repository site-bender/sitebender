//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const now = (): Temporal.Instant => {
	return Temporal.Now.instant()
}

export default now
