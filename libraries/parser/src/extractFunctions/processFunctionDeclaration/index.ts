//++ Processes a function declaration node into FunctionNode
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionNode } from "../index.ts"
import hasExportModifier from "../hasExportModifier/index.ts"
import hasDefaultModifier from "../hasDefaultModifier/index.ts"

export default function processFunctionDeclaration(
	node: typescript.FunctionDeclaration,
): FunctionNode | null {
	const name = node.name?.getText() ?? "anonymous"
	const isExported = hasExportModifier(node)
	const isDefault = hasDefaultModifier(node)
	
	return {
		name,
		node,
		isDefault,
		isExported,
		startPos: node.pos,
		endPos: node.end,
		hasBody: !!node.body,
	}
}