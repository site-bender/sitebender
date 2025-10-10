//++ Tests for formatReport function
//++ Comprehensive tests covering success/failure formatting, violations, metrics, and readability

import { assertEquals } from "jsr:@std/assert@1"
import { assertStringIncludes } from "jsr:@std/assert@1"
import formatReport from "./index.ts"
import type { PrivacyViolation, ValidationResult } from "../../types/index.ts"

Deno.test("formatReport - successful validation with no violations", function testSuccessNoViolations() {
	const result: ValidationResult = {
		success: true,
		violations: [],
		filesChecked: 20,
		executionTime: 123.456,
		phase: "block",
	}

	const report = formatReport(result)

	// Should include success indicator
	assertStringIncludes(report, "✓")
	assertStringIncludes(report, "passed")

	// Should include metrics
	assertStringIncludes(report, "Files checked: 20")
	assertStringIncludes(report, "123ms")
	assertStringIncludes(report, "Phase: block")

	// Should NOT include violations section
	assertEquals(report.includes("Violations:"), false)
})

Deno.test("formatReport - failed validation with violations", function testFailureWithViolations() {
	const violation: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/foo/bar.ts",
		toFile: "src/baz/_private/secret.ts",
		line: 5,
		column: 10,
		message: "Cannot import private function from different scope",
		suggestedFix: "Move import to within src/baz/",
	}

	const result: ValidationResult = {
		success: false,
		violations: [violation],
		filesChecked: 10,
		executionTime: 50.123,
		phase: "warn",
	}

	const report = formatReport(result)

	// Should include failure indicator
	assertStringIncludes(report, "✗")
	assertStringIncludes(report, "failed")

	// Should include violation count
	assertStringIncludes(report, "Violations: 1")

	// Should include metrics
	assertStringIncludes(report, "Files checked: 10")
	assertStringIncludes(report, "50ms")
	assertStringIncludes(report, "Phase: warn")

	// Should include violations section
	assertStringIncludes(report, "Violations:")
	assertStringIncludes(report, "src/foo/bar.ts")
	assertStringIncludes(report, "src/baz/_private/secret.ts")
})

Deno.test("formatReport - formats execution time in milliseconds", function testMilliseconds() {
	const result: ValidationResult = {
		success: true,
		violations: [],
		filesChecked: 5,
		executionTime: 456,
		phase: "block",
	}

	const report = formatReport(result)

	// Should show milliseconds for values < 1000ms
	assertStringIncludes(report, "456ms")
})

Deno.test("formatReport - formats execution time in seconds", function testSeconds() {
	const result: ValidationResult = {
		success: true,
		violations: [],
		filesChecked: 100,
		executionTime: 2345.678,
		phase: "block",
	}

	const report = formatReport(result)

	// Should show seconds with 2 decimal places for values >= 1000ms
	assertStringIncludes(report, "2.35s")
})

Deno.test("formatReport - multiple violations numbered list", function testMultipleViolations() {
	const violation1: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/a.ts",
		toFile: "src/_private/b.ts",
		message: "Violation 1",
	}

	const violation2: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/c.ts",
		toFile: "src/_private/d.ts",
		message: "Violation 2",
	}

	const result: ValidationResult = {
		success: false,
		violations: [violation1, violation2],
		filesChecked: 10,
		executionTime: 100,
		phase: "block",
	}

	const report = formatReport(result)

	// Should include numbered list
	assertStringIncludes(report, "Violations: 2")
	assertStringIncludes(report, "1.")
	assertStringIncludes(report, "2.")
	assertStringIncludes(report, "Violation 1")
	assertStringIncludes(report, "Violation 2")
})

Deno.test("formatReport - includes phase in output", function testIncludesPhase() {
	const result: ValidationResult = {
		success: true,
		violations: [],
		filesChecked: 5,
		executionTime: 50,
		phase: "pending",
	}

	const report = formatReport(result)

	assertStringIncludes(report, "Phase: pending")
})

Deno.test("formatReport - report is human-readable", function testReadability() {
	const result: ValidationResult = {
		success: true,
		violations: [],
		filesChecked: 42,
		executionTime: 789,
		phase: "block",
	}

	const report = formatReport(result)

	// Should be readable plain text (no JSON, no cryptic codes)
	assertStringIncludes(report, "Privacy validation")
	assertStringIncludes(report, "Files checked")
	assertStringIncludes(report, "Execution time")
	assertStringIncludes(report, "Phase")

	// Should have proper line breaks for readability
	assertEquals(report.includes("\n"), true)
})
