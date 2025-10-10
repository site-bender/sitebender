//++ Tests for validatePrivacy - orchestrates privacy validation
//++
//++ Test strategy:
//++ - Integration testing (real file system, real parsing)
//++ - No mocks - test against actual test fixtures
//++ - Property-based testing where applicable
//++ - Performance testing (< 1s target)

import { assertEquals } from "@std/assert"
import validatePrivacy from "./index.ts"

//++ Test 1: Validate clean codebase with no violations
Deno.test({
	name: "validatePrivacy - clean codebase returns success",
	sanitizeResources: false, // Arborist WASM causes known resource leaks
	sanitizeOps: false, // Arborist WASM async ops leak
	async fn() {
		// Test on Warden's privacy functions (all are valid)
		const rootPath = "src/privacy"
		const result = await validatePrivacy(rootPath)

		assertEquals(result.success, true, "Should succeed for clean codebase")
		assertEquals(result.violations.length, 0, "Should have no violations")
		assertEquals(result.filesChecked > 0, true, "Should check files")
		assertEquals(
			result.executionTime >= 0,
			true,
			"Should measure execution time",
		)
		assertEquals(result.phase, "block", "Should default to block phase")
	},
})

//++ Test 2: Count files checked correctly
Deno.test("validatePrivacy - counts files correctly", async function testFileCount() {
	const rootPath = "src/privacy"
	const result = await validatePrivacy(rootPath)

	// Should have checked several TypeScript files in privacy folder
	assertEquals(result.filesChecked >= 4, true, "Should check multiple files")
})

//++ Test 3: Performance is acceptable (< 1 second)
Deno.test("validatePrivacy - completes in < 1 second", async function testPerformance() {
	const rootPath = "src/privacy"
	const startTime = performance.now()
	const result = await validatePrivacy(rootPath)
	const endTime = performance.now()
	const duration = endTime - startTime

	// Execution time should be measured
	assertEquals(result.executionTime > 0, true, "Should measure execution time")

	// Should complete quickly (< 1 second)
	assertEquals(
		duration < 1000,
		true,
		`Should complete in < 1s, took ${duration}ms`,
	)
})

//++ Test 4: Returns ValidationResult with all required fields
Deno.test("validatePrivacy - returns complete ValidationResult", async function testResultStructure() {
	const rootPath = "src/privacy"
	const result = await validatePrivacy(rootPath)

	// Check all required fields exist
	assertEquals(typeof result.success, "boolean", "Should have success field")
	assertEquals(
		Array.isArray(result.violations),
		true,
		"Should have violations array",
	)
	assertEquals(typeof result.filesChecked, "number", "Should have filesChecked")
	assertEquals(
		typeof result.executionTime,
		"number",
		"Should have executionTime",
	)
	assertEquals(typeof result.phase, "string", "Should have phase")
})

//++ Test 5: Validate on import graph folder (includes test files)
Deno.test("validatePrivacy - validates import graph folder", async function testImportGraphFolder() {
	const rootPath = "src/importGraph"
	const result = await validatePrivacy(rootPath)

	// Should succeed (no privacy violations in importGraph)
	assertEquals(result.success, true, "importGraph should have no violations")
	assertEquals(result.violations.length, 0, "Should have no violations")
	assertEquals(result.filesChecked > 0, true, "Should check files")
})

//++ Test 6: Validate entire src directory
Deno.test("validatePrivacy - validates entire src directory", async function testEntireSrc() {
	const rootPath = "src"
	const result = await validatePrivacy(rootPath)

	// This is comprehensive test - Warden should validate itself
	assertEquals(result.success, true, "Warden src should have no violations")
	assertEquals(result.violations.length, 0, "Should have no violations")
	assertEquals(result.filesChecked > 10, true, "Should check many files")
})

//++ Test 7: Empty directory returns success
Deno.test("validatePrivacy - empty directory returns success", async function testEmptyDirectory() {
	// Create temp empty directory
	const tempDir = await Deno.makeTempDir()

	try {
		const result = await validatePrivacy(tempDir)

		assertEquals(result.success, true, "Empty dir should succeed")
		assertEquals(result.violations.length, 0, "Should have no violations")
		assertEquals(result.filesChecked, 0, "Should check no files")
	} finally {
		await Deno.remove(tempDir, { recursive: true })
	}
})

//++ Test 8: Execution time is realistic
Deno.test("validatePrivacy - execution time is realistic", async function testExecutionTime() {
	const rootPath = "src/privacy"
	const startTime = performance.now()
	const result = await validatePrivacy(rootPath)
	const endTime = performance.now()
	const actualDuration = endTime - startTime

	// Reported execution time should be close to actual (within 10ms tolerance)
	const difference = Math.abs(result.executionTime - actualDuration)
	assertEquals(
		difference < 10,
		true,
		`Execution time should be accurate, difference: ${difference}ms`,
	)
})
