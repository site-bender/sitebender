import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"

import computeBranchId from "../../computeBranchId/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
