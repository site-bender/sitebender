import type {
	BranchPath,
	FunctionSignature,
	TestCase,
} from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateBranchTests(
	branches: Array<BranchPath>,
	signature: FunctionSignature,
): Array<TestCase> {
	return branches.flatMap((branch) =>
		branch.requiredInputs.map((input) => {
			const expectedOutput: unknown =
				(signature.returnType.raw.includes("number") &&
						(branch.condition.includes("isNullish") ||
							branch.condition.includes("typeof") ||
							input.value === null ||
							input.value === undefined ||
							typeof input.value === "string" ||
							typeof input.value === "boolean"))
					? NaN
					: undefined

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
