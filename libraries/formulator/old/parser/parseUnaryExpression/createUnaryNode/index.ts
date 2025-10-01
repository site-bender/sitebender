import type { AstNode, UnaryOpNode } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function createUnaryNode(
	operator: "+" | "-",
	operand: AstNode,
): UnaryOpNode {
	return {
		type: "UnaryOp",
		operator,
		operand,
	}
}
