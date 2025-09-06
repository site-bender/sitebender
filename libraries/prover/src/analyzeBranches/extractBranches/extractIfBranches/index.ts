import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extracts if/else branch paths from an AST
 * Pure function that finds all if statements and their branches
 * @param ast - The AST node to analyze
 * @returns Array of if/else branch paths
 * @example
 * const branches = extractIfBranches(ast)
 * // Returns: [{ id: "if_1", type: BranchType.If, ... }]
 */
export default function extractIfBranches(ast: SourceNode): Array<BranchPath> {
	if (!ast.children) return []
	
	return ast.children.flatMap((node: SourceNode, index: number) => {
		if (node.type !== 'IfStatement') return []
		
		const branches: Array<BranchPath> = []
		
		// If branch
		branches.push({
			id: computeBranchId('if', index, 0),
			condition: node.test?.value || '',
			line: node.start,
			column: 0,
			type: 'if' as BranchType,
			requiredInputs: []
		})
		
		// Else branch (implicit)
		branches.push({
			id: computeBranchId('else', index, 0),
			condition: `!(${node.test?.value || ''})`,
			line: node.start,
			column: 0,
			type: 'else' as BranchType,
			requiredInputs: []
		})
		
		return branches
	})
}