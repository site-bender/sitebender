import type { Token } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getUnaryOperator(token: Token): "+" | "-" | null {
	if (token.type === "PLUS") return "+"
	if (token.type === "MINUS") return "-"
	return null
}
