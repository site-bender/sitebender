import type { AstNode } from "../../parser/types/index.ts"
import type { EnrichedAstNode } from "../types/index.ts"

import enrichNumberLiteral from "./_enrichNumberLiteral/index.ts"
import enrichVariable from "./_enrichVariable/index.ts"
import enrichBinaryOperator from "./_enrichBinaryOperator/index.ts"
import enrichUnaryOperator from "./_enrichUnaryOperator/index.ts"
import enrichFunctionCall from "./_enrichFunctionCall/index.ts"
import enrichGroup from "./_enrichGroup/index.ts"

//++ Enriches any AST node with datatype annotations (dispatcher)
export default function enrichAstNode(node: AstNode): EnrichedAstNode {
	if (node._tag === "numberLiteral") {
		return enrichNumberLiteral(node)
	}

	if (node._tag === "variable") {
		return enrichVariable(node)
	}

	if (node._tag === "binaryOperator") {
		return enrichBinaryOperator(node)
	}

	if (node._tag === "unaryOperator") {
		return enrichUnaryOperator(node)
	}

	if (node._tag === "functionCall") {
		return enrichFunctionCall(node)
	}

	if (node._tag === "group") {
		return enrichGroup(node)
	}

	const _exhaustive: never = node
	throw new Error(
		`Unknown node type: ${(_exhaustive as { _tag: string })._tag}`,
	)
}
