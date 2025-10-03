import type { BinaryOperatorNode } from "../../../parser/types/index.ts"
import type { EnrichedBinaryOperatorNode } from "../../types/index.ts"
import { BINARY_OPERATOR_TO_OPERATION } from "../../constants/index.ts"

import enrichAstNode from "../index.ts"

//++ Enriches binary operator node with semantic operation name and datatype
export default function enrichBinaryOperator(
	node: BinaryOperatorNode,
): EnrichedBinaryOperatorNode {
	const enrichedLeft = enrichAstNode(node.left)
	const enrichedRight = enrichAstNode(node.right)

	const operation = BINARY_OPERATOR_TO_OPERATION[node.operator]

	return Object.freeze({
		_tag: "binaryOperator",
		operator: operation,
		left: enrichedLeft,
		right: enrichedRight,
		position: node.position,
		datatype: enrichedLeft.datatype,
	})
}
