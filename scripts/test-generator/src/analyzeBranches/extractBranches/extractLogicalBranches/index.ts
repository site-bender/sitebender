/**
 * Extract logical operator branches from AST node
 */

import type { ASTNode, BranchInfo } from "../../types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extract logical operator (&& ||) branches from a logical expression node
 * @param node The logical expression AST node
 * @param parentFunction Optional parent function name
 * @returns Array of branch information for short-circuit paths
 */
export default function extractLogicalBranches(
	node: ASTNode,
	parentFunction?: string
): Array<BranchInfo> {
	const branches: Array<BranchInfo> = []
	
	if (!node.loc || !node.operator || !node.left) return branches
	
	const leftCondition = node.left.raw || 'left'
	const location = {
		line: node.loc.start.line,
		column: node.loc.start.column
	}
	
	if (node.operator === '&&') {
		// AND: short-circuits on false
		branches.push({
			id: computeBranchId('logical', 'and-short', location.line),
			type: 'logical',
			condition: `!${leftCondition} (short-circuit)`,
			location,
			requiredInputs: [], // Will be filled by generateBranchInputs
			parentFunction
		})
		
		// AND: evaluates right side
		branches.push({
			id: computeBranchId('logical', 'and-eval', location.line),
			type: 'logical',
			condition: `${leftCondition} (evaluate right)`,
			location,
			requiredInputs: [],
			parentFunction
		})
	} else if (node.operator === '||') {
		// OR: short-circuits on true
		branches.push({
			id: computeBranchId('logical', 'or-short', location.line),
			type: 'logical',
			condition: `${leftCondition} (short-circuit)`,
			location,
			requiredInputs: [],
			parentFunction
		})
		
		// OR: evaluates right side
		branches.push({
			id: computeBranchId('logical', 'or-eval', location.line),
			type: 'logical',
			condition: `!${leftCondition} (evaluate right)`,
			location,
			requiredInputs: [],
			parentFunction
		})
	}
	
	return branches
}