import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"
import validateImport from "./index.ts"

Deno.test("validateImport", async (t) => {
	await t.step("returns valid result for allowed imports", () => {
		const result = validateImport("envoy", "parser", "@sitebender/libraries/parser/index.ts")

		assertEquals(result.valid, true)
		assertEquals(result.errors.length, 0)
	})

	await t.step("detects forbidden TypeScript imports in envoy", () => {
		const result = validateImport("envoy", "typescript", "typescript")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("CANNOT import TypeScript")))
	})

	await t.step("detects forbidden source file imports in envoy", () => {
		const result = validateImport("envoy", "local", "./file.tsx")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("CANNOT access source files")))
	})

	await t.step("allows toolkit imports from any library", () => {
		const result = validateImport("envoy", "toolkit", "@sitebender/libraries/toolkit/index.ts")

		assertEquals(result.valid, true)
		assertEquals(result.errors.length, 0)
	})

	await t.step("allows foundry imports from any library", () => {
		const result = validateImport("parser", "foundry", "@sitebender/libraries/foundry/index.ts")

		assertEquals(result.valid, true)
		assertEquals(result.errors.length, 0)
	})

	await t.step("blocks toolkit from importing other libraries", () => {
		const result = validateImport("toolkit", "parser", "@sitebender/libraries/parser/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import any @sitebender libraries")))
	})

	await t.step("blocks foundry from importing other libraries", () => {
		const result = validateImport("foundry", "envoy", "@sitebender/libraries/envoy/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import any @sitebender libraries")))
	})

	await t.step("warns when library not found in boundaries", () => {
		const result = validateImport("unknown", "toolkit", "@sitebender/libraries/toolkit/index.ts")

		assertEquals(result.valid, true)
		assertExists(result.warnings.find(w => w.includes("not found in boundaries")))
	})

	await t.step("blocks envoy from importing prover", () => {
		const result = validateImport("envoy", "prover", "@sitebender/libraries/prover/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import prover")))
	})

	await t.step("blocks parser from importing envoy", () => {
		const result = validateImport("parser", "envoy", "@sitebender/libraries/envoy/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import envoy")))
	})
})
