import type { BranchPath } from "../../types/index.ts"
import type { SourceNode } from "../parseSourceCode/types/index.ts"

import extractIfBranches from "./extractIfBranches/index.ts"
import extractLogicalBranches from "./extractLogicalBranches/index.ts"
import extractSwitchBranches from "./extractSwitchBranches/index.ts"
import extractTernaryBranches from "./extractTernaryBranches/index.ts"
import extractTryCatchBranches from "./extractTryCatchBranches/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function extractBranches(ast: SourceNode): Array<BranchPath> {
	const ifBranches = extractIfBranches(ast)
	const ternaryBranches = extractTernaryBranches(ast)
	const switchBranches = extractSwitchBranches(ast)
	const tryCatchBranches = extractTryCatchBranches(ast)
	const logicalBranches = extractLogicalBranches(ast)

	return [
		...ifBranches,
		...ternaryBranches,
		...switchBranches,
		...tryCatchBranches,
		...logicalBranches,
	]
}
