import type { BranchPath, BranchType } from "../../../types/index.ts"
import type { SourceNode } from "../../parseSourceCode/types/index.ts"
import computeBranchId from "../../computeBranchId/index.ts"

/**
 * Extracts try/catch branch paths from an AST
 * Pure function that finds all try/catch blocks
 * @param ast - The AST node to analyze
 * @returns Array of try/catch branch paths
 * @example
 * const branches = extractTryCatchBranches(ast)
 * // Returns: [{ id: "try_0", type: BranchType.TryCatch, ... }]
 */
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
