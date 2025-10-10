//++ End-to-end integration tests for enforce function
//++ Tests the complete enforcement workflow on real codebases

import { assertEquals } from "jsr:@std/assert@1"
import { assertStringIncludes } from "jsr:@std/assert@1"
import enforce from "./index.ts"
import formatReport from "../formatReport/index.ts"
import type { WardenConfig } from "../../types/index.ts"

Deno.test("INTEGRATION - enforce Warden on itself (no violations)", async function testWardenEnforcesItself() {
	const config: WardenConfig = {
		targets: ["src"],
		phase: "block",
	}

	const result = await enforce(config)

	// Warden should validate itself with 0 violations
	assertEquals(result.success, true, "Warden should have no privacy violations")
	assertEquals(
		result.violations.length,
		0,
		"Should have exactly 0 violations",
	)
	assertEquals(result.phase, "block")

	// Should check multiple files (at least 20 based on CURRENT_STATE.md)
	assertEquals(
		result.filesChecked >= 20,
		true,
		`Should check at least 20 files, got ${result.filesChecked}`,
	)

	// Should complete in reasonable time (< 2s per Phase 1.5 success criteria)
	assertEquals(
		result.executionTime < 2000,
		true,
		`Should complete in < 2s, took ${result.executionTime}ms`,
	)
})

Deno.test("INTEGRATION - enforce with formatReport produces readable output", async function testEnforceWithFormatReport() {
	const config: WardenConfig = {
		targets: ["src/privacy"],
		phase: "block",
	}

	const result = await enforce(config)
	const report = formatReport(result)

	// Report should be human-readable
	assertStringIncludes(report, "Privacy validation")
	assertStringIncludes(report, "Files checked:")
	assertStringIncludes(report, "Execution time:")
	assertStringIncludes(report, "Phase: block")

	// Should indicate success
	assertStringIncludes(report, "✓")
	assertStringIncludes(report, "passed")
})

Deno.test("INTEGRATION - enforce on multiple directories", async function testMultipleDirectories() {
	const config: WardenConfig = {
		targets: ["src/privacy", "src/importGraph", "src/enforce"],
		phase: "warn",
	}

	const result = await enforce(config)

	// Should aggregate results from all directories
	assertEquals(result.success, true)
	assertEquals(result.violations.length, 0)
	assertEquals(result.phase, "warn")

	// Should check files from all three directories
	// privacy (~5 files), importGraph (~3 files), enforce (~2 files) + tests
	assertEquals(
		result.filesChecked >= 10,
		true,
		`Should check at least 10 files from 3 directories, got ${result.filesChecked}`,
	)
})

Deno.test("INTEGRATION - enforce with pending phase", async function testPendingPhase() {
	const config: WardenConfig = {
		targets: ["src/types"],
		phase: "pending",
	}

	const result = await enforce(config)

	assertEquals(result.phase, "pending")
	assertEquals(result.success, true) // types folder should be clean
})

Deno.test("INTEGRATION - complete workflow example from mod.ts", async function testCompleteWorkflow() {
	// This is the exact example from mod.ts
	const config: WardenConfig = {
		targets: ["src/"],
		phase: "block",
	}

	const result = await enforce(config)
	const report = formatReport(result)

	// Should execute successfully
	assertEquals(result.success, true)

	// Report should be printable (contains expected sections)
	assertStringIncludes(report, "Privacy validation")
	assertStringIncludes(report, "Files checked:")
	assertStringIncludes(report, "Execution time:")

	// Demonstrate complete workflow
	console.log("\n=== Example Warden Report ===")
	console.log(report)
	console.log("=== End Report ===\n")
})

Deno.test("INTEGRATION - enforce meets performance target", async function testPerformanceTarget() {
	const config: WardenConfig = {
		targets: ["src"],
		phase: "block",
	}

	const startTime = performance.now()
	const result = await enforce(config)
	const endTime = performance.now()

	const totalTime = endTime - startTime

	// Phase 1.5 success criteria: < 5 seconds for Sitebender codebase
	// Warden is much smaller, should be < 2 seconds
	assertEquals(
		totalTime < 2000,
		true,
		`Should complete in < 2s, took ${totalTime}ms`,
	)

	// Result should also report reasonable time
	assertEquals(
		result.executionTime < 2000,
		true,
		`Result should report < 2s, reported ${result.executionTime}ms`,
	)
})

Deno.test("INTEGRATION - enforce produces zero false positives", async function testZeroFalsePositives() {
	const config: WardenConfig = {
		targets: ["src"],
		phase: "block",
	}

	const result = await enforce(config)

	// Warden's own code follows all privacy rules
	// Any violations would be false positives
	assertEquals(
		result.violations.length,
		0,
		"Should have zero false positives on Warden's clean codebase",
	)
	assertEquals(result.success, true)
})
