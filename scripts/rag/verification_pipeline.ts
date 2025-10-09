/**
 * Verification Pipeline
 *
 * Verifies generated code against constitutional rules before presenting to user.
 * Blocks critical violations and provides clear feedback for regeneration.
 */

import detectViolations, {
	formatViolationReport,
	type Violation,
} from "./violation_detector.ts"

export type VerificationResult =
	| { valid: true; code: string }
	| { valid: false; violations: ReadonlyArray<Violation>; code: string }

/**
 * Verifies generated code for constitutional rule violations.
 * Returns validation result with violations if any are found.
 */
export default function verifyGeneratedCode(code: string): VerificationResult {
	// Detect violations
	const violations = detectViolations(code)

	if (violations.length === 0) {
		return { valid: true, code }
	}

	// Check if all violations are critical
	const criticalViolations = violations.filter(
		function isCritical(v: Violation): boolean {
			return v.type === "CRITICAL"
		},
	)

	if (criticalViolations.length > 0) {
		return {
			valid: false,
			violations: criticalViolations,
			code,
		}
	}

	// Only warnings - allow but log
	console.warn("Code has warnings:", violations)
	return { valid: true, code }
}

/**
 * Formats verification result for display to user or AI.
 * Provides clear blocking message with suggestions for fixes.
 */
export function formatVerificationResult(result: VerificationResult): string {
	if (result.valid) {
		return "✅ Code passes verification"
	}

	const report = formatViolationReport(result.violations)

	return `
🚫 CRITICAL VIOLATIONS DETECTED

${report}

The code violates constitutional rules and cannot be presented.
Please regenerate following the rules above.
`
}

/**
 * Checks if code should be blocked from presentation.
 */
export function shouldBlockCode(result: VerificationResult): boolean {
	return !result.valid
}
