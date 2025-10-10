//++ Format ValidationResult as console-friendly report
//++
//++ This is a curried function: formatReport(result) => string
//++
//++ Creates human-readable report showing:
//++ - Summary (violations count, files checked, execution time)
//++ - Each violation with context and suggested fix
//++ - Success/failure status
//++
//++ Examples:
//++   formatReport({ success: true, violations: [], filesChecked: 20, executionTime: 100, phase: "block" })
//++   => "✓ Privacy validation passed\n  Files checked: 20\n  Execution time: 100ms\n  Phase: block"
//++
//++   formatReport({ success: false, violations: [violation], filesChecked: 10, executionTime: 50, phase: "warn" })
//++   => "✗ Privacy validation failed\n  Violations: 1\n  Files checked: 10\n  ..."

import formatViolation from "../../privacy/formatViolation/index.ts"
import type { ValidationResult } from "../../types/index.ts"

//++ Helper: Format execution time in human-readable format
//++ Takes milliseconds, returns formatted string (e.g., "123ms" or "1.23s")
function formatExecutionTime(milliseconds: number): string {
	if (milliseconds < 1000) {
		return `${Math.round(milliseconds)}ms`
	}

	const seconds = milliseconds / 1000
	return `${seconds.toFixed(2)}s`
}

//++ Helper: Create summary section of report
//++ Shows success/failure status and key metrics
function formatSummary(result: ValidationResult): string {
	const { success, violations, filesChecked, executionTime, phase } = result

	// Status line with checkmark or X
	const statusIcon = success ? "✓" : "✗"
	const statusText = success
		? "Privacy validation passed"
		: "Privacy validation failed"
	const statusLine = `${statusIcon} ${statusText}`

	// Metrics lines
	const violationsLine = success ? "" : `  Violations: ${violations.length}\n`
	const filesLine = `  Files checked: ${filesChecked}`
	const timeLine = `  Execution time: ${formatExecutionTime(executionTime)}`
	const phaseLine = `  Phase: ${phase}`

	return `${statusLine}\n${violationsLine}${filesLine}\n${timeLine}\n${phaseLine}`
}

//++ Helper: Create violations section of report
//++ Lists each violation with formatted details
function formatViolations(result: ValidationResult): string {
	const { violations } = result

	if (violations.length === 0) {
		return ""
	}

	// Header
	const header = "\n\nViolations:\n"

	// Format each violation with numbered list
	const formattedViolations = violations.map(
		function formatWithNumber(violation, index) {
			const number = index + 1
			const formatted = formatViolation(violation)
			return `\n${number}. ${formatted}`
		},
	)

	return header + formattedViolations.join("")
}

//++ Main function: Format complete validation report
export default function formatReport(result: ValidationResult): string {
	const summary = formatSummary(result)
	const violations = formatViolations(result)

	return summary + violations
}
