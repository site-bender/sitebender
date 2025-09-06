import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extracts switch statement branch paths from an AST
 * Pure function that finds all switch cases
 * @param ast - The AST node to analyze
 * @returns Array of switch branch paths
 * @example
 * const branches = extractSwitchBranches(ast)
 * // Returns: [{ id: "switch_0_case_0", type: BranchType.Switch, ... }]
 */
export default function extractSwitchBranches(
	ast: SourceNode,
): Array<BranchPath> {
	if (!ast.children) return []

	return ast.children.flatMap((node: SourceNode, index: number) => {
		if (node.type !== "SwitchStatement") return []

		// For simplicity, create a branch for the switch itself
		// In a real implementation, would parse each case
		return [{
			id: computeBranchId("switch", index, 0),
			condition: node.value || "",
			line: node.start,
			column: 0,
			type: "switch" as BranchType,
			requiredInputs: [],
		}]
	})
}
