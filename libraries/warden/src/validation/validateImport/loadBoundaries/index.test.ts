import { assertEquals, assertExists } from "https://deno.land/std/assert/mod.ts"

import loadBoundaries from "./index.ts"

Deno.test("loadBoundaries", async (t) => {
	await t.step("returns boundaries configuration object", () => {
		const boundaries = loadBoundaries()

		assertExists(boundaries)
		assertExists(boundaries.dependencies)
		assertEquals(typeof boundaries.dependencies, "object")
	})

	await t.step("includes envoy library configuration", () => {
		const boundaries = loadBoundaries()
		const envoyConfig = boundaries.dependencies.envoy

		assertExists(envoyConfig)
		assertEquals(Array.isArray(envoyConfig.canImport), true)
		assertEquals(Array.isArray(envoyConfig.forbiddenImports), true)
	})

	await t.step("includes arborist library configuration", () => {
		const boundaries = loadBoundaries()
		const arboristConfig = boundaries.dependencies.arborist

		assertExists(arboristConfig)
		assertEquals(Array.isArray(arboristConfig.canImport), true)
		assertEquals(Array.isArray(arboristConfig.forbiddenImports), true)
	})

	await t.step("includes toolsmith library configuration", () => {
		const boundaries = loadBoundaries()
		const toolsmithConfig = boundaries.dependencies.toolsmith

		assertExists(toolsmithConfig)
		assertEquals(Array.isArray(toolsmithConfig.canImport), true)
		assertEquals(toolsmithConfig.canImport.length, 0)
		assertEquals(toolsmithConfig.forbiddenImports[0], "*")
	})

	await t.step("includes quarrier library configuration", () => {
		const boundaries = loadBoundaries()
		const quarrierConfig = boundaries.dependencies.quarrier

		assertExists(quarrierConfig)
		assertEquals(Array.isArray(quarrierConfig.canImport), true)
		// Quarrier is allowed to import Toolsmith
		assertEquals(quarrierConfig.canImport.includes("toolsmith"), true)
		assertEquals(quarrierConfig.forbiddenImports[0], "*")
	})

	await t.step("envoy cannot import typescript", () => {
		const boundaries = loadBoundaries()
		const envoyConfig = boundaries.dependencies.envoy

		assertExists(envoyConfig.forbiddenImports.find((i) => i === "typescript"))
	})

	await t.step("arborist cannot import envoy", () => {
		const boundaries = loadBoundaries()
		const arboristConfig = boundaries.dependencies.arborist

		assertExists(arboristConfig.forbiddenImports.find((i) => i === "envoy"))
	})
})
