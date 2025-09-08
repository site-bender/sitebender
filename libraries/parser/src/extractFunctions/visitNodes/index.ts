//++ Recursively visits all nodes in AST to find functions
import * as typescript from "npm:typescript@5.7.2"

import type { FunctionNode } from "../index.ts"

import processArrowFunction from "../processArrowFunction/index.ts"
import processFunctionDeclaration from "../processFunctionDeclaration/index.ts"
import processFunctionExpression from "../processFunctionExpression/index.ts"
import processMethodDeclaration from "../processMethodDeclaration/index.ts"

export default function visitNodes(
	sourceFile: typescript.SourceFile,
): ReadonlyArray<FunctionNode> {
	const accumulator: Array<FunctionNode> = []

	function visit(node: typescript.Node): void {
		// Process different function types
		if (typescript.isFunctionDeclaration(node)) {
			const functionNode = processFunctionDeclaration(node)
			if (functionNode) {
				accumulator.push(functionNode)
			}
		}

		if (typescript.isFunctionExpression(node)) {
			const functionNode = processFunctionExpression(node)
			if (functionNode) {
				accumulator.push(functionNode)
			}
		}

		if (typescript.isArrowFunction(node)) {
			const functionNode = processArrowFunction(node)
			if (functionNode) {
				accumulator.push(functionNode)
			}
		}

		if (typescript.isMethodDeclaration(node)) {
			const functionNode = processMethodDeclaration(node)
			if (functionNode) {
				accumulator.push(functionNode)
			}
		}

		// Continue traversal
		typescript.forEachChild(node, visit)
	}

	typescript.forEachChild(sourceFile, visit)
	return accumulator
}
