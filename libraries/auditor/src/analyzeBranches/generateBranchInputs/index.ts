import type {
	BranchPath,
	FunctionSignature,
	TestInput,
} from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateBranchInputs(
	branches: Array<BranchPath>,
	signature: FunctionSignature,
): Array<BranchPath> {
	return branches.map((branch) => ({
		...branch,
		requiredInputs: generateInputsForCondition(branch.condition, signature),
	}))
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function generateInputsForCondition(
	condition: string,
	signature: FunctionSignature,
): Array<TestInput> {
	const inputs: Array<TestInput> = []

	// Parse common patterns
	if (condition.includes(">")) {
		const match = condition.match(/(\w+)\s*>\s*(\d+)/)
		if (match) {
			inputs.push({
				description: `${match[1]} greater than ${match[2]}`,
				value: parseInt(match[2]) + 1,
			})
		}
	} else if (condition.includes("<")) {
		const match = condition.match(/(\w+)\s*<\s*(\d+)/)
		if (match) {
			inputs.push({
				description: `${match[1]} less than ${match[2]}`,
				value: parseInt(match[2]) - 1,
			})
		}
	} else if (condition.includes("===")) {
		const match = condition.match(/(\w+)\s*===\s*(.+)/)
		if (match) {
			inputs.push({
				description: `${match[1]} equals ${match[2]}`,
				value: match[2].replace(/['"]/g, ""),
			})
		}
	} else if (condition.startsWith("!")) {
		// Negation - generate opposite
		inputs.push({
			description: `Condition false: ${condition}`,
			value: false,
		})
	} else if (condition === "no error") {
		inputs.push({
			description: "Valid input that should not throw",
			value: signature.parameters[0] ? 0 : undefined,
		})
	} else if (condition === "error thrown") {
		inputs.push({
			description: "Invalid input that should throw",
			value: null,
		})
	}

	// Default case
	if (inputs.length === 0) {
		inputs.push({
			description: `Satisfy condition: ${condition}`,
			value: true,
		})
	}

	return inputs
}
