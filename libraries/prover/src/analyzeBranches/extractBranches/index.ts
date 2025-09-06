import type { BranchPath } from "../../types/index.ts"
import type { SourceNode } from "../parseSourceCode/types/index.ts"
import extractIfBranches from "./extractIfBranches/index.ts"
import extractTernaryBranches from "./extractTernaryBranches/index.ts"
import extractSwitchBranches from "./extractSwitchBranches/index.ts"
import extractTryCatchBranches from "./extractTryCatchBranches/index.ts"
import extractLogicalBranches from "./extractLogicalBranches/index.ts"

/**
 * Extracts all branch paths from an AST node
 * Pure function that identifies all conditional execution paths
 * @param ast - The AST node to analyze
 * @returns Array of branch paths found in the AST
 * @example
 * const branches = extractBranches(ast)
 * // Returns: [{ id: "if_1", type: BranchType.If, ... }]
 */
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
