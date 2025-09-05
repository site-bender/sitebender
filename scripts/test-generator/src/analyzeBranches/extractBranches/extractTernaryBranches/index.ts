/**
 * Extract ternary operator branches from AST node
 */

import type { ASTNode, BranchInfo } from "../../types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extract ternary operator branches from a conditional expression node
 * @param node The conditional expression AST node
 * @param parentFunction Optional parent function name
 * @returns Array of branch information for true and false paths
 */
export default function extractTernaryBranches(
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
	
	// True branch (? path)
	branches.push({
		id: computeBranchId('ternary', true, location.line),
		type: 'ternary',
		condition: condition,
		location,
		requiredInputs: [], // Will be filled by generateBranchInputs
		parentFunction
	})
	
	// False branch (: path)
	branches.push({
		id: computeBranchId('ternary', false, location.line),
		type: 'ternary',
		condition: `!(${condition})`,
		location: {
			line: location.line,
			column: location.column + 2 // Approximate : position
		},
		requiredInputs: [], // Will be filled by generateBranchInputs
		parentFunction
	})
	
	return branches
}