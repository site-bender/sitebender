import type { UnaryOperatorNode } from "../../../parser/types/index.ts"
import type { EnrichedUnaryOperatorNode } from "../../types/index.ts"
import { UNARY_OPERATOR_TO_OPERATION } from "../../constants/index.ts"

import enrichAstNode from "../index.ts"

//++ Enriches unary operator node with semantic operation name and datatype
export default function enrichUnaryOperator(
	node: UnaryOperatorNode,
): EnrichedUnaryOperatorNode {
	const enrichedOperand = enrichAstNode(node.operand)
	const operation = UNARY_OPERATOR_TO_OPERATION[node.operator]

	return Object.freeze({
		_tag: "unaryOperator",
		operator: operation,
		operand: enrichedOperand,
		position: node.position,
		datatype: enrichedOperand.datatype,
	})
}
