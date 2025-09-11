import type { AstNode } from "../../../../../types/index.ts"
import type { Operator } from "../../types/index.ts"

//++ Creates a binary operation AST node
export default function createBinaryNode(
	operator: Operator,
	leftNode: AstNode,
) {
	return function (rightNode: AstNode): AstNode {
		return {
			type: "BinaryOp",
			operator,
			left: leftNode,
			right: rightNode,
		}
	}
}
