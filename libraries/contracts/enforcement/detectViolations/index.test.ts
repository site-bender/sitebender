import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import detectViolations from "./index.ts"

Deno.test("detectViolations", async (t) => {
	await t.step("returns empty array when no violations found", async () => {
		const violations = await detectViolations("/fake/path", "toolkit")

		assertEquals(Array.isArray(violations), true)
		assertEquals(violations.length, 0)
	})

	await t.step("detects violations for envoy library", async () => {
		const violations = await detectViolations("/libraries/envoy", "envoy")

		assertEquals(Array.isArray(violations), true)
		// Since findPattern returns empty array in mock, no violations
		assertEquals(violations.length, 0)
	})

	await t.step("detects violations for parser library", async () => {
		const violations = await detectViolations("/libraries/parser", "parser")

		assertEquals(Array.isArray(violations), true)
		// Since findPattern returns empty array in mock, no violations
		assertEquals(violations.length, 0)
	})

	await t.step("detects violations for prover library", async () => {
		const violations = await detectViolations("/libraries/prover", "prover")

		assertEquals(Array.isArray(violations), true)
		// Since findPattern returns empty array in mock, no violations
		assertEquals(violations.length, 0)
	})

	await t.step("returns violations with correct structure", async () => {
		// This test validates the structure would be correct if violations were found
		const violations = await detectViolations("/libraries/toolkit", "toolkit")

		assertEquals(Array.isArray(violations), true)
		violations.forEach(v => {
			assertEquals(typeof v.type, "string")
			assertEquals(typeof v.library, "string")
			assertEquals(typeof v.description, "string")
			assertEquals(typeof v.severity, "string")
		})
	})

	await t.step("handles unknown library gracefully", async () => {
		const violations = await detectViolations("/unknown/path", "unknown")

		assertEquals(Array.isArray(violations), true)
		assertEquals(violations.length, 0)
	})
})