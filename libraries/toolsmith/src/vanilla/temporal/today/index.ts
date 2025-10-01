//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const today = (): Temporal.PlainDate => {
	return Temporal.Now.plainDateISO()
}

export default today
