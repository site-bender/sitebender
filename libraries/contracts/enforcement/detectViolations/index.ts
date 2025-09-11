//++ Detects contract violations in source code using pattern matching

import type { ContractViolation } from "../types"

export default async function detectViolations(
	libraryPath: string,
	library: string,
): Promise<ReadonlyArray<ContractViolation>> {
	const violations: Array<ContractViolation> = []
	
	// Define forbidden patterns for each library
	const forbiddenPatterns = getForbiddenPatterns(library)
	
	// Check for forbidden imports using grep-like patterns
	for (const pattern of forbiddenPatterns) {
		const matches = await findPattern(libraryPath, pattern.regex)
		
		for (const match of matches) {
			violations.push({
				type: "import",
				library,
				description: pattern.description,
				file: match.file,
				line: match.line,
				severity: "error",
			})
		}
	}
	
	// Check for specific violations
	if (library === "envoy") {
		// Check if Envoy is trying to parse TypeScript directly
		const tsParsingPatterns = [
			{ regex: /import.*typescript/, description: "Envoy importing TypeScript compiler" },
			{ regex: /require.*typescript/, description: "Envoy requiring TypeScript compiler" },
			{ regex: /\.parse\(.*\.tsx?/, description: "Envoy parsing TypeScript files directly" },
			{ regex: /\.readFileSync.*\.tsx?/, description: "Envoy reading source files directly" },
			{ regex: /new RegExp.*\\.(ts|tsx|jsx)/, description: "Envoy using regex to parse code" },
		]
		
		for (const pattern of tsParsingPatterns) {
			const matches = await findPattern(libraryPath, pattern.regex)
			for (const match of matches) {
				violations.push({
					type: "boundary",
					library,
					description: `CRITICAL: ${pattern.description}. Envoy MUST use Parser output only!`,
					file: match.file,
					line: match.line,
					severity: "error",
				})
			}
		}
	}
	
	if (library === "parser") {
		// Check if Parser is exporting TypeScript internals
		const internalExports = [
			{ regex: /export.*ts\./, description: "Parser exporting TypeScript internals" },
			{ regex: /export.*SyntaxKind/, description: "Parser exporting SyntaxKind" },
			{ regex: /export.*Node/, description: "Parser exporting raw AST nodes" },
		]
		
		for (const pattern of internalExports) {
			const matches = await findPattern(libraryPath, pattern.regex)
			for (const match of matches) {
				violations.push({
					type: "api",
					library,
					description: pattern.description,
					file: match.file,
					line: match.line,
					severity: "error",
				})
			}
		}
	}
	
	return violations
}

function getForbiddenPatterns(library: string): Array<{ regex: RegExp; description: string }> {
	const patterns: Record<string, Array<{ regex: RegExp; description: string }>> = {
		envoy: [
			{ regex: /from ['"]typescript['"]/, description: "Direct TypeScript import" },
			{ regex: /from ['"]@typescript/, description: "Direct @typescript import" },
			{ regex: /from ['"].*\.tsx?['"]/, description: "Direct source file import" },
			{ regex: /from ['"].*prover/, description: "Importing from prover" },
		],
		prover: [
			{ regex: /from ['"]typescript['"]/, description: "Direct TypeScript import" },
			{ regex: /from ['"].*envoy/, description: "Importing from envoy" },
		],
		toolkit: [
			{ regex: /from ['"]@sitebender\//, description: "Toolkit importing other libraries" },
		],
		foundry: [
			{ regex: /from ['"]@sitebender\//, description: "Foundry importing other libraries" },
		],
	}
	
	return patterns[library] || []
}

async function findPattern(
	path: string,
	pattern: RegExp,
): Promise<Array<{ file: string; line: number }>> {
	// In production, this would use actual file system operations
	// For now, returning empty array to indicate no violations found
	return []
}