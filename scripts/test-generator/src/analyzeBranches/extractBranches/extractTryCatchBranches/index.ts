/**
 * Extract try/catch/finally branches from AST node
 */

import type { ASTNode, BranchInfo } from "../../types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extract try/catch/finally branches from a try statement node
 * @param node The try statement AST node
 * @param parentFunction Optional parent function name
 * @returns Array of branch information for success and error paths
 */
export default function extractTryCatchBranches(
	node: ASTNode,
	parentFunction?: string
): Array<BranchInfo> {
	const branches: Array<BranchInfo> = []
	
	if (!node.loc) return branches
	
	const location = {
		line: node.loc.start.line,
		column: node.loc.start.column
	}
	
	// Success path (no exception thrown)
	branches.push({
		id: computeBranchId('try', 'success', location.line),
		type: 'try',
		condition: 'no exception thrown',
		location,
		requiredInputs: [], // Will be filled by generateBranchInputs
		parentFunction
	})
	
	// Error path (exception thrown and caught)
	if (node.handler !== undefined) {
		branches.push({
			id: computeBranchId('try', 'catch', location.line),
			type: 'try',
			condition: 'exception thrown',
			location: {
				line: location.line + 1, // Approximate catch location
				column: location.column
			},
			requiredInputs: [],
			parentFunction
		})
	}
	
	// Finally block (always executes if present)
	if (node.finalizer !== undefined) {
		branches.push({
			id: computeBranchId('try', 'finally', location.line),
			type: 'try',
			condition: 'finally block (always)',
			location: {
				line: location.line + 2, // Approximate finally location
				column: location.column
			},
			requiredInputs: [],
			parentFunction
		})
	}
	
	return branches
}