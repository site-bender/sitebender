import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"

import computeBranchId from "../../computeBranchId/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function extractTryCatchBranches(
	ast: SourceNode,
): Array<BranchPath> {
	if (!ast.children) return []

	return ast.children.flatMap((node: SourceNode, index: number) => {
		if (node.type !== "TryStatement") return []

		return [
			{
				id: computeBranchId("try", index, 0),
				condition: "no error",
				line: node.start,
				column: 0,
				type: "trycatch" as BranchType,
				requiredInputs: [],
			},
			{
				id: computeBranchId("catch", index, 0),
				condition: "error thrown",
				line: node.start,
				column: 0,
				type: "trycatch" as BranchType,
				requiredInputs: [],
			},
		]
	})
}
