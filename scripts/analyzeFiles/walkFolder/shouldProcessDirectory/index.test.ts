import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import shouldProcessDirectory from "./index.ts"

//++ Tests for shouldProcessDirectory function
Deno.test("shouldProcessDirectory", async function testShouldProcessDirectory(t) {
	const commonExclusions = new Set(["node_modules", ".git", "dist", "build"])
	const checkCommonDirs = shouldProcessDirectory(commonExclusions)

	await t.step("creates a predicate function", function testCreatesPredicate() {
		assertEquals(typeof checkCommonDirs, "function")
	})

	await t.step("allows non-excluded directories", function testAllowsNonExcluded() {
		assertEquals(checkCommonDirs("src"), true)
		assertEquals(checkCommonDirs("components"), true)
		assertEquals(checkCommonDirs("utils"), true)
		assertEquals(checkCommonDirs("tests"), true)
	})

	await t.step("blocks excluded directories", function testBlocksExcluded() {
		assertEquals(checkCommonDirs("node_modules"), false)
		assertEquals(checkCommonDirs(".git"), false)
		assertEquals(checkCommonDirs("dist"), false)
		assertEquals(checkCommonDirs("build"), false)
	})

	await t.step("handles empty exclusion set", function testEmptyExclusions() {
		const checkDir = shouldProcessDirectory(new Set())

		assertEquals(checkDir("node_modules"), true)
		assertEquals(checkDir(".git"), true)
		assertEquals(checkDir("anything"), true)
	})

	await t.step("is case sensitive", function testCaseSensitive() {
		const excludedDirs = new Set(["node_modules"])
		const checkDir = shouldProcessDirectory(excludedDirs)

		assertEquals(checkDir("node_modules"), false)
		assertEquals(checkDir("NODE_MODULES"), true)
		assertEquals(checkDir("Node_Modules"), true)
	})

	await t.step("handles typical exclusions", function testTypicalExclusions() {
		const excludedDirs = new Set([
			"node_modules",
			".git",
			"dist",
			"build",
			"coverage",
			"fixtures",
			"tests",
			"constants",
			"types",
		])
		const checkDir = shouldProcessDirectory(excludedDirs)

		assertEquals(checkDir("src"), true)
		assertEquals(checkDir("lib"), true)
		assertEquals(checkDir("components"), true)

		assertEquals(checkDir("node_modules"), false)
		assertEquals(checkDir(".git"), false)
		assertEquals(checkDir("coverage"), false)
		assertEquals(checkDir("types"), false)
	})
})

//?? [EXAMPLE] Run with: deno test scripts/analyzeFiles/walkFolder/shouldProcessDirectory/index.test.ts