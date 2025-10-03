import type { FunctionCallNode } from "../../../parser/types/index.ts"
import type { EnrichedFunctionCallNode } from "../../types/index.ts"

import enrichAstNode from "../index.ts"

//++ Enriches function call node with datatype annotation
export default function enrichFunctionCall(
	node: FunctionCallNode,
): EnrichedFunctionCallNode {
	const enrichedArguments = node.arguments.map(enrichAstNode)

	return Object.freeze({
		_tag: "functionCall",
		name: node.name,
		arguments: Object.freeze(enrichedArguments),
		position: node.position,
		datatype: "Number",
	})
}
