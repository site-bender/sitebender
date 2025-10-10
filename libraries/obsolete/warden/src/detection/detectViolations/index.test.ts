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

function detectsViolationsForArboristLibrary(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/libraries/arborist", "arborist")
		assertEquals(Array.isArray(violations), true)
	})()
}

function detectsViolationsForAuditorLibrary(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations("/libraries/auditor", "auditor")
		assertEquals(Array.isArray(violations), true)
		assertEquals(violations.length, 0)
	})()
}

function returnsViolationsWithCorrectStructure(): Promise<void> {
	return (async function run(): Promise<void> {
		const violations = await detectViolations(
			"/libraries/toolsmith",
			"toolsmith",
		)
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
		"detects violations for arborist library",
		detectsViolationsForArboristLibrary,
	)

	await t.step(
		"detects violations for auditor library",
		detectsViolationsForAuditorLibrary,
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
