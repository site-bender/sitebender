import type {
	ASTNode,
	BinaryOpNode,
	ComparisonNode,
} from "../../../types/index.ts"

/**
 * Creates appropriate binary AST node based on operator type
 * @param operator - The operator string
 * @param left - Left operand AST node
 * @param right - Right operand AST node
 * @returns Binary or comparison AST node
 */
export default function createBinaryNode(
	operator: string,
	left: ASTNode,
	right: ASTNode,
): BinaryOpNode | ComparisonNode {
	if (
		operator === "<" || operator === ">" || operator === "==" ||
		operator === "!=" || operator === "<=" || operator === ">="
	) {
		return {
			type: "Comparison",
			operator,
			left,
			right,
		}
	}

	return {
		type: "BinaryOp",
		operator: operator as "+" | "-" | "*" | "/" | "^",
		left,
		right,
	}
}
