import type { BranchPath, FunctionSignature } from "../types/index.ts"

import extractBranches from "./extractBranches/index.ts"
import generateBranchInputs from "./generateBranchInputs/index.ts"
import parseSourceCode from "./parseSourceCode/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function analyzeBranches(
	signature: FunctionSignature,
	sourceCode: string,
): Array<BranchPath> {
	const ast = parseSourceCode(sourceCode)
	const branches = extractBranches(ast)
	const branchesWithInputs = generateBranchInputs(branches, signature)

	return branchesWithInputs
}
