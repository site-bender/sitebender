import { assertEquals } from "@std/assert"

import detectViolations from "./index.ts"

function returnsEmptyArrayWhenNoViolationsFound(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/fake/path", "toolsmith")

		assertEquals(Array.isArray(violations), true)
		assertEquals(violations.length, 0)
	})()
}

function detectsViolationsForEnvoyLibrary(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/libraries/envoy", "envoy")
		assertEquals(Array.isArray(violations), true)
	})()
}

function detectsViolationsForLinguistLibrary(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/libraries/linguist", "linguist")
		assertEquals(Array.isArray(violations), true)
	})()
}

function detectsViolationsForLogicianLibrary(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/libraries/logician", "logician")
		assertEquals(Array.isArray(violations), true)
		assertEquals(violations.length, 0)
	})()
}

function returnsViolationsWithCorrectStructure(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/libraries/toolsmith", "toolsmith")
		assertEquals(Array.isArray(violations), true)
		violations.forEach((v) => {
			assertEquals(typeof v.type, "string")
			assertEquals(typeof v.library, "string")
			assertEquals(typeof v.description, "string")
			assertEquals(typeof v.severity, "string")
		})
	})()
}

function handlesUnknownLibraryGracefully(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/unknown/path", "unknown")
		assertEquals(Array.isArray(violations), true)
		assertEquals(violations.length, 0)
	})()
}

Deno.test("detectViolations", async (t) => {
	await t.step(
		"returns empty array when no violations found",
		returnsEmptyArrayWhenNoViolationsFound,
	)

	await t.step(
		"detects violations for envoy library",
		detectsViolationsForEnvoyLibrary,
	)

	await t.step(
		"detects violations for linguist library",
		detectsViolationsForLinguistLibrary,
	)

	await t.step(
		"detects violations for logician library",
		detectsViolationsForLogicianLibrary,
	)

	await t.step(
		"returns violations with correct structure",
		returnsViolationsWithCorrectStructure,
	)

	await t.step(
		"handles unknown library gracefully",
		handlesUnknownLibraryGracefully,
	)
})
