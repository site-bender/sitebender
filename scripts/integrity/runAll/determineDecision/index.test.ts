import { assertEquals } from "@std/assert"
import type { ScriptResult } from "../../types/index.ts"

import { determineDecision } from "./index.ts"

//++ Tests for determineDecision
Deno.test("determineDecision returns allow for empty results", () => {
	const results: ReadonlyArray<ScriptResult> = []
	const decision = determineDecision(results)

	assertEquals(decision, "allow")
})

Deno.test("determineDecision returns allow for all ok results", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "block", status: "ok" },
		{ name: "test2", phase: "warn", status: "ok" },
		{ name: "test3", phase: "pending", status: "pending" },
	]
	const decision = determineDecision(results)

	assertEquals(decision, "allow")
})

Deno.test("determineDecision returns block when blocker exists", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "block", status: "error" },
		{ name: "test2", phase: "warn", status: "ok" },
	]
	const decision = determineDecision(results)

	assertEquals(decision, "block")
})

Deno.test("determineDecision returns warn for warning status", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "block", status: "ok" },
		{ name: "test2", phase: "warn", status: "warn" },
	]
	const decision = determineDecision(results)

	assertEquals(decision, "warn")
})

Deno.test("determineDecision returns warn for warn phase with error", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "block", status: "ok" },
		{ name: "test2", phase: "warn", status: "error" },
	]
	const decision = determineDecision(results)

	assertEquals(decision, "warn")
})

Deno.test("determineDecision prioritizes block over warn", () => {
	const results: ReadonlyArray<ScriptResult> = [
		{ name: "test1", phase: "block", status: "error" },
		{ name: "test2", phase: "warn", status: "warn" },
		{ name: "test3", phase: "warn", status: "error" },
	]
	const decision = determineDecision(results)

	assertEquals(decision, "block")
})
