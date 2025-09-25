import type { BranchPath, FunctionSignature } from "../types/index.ts"

import extractBranches from "./extractBranches/index.ts"
import generateBranchInputs from "./generateBranchInputs/index.ts"
import parseSourceCode from "./parseSourceCode/index.ts"

/**
 * Analyzes function source code to extract branch paths for coverage testing
 * @param signature - The function signature to analyze
 * @param sourceCode - The source code of the function
 * @returns Array of branch paths with required test inputs
 * @example
 * const branches = analyzeBranches(signature, sourceCode)
 * // Returns: [{ id: "if_1", condition: "x > 0", ... }]
 */
export default function analyzeBranches(
	signature: FunctionSignature,
	sourceCode: string,
): Array<BranchPath> {
	const ast = parseSourceCode(sourceCode)
	const branches = extractBranches(ast)
	const branchesWithInputs = generateBranchInputs(branches, signature)

	return branchesWithInputs
}
