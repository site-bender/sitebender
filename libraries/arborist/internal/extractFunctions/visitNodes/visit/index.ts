//++ Recursively visits a node and its children to find functions
import * as typescript from "npm:typescript@5.7.2"

import type { FunctionNode, TraversalMetadata } from "../../index.ts"

import processArrowFunction from "../../processArrowFunction/index.ts"
import processFunctionDeclaration from "../../processFunctionDeclaration/index.ts"
import processFunctionExpression from "../../processFunctionExpression/index.ts"
import processMethodDeclaration from "../../processMethodDeclaration/index.ts"
import collectMetadata from "./collectMetadata/index.ts"

export default function visit(
	accumulator: Array<FunctionNode>,
	metadata: TraversalMetadata,
) {
	return function (node: typescript.Node): void {
		// Collect metadata during traversal
		const updatedMetadata = collectMetadata(node, metadata)

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

		// Continue traversal with updated metadata
		typescript.forEachChild(node, visit(accumulator, updatedMetadata))
	}
}
