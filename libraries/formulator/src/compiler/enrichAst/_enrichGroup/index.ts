import type { GroupNode } from "../../../parser/types/index.ts"
import type { EnrichedGroupNode } from "../../types/index.ts"

import enrichAstNode from "../index.ts"

//++ Enriches grouped expression node with propagated datatype
export default function enrichGroup(node: GroupNode): EnrichedGroupNode {
	const enrichedExpression = enrichAstNode(node.expression)

	return Object.freeze({
		_tag: "group",
		expression: enrichedExpression,
		position: node.position,
		datatype: enrichedExpression.datatype,
	})
}
