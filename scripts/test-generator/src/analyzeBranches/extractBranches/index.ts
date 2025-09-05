/**
 * Extract all branches from AST
 */

import type { ASTNode, BranchInfo } from "../types/index.ts"
import extractIfBranches from "./extractIfBranches/index.ts"
import extractTernaryBranches from "./extractTernaryBranches/index.ts"
import extractSwitchBranches from "./extractSwitchBranches/index.ts"
import extractLogicalBranches from "./extractLogicalBranches/index.ts"
import extractTryCatchBranches from "./extractTryCatchBranches/index.ts"

/**
 * Extract all branches from an AST
 * @param ast The Abstract Syntax Tree
 * @param functionName Optional function name to scope extraction
 * @returns Array of branch information
 */
export default function extractBranches(
	ast: ASTNode,
	functionName?: string
): Array<BranchInfo> {
	const branches: Array<BranchInfo> = []
	
	// Traverse the AST and extract branches
	const nodes = Array.isArray(ast.body) ? ast.body : [ast.body].filter(Boolean)
	
	for (const node of nodes) {
		if (!node) continue
		
		switch (node.type) {
			case 'IfStatement':
				branches.push(...extractIfBranches(node, functionName))
				break
			case 'ConditionalExpression':
				branches.push(...extractTernaryBranches(node, functionName))
				break
			case 'SwitchStatement':
				branches.push(...extractSwitchBranches(node, functionName))
				break
			case 'LogicalExpression':
				branches.push(...extractLogicalBranches(node, functionName))
				break
			case 'TryStatement':
				branches.push(...extractTryCatchBranches(node, functionName))
				break
		}
		
		// Recursively extract from nested nodes
		if (node.body) {
			const nestedBranches = extractBranches(
				{ type: 'Program', body: node.body },
				functionName
			)
			branches.push(...nestedBranches)
		}
	}
	
	return branches
}