import type { CoverageResult } from "../types/index.ts"

import calculatePercentages from "./calculatePercentages/index.ts"
import findUncoveredBranches from "./findUncoveredBranches/index.ts"
import findUncoveredLines from "./findUncoveredLines/index.ts"
import generateCoverageReport from "./generateCoverageReport/index.ts"
import parseLcovReport from "./parseLcovReport/index.ts"
import runCoverage from "./runCoverage/index.ts"
import suggestCoverageIgnores from "./suggestCoverageIgnores/index.ts"

/**
 * Validates test coverage for a given function
 * Runs tests with coverage, parses results, identifies gaps
 */
export default async function validateCoverage(
	functionPath: string,
	testFilePath: string,
): Promise<CoverageResult> {
	// Run tests with coverage collection
	const coverageData = await runCoverage(testFilePath)

	// Parse the coverage report
	const report = parseLcovReport(coverageData)

	// Find uncovered lines
	const uncoveredLines = findUncoveredLines(report, functionPath)

	// Find uncovered branches
	const uncoveredBranches = findUncoveredBranches(report, functionPath)

	// Calculate coverage percentages
	const percentages = calculatePercentages(report, functionPath)

	// Generate suggestions for uncoverable code
	const suggestions = suggestCoverageIgnores(uncoveredLines, functionPath)

	// Create human-readable report
	const readableReport = generateCoverageReport({
		...percentages,
		uncoveredLines,
		uncoveredBranches,
		suggestions,
	})

	console.log(readableReport)

	return {
		percentage: percentages.overall,
		lines: {
			covered: percentages.linesCovered,
			total: percentages.linesTotal,
			uncovered: uncoveredLines,
		},
		branches: {
			covered: percentages.branchesCovered,
			total: percentages.branchesTotal,
			uncovered: uncoveredBranches,
		},
		suggestions,
	}
}
