import type { AstNode, UnaryOpNode } from "../../../types/index.ts"

/**
 * Creates a unary operation AST node
 * @param operator - The unary operator ("+" or "-")
 * @param operand - The operand AST node
 * @returns UnaryOp AST node
 */
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
