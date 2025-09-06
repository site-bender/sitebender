import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extracts ternary conditional branch paths from an AST
 * Pure function that finds all ternary operators and their branches
 * @param ast - The AST node to analyze
 * @returns Array of ternary branch paths
 * @example
 * const branches = extractTernaryBranches(ast)
 * // Returns: [{ id: "ternary_0_true", type: BranchType.Ternary, ... }]
 */
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
