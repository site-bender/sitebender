import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"

import computeBranchId from "../../computeBranchId/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function extractLogicalBranches(
	ast: SourceNode,
): Array<BranchPath> {
	if (!ast.children) return []

	return ast.children.flatMap((node: SourceNode, index: number) => {
		if (node.type !== "LogicalExpression") return []

		const branchType = node.operator === "&&" ? "logicaland" : "logicalor"
		const typePrefix = node.operator === "&&" ? "and" : "or"

		return [
			{
				id: computeBranchId(typePrefix, index, 0),
				condition: node.value || "",
				line: node.start,
				column: 0,
				type: branchType as BranchType,
				requiredInputs: [],
			},
		]
	})
}
