import { assertEquals } from "@std/assert"

import type { ScriptResult } from "../../types/index.ts"

import { calculateSummary } from "./index.ts"

//++ Tests for calculateSummary
Deno.test("calculateSummary returns empty summary for empty results", () => {
	const results: ReadonlyArray<ScriptResult> = []
	const summary = calculateSummary(results)

	assertEquals(summary, {
		critical: 0,
		high: 0,
		medium: 0,
		info: 0,
		blockers: 0,
	})
})

Deno.test("calculateSummary counts blockers correctly", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "block", status: "error" },
		{ name: "test2", phase: "block", status: "error" },
		{ name: "test3", phase: "warn", status: "error" },
		{ name: "test4", phase: "block", status: "ok" },
	]
	const summary = calculateSummary(results)

	assertEquals(summary.blockers, 2)
})

Deno.test("calculateSummary counts severities correctly", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "warn", status: "warn", severity: "critical" },
		{ name: "test2", phase: "warn", status: "warn", severity: "high" },
		{ name: "test3", phase: "warn", status: "warn", severity: "high" },
		{ name: "test4", phase: "warn", status: "warn", severity: "medium" },
		{ name: "test5", phase: "warn", status: "warn", severity: "medium" },
		{ name: "test6", phase: "warn", status: "warn", severity: "medium" },
		{ name: "test7", phase: "warn", status: "warn", severity: "info" },
	]
	const summary = calculateSummary(results)

	assertEquals(summary.critical, 1)
	assertEquals(summary.high, 2)
	assertEquals(summary.medium, 3)
	assertEquals(summary.info, 1)
})

Deno.test("calculateSummary handles mixed results", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "block", status: "error", severity: "critical" },
		{ name: "test2", phase: "warn", status: "warn", severity: "high" },
		{ name: "test3", phase: "pending", status: "pending" },
		{ name: "test4", phase: "block", status: "ok" },
	]
	const summary = calculateSummary(results)

	assertEquals(summary.critical, 1)
	assertEquals(summary.high, 1)
	assertEquals(summary.medium, 0)
	assertEquals(summary.info, 0)
	assertEquals(summary.blockers, 1)
})
