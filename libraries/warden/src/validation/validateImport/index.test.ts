import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"
import validateImport from "./index.ts"

Deno.test("validateImport", async (t) => {
	await t.step("returns valid result for allowed imports", () => {
		const result = validateImport("envoy", "linguist", "@sitebender/libraries/linguist/index.ts")

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

	await t.step("allows toolsmith imports from any library", () => {
		const result = validateImport("envoy", "toolsmith", "@sitebender/libraries/toolsmith/index.ts")

		assertEquals(result.valid, true)
		assertEquals(result.errors.length, 0)
	})

	await t.step("allows quarrier imports from any library", () => {
		const result = validateImport("linguist", "quarrier", "@sitebender/libraries/quarrier/index.ts")

		assertEquals(result.valid, true)
		assertEquals(result.errors.length, 0)
	})

	await t.step("blocks toolsmith from importing other libraries", () => {
		const result = validateImport("toolsmith", "linguist", "@sitebender/libraries/linguist/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import any @sitebender libraries")))
	})

	await t.step("blocks quarrier from importing other libraries", () => {
		const result = validateImport("quarrier", "envoy", "@sitebender/libraries/envoy/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import any @sitebender libraries")))
	})

	await t.step("warns when library not found in boundaries", () => {
		const result = validateImport("unknown", "toolsmith", "@sitebender/libraries/toolsmith/index.ts")

		assertEquals(result.valid, true)
		assertExists(result.warnings.find(w => w.includes("not found in boundaries")))
	})

	await t.step("blocks envoy from importing logician", () => {
		const result = validateImport("envoy", "logician", "@sitebender/libraries/logician/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import logician")))
	})

	await t.step("blocks linguist from importing envoy", () => {
		const result = validateImport("linguist", "envoy", "@sitebender/libraries/envoy/index.ts")

		assertEquals(result.valid, false)
		assertExists(result.errors.find(e => e.includes("cannot import envoy")))
	})
})
