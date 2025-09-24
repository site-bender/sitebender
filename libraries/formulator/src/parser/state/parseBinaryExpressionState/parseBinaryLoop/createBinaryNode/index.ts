import type { AstNode } from "../../../../../types/index.ts"
import type { Operator } from "../../types/index.ts"

//++ Creates appropriate AST node based on operator category
export default function createBinaryNode(
	operator: Operator,
	leftNode: AstNode,
) {
	return function (rightNode: AstNode): AstNode {
		// Comparison operators map to Comparison nodes
		if (
			operator === "<" ||
			operator === ">" ||
			operator === "==" ||
			operator === "!=" ||
			operator === "<=" ||
			operator === ">="
		) {
			return {
				type: "Comparison",
				operator,
				left: leftNode,
				right: rightNode,
			}
		}

		// Arithmetic operators map to BinaryOp nodes
		return {
			type: "BinaryOp",
			operator,
			left: leftNode,
			right: rightNode,
		}
	}
}
