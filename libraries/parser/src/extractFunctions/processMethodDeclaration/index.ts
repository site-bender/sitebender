//++ Processes a method declaration node into FunctionNode
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionNode } from "../index.ts"

export default function processMethodDeclaration(
	node: typescript.MethodDeclaration,
): FunctionNode {
	const name = node.name?.getText() ?? "method"
	
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