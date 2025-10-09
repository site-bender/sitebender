//++ Example: How Envoy uses Arborist for documentation generation
//++ Shows semantic analysis for automatic documentation

import parseFileWithSemantics from "../../../src/api/parseFileWithSemantics/index.ts"

//++ Sample function that Envoy would document
export default function calculateTax(income: number) {
	return function calculateTaxForIncome(taxRate: number) {
		return function calculateTaxAmount(): number {
			//-- [PERFORMANCE] Could memoize for repeated calculations
			return income * taxRate
		}
	}
}

//++ Envoy documentation generation example
export async function generateDocumentation(filePath: string) {
	const result = await parseFileWithSemantics(filePath)

	if (result._tag === "Error") {
		return {
			error: `Failed to parse ${filePath}: ${result.error.message}`,
			documentation: null,
		}
	}

	const { semanticInfo } = result.value

	// Envoy would generate documentation from semantic info
	const docs = {
		purity: semanticInfo.purity.isPure ? "Pure function" : "Impure function",
		complexity: `Cyclomatic complexity: ${semanticInfo.complexity.cyclomatic}`,
		analysis: semanticInfo.purity.reasons.join(", "),
		symbols: semanticInfo.symbolTable.size,
		diagnostics: semanticInfo.diagnostics.length,
	}

	return {
		error: null,
		documentation: docs,
	}
}
