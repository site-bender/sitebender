/**
 * Analyze source code to extract all branches for coverage testing
 */

import type { BranchInfo } from "./types/index.ts"
import parseSourceCode from "./parseSourceCode/index.ts"
import extractBranches from "./extractBranches/index.ts"
import generateBranchInputs from "./generateBranchInputs/index.ts"

/**
 * Analyze source code and extract all branch information
 * @param sourceCode The source code to analyze
 * @param functionName Optional function name to scope analysis
 * @returns Array of branch information with required test inputs
 */
export default function analyzeBranches(
	sourceCode: string,
	functionName?: string
): Array<BranchInfo> {
	// Parse source code to AST
	const ast = parseSourceCode(sourceCode)
	
	// Extract all branches from AST
	const branches = extractBranches(ast, functionName)
	
	// Generate inputs for each branch
	const branchesWithInputs = branches.map(branch => ({
		...branch,
		requiredInputs: generateBranchInputs(branch)
	}))
	
	return branchesWithInputs
}