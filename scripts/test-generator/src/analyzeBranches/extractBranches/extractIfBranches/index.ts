/**
 * Extract if/else branches from AST node
 */

import type { ASTNode, BranchInfo } from "../../types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extract if/else branches from an if statement node
 * @param node The if statement AST node
 * @param parentFunction Optional parent function name
 * @returns Array of branch information for true and false paths
 */
export default function extractIfBranches(
	node: ASTNode,
	parentFunction?: string
): Array<BranchInfo> {
	const branches: Array<BranchInfo> = []
	
	if (!node.loc || !node.test) return branches
	
	const condition = node.test.raw || 'unknown'
	const location = {
		line: node.loc.start.line,
		column: node.loc.start.column
	}
	
	// True branch
	branches.push({
		id: computeBranchId('if', true, location.line),
		type: 'if',
		condition: condition,
		location,
		requiredInputs: [], // Will be filled by generateBranchInputs
		parentFunction
	})
	
	// False branch (if else exists or implicit)
	if (node.alternate !== undefined) {
		branches.push({
			id: computeBranchId('if', false, location.line),
			type: 'if',
			condition: `!(${condition})`,
			location,
			requiredInputs: [], // Will be filled by generateBranchInputs
			parentFunction
		})
	}
	
	return branches
}