//++ Tests for formatViolation - formats privacy violations as human-readable messages
//++
//++ Test strategy:
//++ - Property-based testing with fast-check
//++ - Integration testing (no mocks)
//++ - Test behavior: given violation, produce clear, helpful message

import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import formatViolation from "./index.ts"
import type { PrivacyViolation } from "../../types/index.ts"

//++ Test 1: Format basic violation message
Deno.test("formatViolation - formats basic violation message", function testBasicFormat() {
	const violation: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/foo/index.ts",
		toFile: "src/bar/_private/index.ts",
		line: 10,
		column: 5,
		message:
			"Cannot import private function 'src/bar/_private/index.ts' from 'src/foo/index.ts'.",
	}

	const formatted = formatViolation(violation)

	// Message should be a non-empty string
	assertEquals(typeof formatted, "string", "Should return a string")
	assertEquals(formatted.length > 0, true, "Should not be empty")

	// Message should include file paths
	assertEquals(
		formatted.includes("src/foo/index.ts"),
		true,
		"Should include fromFile",
	)
	assertEquals(
		formatted.includes("src/bar/_private/index.ts"),
		true,
		"Should include toFile",
	)

	// Message should include line number
	assertEquals(formatted.includes("10"), true, "Should include line number")
})

//++ Test 2: Format violation with suggested fix
Deno.test("formatViolation - includes suggested fix when present", function testSuggestedFix() {
	const violation: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/foo/index.ts",
		toFile: "src/bar/_private/index.ts",
		line: 10,
		column: 5,
		message: "Cannot import private function.",
		suggestedFix: "Move this function to src/bar/ or create a public wrapper.",
	}

	const formatted = formatViolation(violation)

	// Should include the suggested fix
	assertEquals(
		formatted.includes("Move this function"),
		true,
		"Should include suggested fix",
	)
})

//++ Test 3: Format violation without suggested fix
Deno.test("formatViolation - handles missing suggested fix", function testNoSuggestedFix() {
	const violation: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/foo/index.ts",
		toFile: "src/bar/_private/index.ts",
		line: 10,
		column: 5,
		message: "Cannot import private function.",
	}

	const formatted = formatViolation(violation)

	// Should still produce valid message without suggested fix
	assertEquals(typeof formatted, "string", "Should return a string")
	assertEquals(formatted.length > 0, true, "Should not be empty")
	assertEquals(
		formatted.includes("src/foo/index.ts"),
		true,
		"Should include fromFile",
	)
})

//++ Test 4: Format violation with optional line/column
Deno.test("formatViolation - handles optional line and column", function testOptionalLineColumn() {
	const violationWithBoth: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/foo/index.ts",
		toFile: "src/bar/_private/index.ts",
		message: "Cannot import private function.",
		line: 10,
		column: 5,
	}

	const violationWithoutBoth: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/foo/index.ts",
		toFile: "src/bar/_private/index.ts",
		message: "Cannot import private function.",
	}

	const formatted1 = formatViolation(violationWithBoth)
	const formatted2 = formatViolation(violationWithoutBoth)

	// Both should produce valid messages
	assertEquals(typeof formatted1, "string", "Should format with line/column")
	assertEquals(typeof formatted2, "string", "Should format without line/column")
	assertEquals(formatted1.length > 0, true, "Should not be empty")
	assertEquals(formatted2.length > 0, true, "Should not be empty")
})

//++ Test 5: Message is readable and well-structured
Deno.test("formatViolation - message is readable and well-structured", function testReadability() {
	const violation: PrivacyViolation = {
		type: "privacy",
		fromFile: "src/components/Button/index.tsx",
		toFile: "src/utils/_internal/helper.ts",
		line: 15,
		column: 20,
		message:
			"Cannot import private function 'src/utils/_internal/helper.ts' from 'src/components/Button/index.tsx'.",
		suggestedFix:
			"Create a public API in src/utils/ that wraps this functionality.",
	}

	const formatted = formatViolation(violation)

	// Check for structural elements (not specific format, but presence of info)
	assertEquals(
		formatted.includes("Button/index.tsx"),
		true,
		"Should mention source file",
	)
	assertEquals(
		formatted.includes("_internal/helper.ts"),
		true,
		"Should mention target file",
	)
	assertEquals(formatted.includes("15"), true, "Should mention line")
	assertEquals(
		formatted.includes("public API"),
		true,
		"Should mention suggested fix",
	)
})

//++ Test 6: Handles long file paths gracefully
Deno.test("formatViolation - handles long file paths", function testLongPaths() {
	const violation: PrivacyViolation = {
		type: "privacy",
		fromFile:
			"src/very/deeply/nested/directory/structure/components/Button/index.tsx",
		toFile: "src/another/very/long/path/to/utils/_internal/helper.ts",
		line: 100,
		column: 50,
		message: "Cannot import private function.",
	}

	const formatted = formatViolation(violation)

	// Should still produce valid message
	assertEquals(typeof formatted, "string", "Should return string")
	assertEquals(formatted.length > 0, true, "Should not be empty")
})

//++ Property-based test: All formatted messages are non-empty strings
Deno.test("formatViolation - property: always returns non-empty string", function testAlwaysReturnsString() {
	fc.assert(
		fc.property(
			fc.record({
				type: fc.constant("privacy" as const),
				fromFile: fc.string({ minLength: 1 }),
				toFile: fc.string({ minLength: 1 }),
				line: fc.option(fc.integer({ min: 1, max: 10000 }), { nil: undefined }),
				column: fc.option(fc.integer({ min: 0, max: 200 }), { nil: undefined }),
				message: fc.string({ minLength: 1 }),
				suggestedFix: fc.option(fc.string({ minLength: 1 }), {
					nil: undefined,
				}),
			}),
			function testAlwaysString(violation: PrivacyViolation) {
				const formatted = formatViolation(violation)

				return (
					typeof formatted === "string" &&
					formatted.length > 0
				)
			},
		),
	)
})

//++ Property-based test: Formatted message contains violation details
Deno.test("formatViolation - property: contains key violation details", function testContainsDetails() {
	fc.assert(
		fc.property(
			fc.record({
				type: fc.constant("privacy" as const),
				fromFile: fc.constantFrom("src/a.ts", "src/b.ts", "src/c.ts"),
				toFile: fc.constantFrom(
					"src/x/_p.ts",
					"src/y/_p.ts",
					"src/z/_p.ts",
				),
				line: fc.integer({ min: 1, max: 100 }),
				column: fc.integer({ min: 0, max: 80 }),
				message: fc.constant("Test message"),
				suggestedFix: fc.option(fc.constant("Test fix"), { nil: undefined }),
			}),
			function testContainsViolationDetails(violation: PrivacyViolation) {
				const formatted = formatViolation(violation)

				// Formatted message should contain at minimum the fromFile
				// (we can't guarantee exact format, but it should reference the violation)
				return formatted.includes(violation.fromFile) ||
					formatted.includes(violation.toFile)
			},
		),
	)
})
