import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"
import getForbiddenPatterns from "./index.ts"

Deno.test("getForbiddenPatterns", async (t) => {
	await t.step("returns patterns for envoy library", () => {
		const patterns = getForbiddenPatterns("envoy")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("TypeScript")))
	})

	await t.step("returns patterns for prover library", () => {
		const patterns = getForbiddenPatterns("prover")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("TypeScript")))
	})

	await t.step("returns patterns for toolkit library", () => {
		const patterns = getForbiddenPatterns("toolkit")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("Toolkit importing")))
	})

	await t.step("returns patterns for foundry library", () => {
		const patterns = getForbiddenPatterns("foundry")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("Foundry importing")))
	})

	await t.step("returns empty array for unknown library", () => {
		const patterns = getForbiddenPatterns("unknown")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length, 0)
	})

	await t.step("patterns have correct structure", () => {
		const patterns = getForbiddenPatterns("envoy")

		patterns.forEach(pattern => {
			assertEquals(pattern.regex instanceof RegExp, true)
			assertEquals(typeof pattern.description, "string")
		})
	})
})