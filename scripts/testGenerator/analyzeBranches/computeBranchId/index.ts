/**
 * Computes a unique identifier for a branch path
 * Pure function that generates consistent IDs for branch tracking
 * @param type - The type of branch (if, else, switch, etc.)
 * @param nodeIndex - Index of the node in the AST
 * @param branchIndex - Index of the branch within the node
 * @returns Unique branch identifier string
 * @example
 * const id = computeBranchId('if', 0, 1)
 * // Returns: "if_0_1"
 */
export default function computeBranchId(
	type: string,
	nodeIndex: number,
	branchIndex: number
): string {
	return `${type}_${nodeIndex}_${branchIndex}`
}