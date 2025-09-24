import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"
import getForbiddenPatterns from "./index.ts"

Deno.test("getForbiddenPatterns", async (t) => {
	await t.step("returns patterns for envoy library", () => {
		const patterns = getForbiddenPatterns("envoy")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("TypeScript")))
	})

	await t.step("returns patterns for logician library", () => {
		const patterns = getForbiddenPatterns("logician")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("TypeScript")))
	})

	await t.step("returns patterns for toolsmith library", () => {
		const patterns = getForbiddenPatterns("toolsmith")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("Toolsmith importing")))
	})

	await t.step("returns patterns for quarrier library", () => {
		const patterns = getForbiddenPatterns("quarrier")

		assertEquals(Array.isArray(patterns), true)
		assertEquals(patterns.length > 0, true)
		assertExists(patterns.find(p => p.description.includes("Quarrier importing")))
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
