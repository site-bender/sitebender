import type { Operand } from "@sitebender/architect-types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getOperands(
	operation: Partial<{ operands: Array<Operand> }>,
): Array<Operand> {
	return Array.isArray((operation as { operands?: unknown }).operands)
		? ((operation as { operands: Array<Operand> }).operands)
		: []
}
