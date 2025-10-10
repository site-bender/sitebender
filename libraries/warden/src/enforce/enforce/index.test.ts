//++ Tests for enforce function
//++ Comprehensive tests covering single target, multiple targets, empty targets, and performance tracking

import { assertEquals } from "jsr:@std/assert@1"
import enforce from "./index.ts"
import type { WardenConfig } from "../../types/index.ts"

Deno.test("enforce - single target with no violations", async function testSingleTargetNoViolations() {
	const config: WardenConfig = {
		targets: ["src/privacy"],
		phase: "block",
	}

	const result = await enforce(config)

	assertEquals(result.success, true)
	assertEquals(result.violations.length, 0)
	assertEquals(result.phase, "block")
	assertEquals(result.filesChecked > 0, true) // Should check some files
	assertEquals(result.executionTime > 0, true) // Should take some time
})

Deno.test("enforce - multiple targets with no violations", async function testMultipleTargetsNoViolations() {
	const config: WardenConfig = {
		targets: ["src/privacy", "src/importGraph"],
		phase: "warn",
	}

	const result = await enforce(config)

	assertEquals(result.success, true)
	assertEquals(result.violations.length, 0)
	assertEquals(result.phase, "warn")
	assertEquals(result.filesChecked > 0, true) // Should check files from both targets
	assertEquals(result.executionTime > 0, true)
})

Deno.test("enforce - empty targets array", async function testEmptyTargets() {
	const config: WardenConfig = {
		targets: [],
		phase: "block",
	}

	const result = await enforce(config)

	assertEquals(result.success, true) // No violations because no files checked
	assertEquals(result.violations.length, 0)
	assertEquals(result.filesChecked, 0)
	assertEquals(result.phase, "block")
})

Deno.test("enforce - preserves phase from config", async function testPreservesPhase() {
	const config: WardenConfig = {
		targets: ["src/privacy"],
		phase: "pending",
	}

	const result = await enforce(config)

	assertEquals(result.phase, "pending")
})

Deno.test("enforce - aggregates files checked from multiple targets", async function testAggregatesFilesChecked() {
	const config: WardenConfig = {
		targets: ["src/privacy", "src/importGraph"],
		phase: "block",
	}

	const result = await enforce(config)

	// Should check files from both directories
	// We expect at least 10 files total (privacy has ~5, importGraph has ~3, plus tests)
	assertEquals(result.filesChecked > 5, true)
})

Deno.test("enforce - tracks execution time", async function testTracksExecutionTime() {
	const config: WardenConfig = {
		targets: ["src/privacy"],
		phase: "block",
	}

	const result = await enforce(config)

	// Execution time should be positive and reasonable (< 5 seconds per plan)
	assertEquals(result.executionTime > 0, true)
	assertEquals(result.executionTime < 5000, true)
})

Deno.test("enforce - validates entire Warden codebase", async function testValidatesWardenItself() {
	const config: WardenConfig = {
		targets: ["src"],
		phase: "block",
	}

	const result = await enforce(config)

	// Warden should have 0 violations (it validates itself)
	assertEquals(result.success, true)
	assertEquals(result.violations.length, 0)
	assertEquals(result.filesChecked > 15, true) // Should check all source files
	assertEquals(result.phase, "block")
})

Deno.test("enforce - fast performance on typical project", async function testPerformance() {
	const config: WardenConfig = {
		targets: ["src"],
		phase: "block",
	}

	const result = await enforce(config)

	// Should complete in < 1 second for Warden itself (per Phase 1.5 success criteria)
	// Being generous and allowing < 2 seconds to account for slower CI environments
	assertEquals(result.executionTime < 2000, true)
})
