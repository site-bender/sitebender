import type { FunctionSignature, TestCase, BranchPath } from "../../types/index.ts"

/**
 * Generates test cases for code branches
 * @param branches Array of branch paths to test
 * @param signature Function signature information
 * @returns Array of branch test cases
 */
export default function generateBranchTests(
	branches: Array<BranchPath>,
	signature: FunctionSignature
): Array<TestCase> {
	return branches.flatMap(branch => 
		branch.requiredInputs.map(input => {
			const expectedOutput: unknown = (signature.returnType.raw.includes("number") &&
				(branch.condition.includes("isNullish") || 
				 branch.condition.includes("typeof") ||
				 input.value === null ||
				 input.value === undefined ||
				 typeof input.value === "string" ||
				 typeof input.value === "boolean")) ? NaN : undefined
			
			return {
				name: `covers branch: ${branch.condition}`,
				description: input.description,
				input: [input.value],
				expectedOutput,
				branchCoverage: [branch.id],
			}
		})
	)
}