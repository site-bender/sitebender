import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"

import computeBranchId from "../../computeBranchId/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function extractIfBranches(ast: SourceNode): Array<BranchPath> {
	if (!ast.children) return []

	return ast.children.flatMap((node: SourceNode, index: number) => {
		if (node.type !== "IfStatement") return []

		const branches: Array<BranchPath> = []

		// If branch
		branches.push({
			id: computeBranchId("if", index, 0),
			condition: node.test?.value || "",
			line: node.start,
			column: 0,
			type: "if" as BranchType,
			requiredInputs: [],
		})

		// Else branch (implicit)
		branches.push({
			id: computeBranchId("else", index, 0),
			condition: `!(${node.test?.value || ""})`,
			line: node.start,
			column: 0,
			type: "else" as BranchType,
			requiredInputs: [],
		})

		return branches
	})
}
