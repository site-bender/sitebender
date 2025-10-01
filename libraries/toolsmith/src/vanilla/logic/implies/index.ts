//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const implies = (antecedent: unknown) => (consequent: unknown): boolean =>
	!antecedent || Boolean(consequent)

export default implies
