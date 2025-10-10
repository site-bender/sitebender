//++ Tests for findViolations - detects privacy violations in import graph
//++
//++ Test strategy:
//++ - Property-based testing with fast-check
//++ - Integration testing (no mocks, real ImportGraph structures)
//++ - Test behavior: given graph, find violations correctly

import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import findViolations from "./index.ts"
import type {
	ImportGraph,
	ImportInfo,
	PrivacyViolation,
} from "../../types/index.ts"

//++ Helper: Create ImportInfo for testing
function createImportInfo(
	source: string,
	specifier: string,
	resolved: string,
	line = 1,
	column = 0,
): ImportInfo {
	return { source, specifier, resolved, line, column }
}

//++ Test 1: Empty graph returns no violations
Deno.test("findViolations - empty graph returns no violations", function testEmptyGraph() {
	const emptyGraph: ImportGraph = new Map()
	const violations = findViolations(emptyGraph)

	assertEquals(violations.length, 0, "Empty graph should have no violations")
})

//++ Test 2: Graph with only public imports returns no violations
Deno.test("findViolations - public imports only returns no violations", function testPublicImportsOnly() {
	const graph: ImportGraph = new Map([
		[
			"src/foo/index.ts",
			[
				createImportInfo(
					"src/foo/index.ts",
					"../bar/index.ts",
					"src/bar/index.ts",
				),
			],
		],
		[
			"src/bar/index.ts",
			[
				createImportInfo(
					"src/bar/index.ts",
					"../baz/index.ts",
					"src/baz/index.ts",
				),
			],
		],
	])

	const violations = findViolations(graph)

	assertEquals(violations.length, 0, "Public imports should have no violations")
})

//++ Test 3: Detect cross-scope private import (invalid)
Deno.test("findViolations - detect cross-scope private import", function testCrossScopePrivate() {
	const graph: ImportGraph = new Map([
		[
			"src/foo/index.ts",
			[
				createImportInfo(
					"src/foo/index.ts",
					"../bar/_private/index.ts",
					"src/bar/_private/index.ts",
					5,
					10,
				),
			],
		],
	])

	const violations = findViolations(graph)

	assertEquals(violations.length, 1, "Should detect one violation")
	assertEquals(
		violations[0].type,
		"privacy",
		"Violation should be privacy type",
	)
	assertEquals(
		violations[0].fromFile,
		"src/foo/index.ts",
		"fromFile should match",
	)
	assertEquals(
		violations[0].toFile,
		"src/bar/_private/index.ts",
		"toFile should match",
	)
	assertEquals(violations[0].line, 5, "Line should match")
	assertEquals(violations[0].column, 10, "Column should match")
})

//++ Test 4: Allow same-scope private import (valid)
Deno.test("findViolations - allow same-scope private import", function testSameScopePrivate() {
	const graph: ImportGraph = new Map([
		[
			"src/foo/index.ts",
			[
				createImportInfo(
					"src/foo/index.ts",
					"./_helper/index.ts",
					"src/foo/_helper/index.ts",
				),
			],
		],
	])

	const violations = findViolations(graph)

	assertEquals(
		violations.length,
		0,
		"Same-scope private import should be valid",
	)
})

//++ Test 5: Multiple violations in same file
Deno.test("findViolations - multiple violations in same file", function testMultipleViolations() {
	const graph: ImportGraph = new Map([
		[
			"src/foo/index.ts",
			[
				createImportInfo(
					"src/foo/index.ts",
					"../bar/_private1/index.ts",
					"src/bar/_private1/index.ts",
					5,
					10,
				),
				createImportInfo(
					"src/foo/index.ts",
					"../baz/_private2/index.ts",
					"src/baz/_private2/index.ts",
					10,
					15,
				),
			],
		],
	])

	const violations = findViolations(graph)

	assertEquals(violations.length, 2, "Should detect two violations")
	assertEquals(
		violations[0].fromFile,
		"src/foo/index.ts",
		"First violation fromFile",
	)
	assertEquals(
		violations[0].toFile,
		"src/bar/_private1/index.ts",
		"First violation toFile",
	)
	assertEquals(
		violations[1].fromFile,
		"src/foo/index.ts",
		"Second violation fromFile",
	)
	assertEquals(
		violations[1].toFile,
		"src/baz/_private2/index.ts",
		"Second violation toFile",
	)
})

//++ Test 6: Multiple files with violations
Deno.test("findViolations - multiple files with violations", function testMultipleFiles() {
	const graph: ImportGraph = new Map([
		[
			"src/foo/index.ts",
			[
				createImportInfo(
					"src/foo/index.ts",
					"../bar/_private/index.ts",
					"src/bar/_private/index.ts",
				),
			],
		],
		[
			"src/baz/index.ts",
			[
				createImportInfo(
					"src/baz/index.ts",
					"../bar/_private/index.ts",
					"src/bar/_private/index.ts",
				),
			],
		],
	])

	const violations = findViolations(graph)

	assertEquals(violations.length, 2, "Should detect violations from both files")
})

//++ Test 7: Allow _shared imports from sibling scopes
Deno.test("findViolations - allow _shared imports from sibling scopes", function testSharedImports() {
	const graph: ImportGraph = new Map([
		[
			"src/foo/index.ts",
			[
				createImportInfo(
					"src/foo/index.ts",
					"../_shared/utils/index.ts",
					"src/_shared/utils/index.ts",
				),
			],
		],
	])

	const violations = findViolations(graph)

	assertEquals(violations.length, 0, "_shared imports should be valid")
})

//++ Test 8: Violation message is populated
Deno.test("findViolations - violation message is populated", function testViolationMessage() {
	const graph: ImportGraph = new Map([
		[
			"src/foo/index.ts",
			[
				createImportInfo(
					"src/foo/index.ts",
					"../bar/_private/index.ts",
					"src/bar/_private/index.ts",
				),
			],
		],
	])

	const violations = findViolations(graph)

	assertEquals(violations.length, 1, "Should have one violation")
	assertEquals(
		typeof violations[0].message,
		"string",
		"Message should be a string",
	)
	assertEquals(
		violations[0].message.length > 0,
		true,
		"Message should not be empty",
	)
})

//++ Property-based test: All violations have required fields
Deno.test("findViolations - property: all violations have required fields", function testViolationFields() {
	fc.assert(
		fc.property(
			fc.array(
				fc.record({
					source: fc.constantFrom("src/a/index.ts", "src/b/index.ts"),
					resolved: fc.constantFrom(
						"src/c/_priv/index.ts",
						"src/d/_priv/index.ts",
					),
					specifier: fc.constant("../_priv/index.ts"),
					line: fc.integer({ min: 1, max: 100 }),
					column: fc.integer({ min: 0, max: 80 }),
				}),
				{ minLength: 0, maxLength: 10 },
			),
			function testAllViolationsHaveFields(imports: Array<ImportInfo>) {
				const entries: Array<[string, ReadonlyArray<ImportInfo>]> =
					imports.length > 0 ? [[imports[0].source, imports]] : []
				const graph: ImportGraph = new Map(entries)

				const violations = findViolations(graph)

				// Every violation must have these fields
				return violations.every(
					function checkViolation(v: PrivacyViolation): boolean {
						return (
							v.type === "privacy" &&
							typeof v.fromFile === "string" &&
							typeof v.toFile === "string" &&
							typeof v.message === "string" &&
							v.fromFile.length > 0 &&
							v.toFile.length > 0 &&
							v.message.length > 0
						)
					},
				)
			},
		),
	)
})

//++ Property-based test: Violation count never exceeds total imports
Deno.test("findViolations - property: violations <= total imports", function testViolationCount() {
	fc.assert(
		fc.property(
			fc.array(
				fc.record({
					source: fc.constantFrom("src/a/index.ts", "src/b/index.ts"),
					resolved: fc.constantFrom(
						"src/c/index.ts",
						"src/c/_priv/index.ts",
						"src/d/_priv/index.ts",
					),
					specifier: fc.constant("../index.ts"),
					line: fc.integer({ min: 1, max: 100 }),
					column: fc.integer({ min: 0, max: 80 }),
				}),
				{ minLength: 0, maxLength: 20 },
			),
			function testCountBounds(imports: Array<ImportInfo>) {
				const entries: Array<[string, ReadonlyArray<ImportInfo>]> =
					imports.length > 0 ? [[imports[0].source, imports]] : []
				const graph: ImportGraph = new Map(entries)

				const violations = findViolations(graph)

				// Violations can't exceed total imports
				return violations.length <= imports.length
			},
		),
	)
})
