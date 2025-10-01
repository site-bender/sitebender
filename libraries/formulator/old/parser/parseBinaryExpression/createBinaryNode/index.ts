import type {
	AstNode,
	BinaryOpNode,
	ComparisonNode,
} from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function createBinaryNode(
	operator: string,
	left: AstNode,
	right: AstNode,
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
