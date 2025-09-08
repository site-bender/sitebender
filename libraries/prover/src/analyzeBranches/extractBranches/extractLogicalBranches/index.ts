import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"

import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extracts logical operator branch paths from an AST
 * Pure function that finds all && and || operators
 * @param ast - The AST node to analyze
 * @returns Array of logical branch paths
 * @example
 * const branches = extractLogicalBranches(ast)
 * // Returns: [{ id: "and_0", type: BranchType.LogicalAnd, ... }]
 */
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
