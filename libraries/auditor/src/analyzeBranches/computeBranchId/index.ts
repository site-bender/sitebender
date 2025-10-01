//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function computeBranchId(
	type: string,
	nodeIndex: number,
	branchIndex: number,
): string {
	return `${type}_${nodeIndex}_${branchIndex}`
}
