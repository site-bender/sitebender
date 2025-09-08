//++ Processes a function expression node into FunctionNode
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionNode } from "../index.ts"

export default function processFunctionExpression(
	node: typescript.FunctionExpression,
): FunctionNode {
	const name = node.name?.getText() ?? "anonymous"
	
	return {
		name,
		node,
		isDefault: false,
		isExported: false,
		startPos: node.pos,
		endPos: node.end,
		hasBody: !!node.body,
	}
}