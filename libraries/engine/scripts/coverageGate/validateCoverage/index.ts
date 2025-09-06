import type {
	CoverageGateResult,
	CoverageIssue,
	CoverageResult,
} from "../types/index.ts"
import isEngineSourceFile from "../isEngineSourceFile/index.ts"

/**
 * Validates coverage results against the 100% requirement for engine source files
 *
 * According to TESTING.md and CLAUDE.md, all public engine functions must have
 * 100% line and branch coverage. This function checks coverage results and
 * identifies any files that fail to meet this requirement.
 *
 * @param results - Array of coverage results from parseCoverageOutput
 * @returns Validation result with pass/fail status and detailed issues
 *
 * @example
 * ```typescript
 * const results = [
 *   { file: 'engine/src/rendering/index.ts', branchPercent: 50, linePercent: 94.4 },
 *   { file: 'toolkit/src/escape/index.ts', branchPercent: 80, linePercent: 90 }
 * ]
 *
 * const validation = validateCoverage(results)
 * if (!validation.passed) {
 *   console.log(validation.message)
 *   // "Coverage gate failed: 2 issue(s) found"
 * }
 * ```
 */
export default function validateCoverage(
	results: CoverageResult[],
): CoverageGateResult {
	const issues: CoverageIssue[] = []

	for (const result of results) {
		if (!isEngineSourceFile(result.file)) {
			continue // Only enforce 100% on engine source files
		}

		if (result.linePercent < 100) {
			issues.push({
				file: result.file,
				issue: "Line coverage below 100%",
				current: result.linePercent,
				required: 100,
			})
		}

		if (result.branchPercent < 100) {
			issues.push({
				file: result.file,
				issue: "Branch coverage below 100%",
				current: result.branchPercent,
				required: 100,
			})
		}
	}

	if (issues.length === 0) {
		return {
			passed: true,
			message: "✅ All engine source files have 100% coverage",
			details: [],
		}
	}

	const message =
		`❌ Coverage gate failed: ${issues.length} issue(s) found\n\n` +
		"According to TESTING.md and CLAUDE.md, all public engine functions must have 100% coverage.\n" +
		"Either add tests to achieve 100% coverage, or add `// deno-coverage-ignore` with a documented reason.\n\n" +
		"Issues found:\n" +
		issues.map((issue) =>
			`  • ${issue.file}: ${issue.issue} (${issue.current}% < ${issue.required}%)`
		).join("\n")

	return {
		passed: false,
		message,
		details: issues,
	}
}
