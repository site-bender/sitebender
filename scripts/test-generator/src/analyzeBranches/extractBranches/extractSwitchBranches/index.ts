/**
 * Extract switch/case branches from AST node
 */

import type { ASTNode, BranchInfo } from "../../types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extract switch/case branches from a switch statement node
 * @param node The switch statement AST node
 * @param parentFunction Optional parent function name
 * @returns Array of branch information for each case
 */
export default function extractSwitchBranches(
	node: ASTNode,
	parentFunction?: string
): Array<BranchInfo> {
	const branches: Array<BranchInfo> = []
	
	if (!node.loc || !node.discriminant) return branches
	
	const discriminant = node.discriminant.name || 'value'
	const location = {
		line: node.loc.start.line,
		column: node.loc.start.column
	}
	
	// Add branches for each case
	if (node.cases && Array.isArray(node.cases)) {
		for (let i = 0; i < node.cases.length; i++) {
			const caseNode = node.cases[i]
			const caseValue = caseNode.test?.raw || caseNode.test?.value || 'default'
			
			branches.push({
				id: computeBranchId('switch', caseValue, location.line + i),
				type: 'switch',
				condition: caseValue === 'default' 
					? `${discriminant} (default case)`
					: `${discriminant} === ${caseValue}`,
				location: {
					line: location.line + i + 1,
					column: location.column + 2
				},
				requiredInputs: [], // Will be filled by generateBranchInputs
				parentFunction
			})
		}
	}
	
	// If no explicit default case, add implicit default branch
	const hasDefault = node.cases?.some(c => !c.test)
	if (!hasDefault) {
		branches.push({
			id: computeBranchId('switch', 'implicit-default', location.line),
			type: 'switch',
			condition: `${discriminant} (no match)`,
			location,
			requiredInputs: [],
			parentFunction
		})
	}
	
	return branches
}