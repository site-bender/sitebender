import type { Token } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function isUnaryOperator(token: Token): boolean {
	return token.type === "PLUS" || token.type === "MINUS"
}
