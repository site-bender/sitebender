import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"

import computeBranchId from "../../computeBranchId/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function extractTernaryBranches(
	ast: SourceNode,
): Array<BranchPath> {
	if (!ast.children) return []

	return ast.children.flatMap((node: SourceNode, index: number) => {
		if (node.type !== "ConditionalExpression") return []

		return [
			{
				id: computeBranchId("ternary", index, 0),
				condition: node.test?.value || "",
				line: node.start,
				column: 0,
				type: "ternary" as BranchType,
				requiredInputs: [],
			},
			{
				id: computeBranchId("ternary", index, 1),
				condition: `!(${node.test?.value || ""})`,
				line: node.start,
				column: 0,
				type: "ternary" as BranchType,
				requiredInputs: [],
			},
		]
	})
}
