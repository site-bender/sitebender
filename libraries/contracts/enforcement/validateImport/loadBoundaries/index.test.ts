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

	await t.step("includes parser library configuration", () => {
		const boundaries = loadBoundaries()
		const parserConfig = boundaries.dependencies.parser

		assertExists(parserConfig)
		assertEquals(Array.isArray(parserConfig.canImport), true)
		assertEquals(Array.isArray(parserConfig.forbiddenImports), true)
	})

	await t.step("includes toolkit library configuration", () => {
		const boundaries = loadBoundaries()
		const toolkitConfig = boundaries.dependencies.toolkit

		assertExists(toolkitConfig)
		assertEquals(Array.isArray(toolkitConfig.canImport), true)
		assertEquals(toolkitConfig.canImport.length, 0)
		assertEquals(toolkitConfig.forbiddenImports[0], "*")
	})

	await t.step("includes foundry library configuration", () => {
		const boundaries = loadBoundaries()
		const foundryConfig = boundaries.dependencies.foundry

		assertExists(foundryConfig)
		assertEquals(Array.isArray(foundryConfig.canImport), true)
		assertEquals(foundryConfig.canImport.length, 0)
		assertEquals(foundryConfig.forbiddenImports[0], "*")
	})

	await t.step("envoy cannot import typescript", () => {
		const boundaries = loadBoundaries()
		const envoyConfig = boundaries.dependencies.envoy

		assertExists(envoyConfig.forbiddenImports.find(i => i === "typescript"))
	})

	await t.step("parser cannot import envoy", () => {
		const boundaries = loadBoundaries()
		const parserConfig = boundaries.dependencies.parser

		assertExists(parserConfig.forbiddenImports.find(i => i === "envoy"))
	})
})