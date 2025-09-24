//++ Detects contract violations in source code using pattern matching

import type { ContractViolation } from "../../types/enforcement.ts"
import map from "../../../../toolsmith/src/vanilla/array/map/index.ts"
import flatMap from "../../../../toolsmith/src/vanilla/array/flatMap/index.ts"
import getForbiddenPatterns from "./getForbiddenPatterns/index.ts"
import findPattern from "./findPattern/index.ts"

export default async function detectViolations(
	libraryPath: string,
	library: string,
): Promise<ReadonlyArray<ContractViolation>> {
	// Define forbidden patterns for each library
	const forbiddenPatterns = getForbiddenPatterns(library)

	// Check for forbidden imports using grep-like patterns
	// Batch pattern searches to avoid await in loop
	const forbiddenResults = await Promise.all(
		map((p: { regex: RegExp; description: string }) =>
			findPattern(libraryPath, p.regex).then((m) => ({ p, m }))
		)(forbiddenPatterns),
	)
	const forbiddenViolations = flatMap(
		({ p, m }: {
			p: { regex: RegExp; description: string }
			m: Array<{ file: string; line: number }>
		}) =>
			map((match: { file: string; line: number }) => ({
				type: "import" as const,
				library,
				description: p.description,
				file: match.file,
				line: match.line,
				severity: "error" as const,
			}))(m),
	)(forbiddenResults)

	// Check for specific violations
	let tsViolations: ReadonlyArray<ContractViolation> = []
	if (library === "envoy") {
		// Check if Envoy is trying to parse TypeScript directly
		const tsParsingPatterns = [
			{
				regex: /import.*typescript/,
				description: "Envoy importing TypeScript compiler",
			},
			{
				regex: /require.*typescript/,
				description: "Envoy requiring TypeScript compiler",
			},
			{
				regex: /\.parse\(.*\.tsx?/,
				description: "Envoy parsing TypeScript files directly",
			},
			{
				regex: /\.readFileSync.*\.tsx?/,
				description: "Envoy reading source files directly",
			},
			{
				regex: /new RegExp.*\\.(ts|tsx|jsx)/,
				description: "Envoy using regex to parse code",
			},
		]

		const tsResults = await Promise.all(
			map((p: { regex: RegExp; description: string }) =>
				findPattern(libraryPath, p.regex).then((m) => ({ p, m }))
			)(tsParsingPatterns),
		)
		tsViolations = flatMap(
			({ p, m }: {
				p: { regex: RegExp; description: string }
				m: Array<{ file: string; line: number }>
			}) =>
				map((match: { file: string; line: number }) => ({
					type: "boundary" as const,
					library,
					description:
						`CRITICAL: ${p.description}. Envoy MUST use Linguist output only!`,
					file: match.file,
					line: match.line,
					severity: "error" as const,
				}))(m),
		)(tsResults)
	}

	let internalViolations: ReadonlyArray<ContractViolation> = []
	if (library === "linguist") {
		// Check if Linguist is exporting TypeScript internals
		const internalExports = [
			{
				regex: /export.*ts\./,
				description: "Linguist exporting TypeScript internals",
			},
			{
				regex: /export.*SyntaxKind/,
				description: "Linguist exporting SyntaxKind",
			},
			{ regex: /export.*Node/, description: "Linguist exporting raw AST nodes" },
		]

		const internalResults = await Promise.all(
			map((p: { regex: RegExp; description: string }) =>
				findPattern(libraryPath, p.regex).then((m) => ({ p, m }))
			)(internalExports),
		)
		internalViolations = flatMap(
			({ p, m }: {
				p: { regex: RegExp; description: string }
				m: Array<{ file: string; line: number }>
			}) =>
				map((match: { file: string; line: number }) => ({
					type: "api" as const,
					library,
					description: p.description,
					file: match.file,
					line: match.line,
					severity: "error" as const,
				}))(m),
		)(internalResults)
		return [...forbiddenViolations, ...tsViolations, ...internalViolations]
	}

	return [...forbiddenViolations, ...tsViolations, ...internalViolations]
}
