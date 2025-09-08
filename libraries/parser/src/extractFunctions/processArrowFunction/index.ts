//++ Processes an arrow function node into FunctionNode
import * as typescript from "npm:typescript@5.7.2"
import type { FunctionNode } from "../index.ts"

export default function processArrowFunction(
	node: typescript.ArrowFunction,
): FunctionNode {
	return {
		name: "arrow",
		node,
		isDefault: false,
		isExported: false,
		startPos: node.pos,
		endPos: node.end,
		hasBody: typescript.isBlock(node.body),
	}
}