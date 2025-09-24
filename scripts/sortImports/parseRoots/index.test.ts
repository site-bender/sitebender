import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import parseRoots from "./index.ts"

//++ Tests for parseRoots function that parses root directories from command-line arguments
Deno.test("parseRoots", async function testParseRoots(t) {
	await t.step("returns defaults when no args provided", function testNoArgs() {
		const result = parseRoots([])

		assertEquals(result, ["agent", "mission-control", "the-workshop", "libraries", "scripts"])
	})

	await t.step("returns defaults when only flags provided", function testOnlyFlags() {
		const result = parseRoots(["--verbose", "--dry-run"])

		assertEquals(result, ["agent", "mission-control", "the-workshop", "libraries", "scripts"])
	})

	await t.step("extracts directories from --dir= flags", function testDirFlags() {
		const result = parseRoots(["--dir=src", "--dir=tests"])

		assertEquals(result, ["src", "tests"])
	})

	await t.step("extracts plain directory arguments", function testPlainArgs() {
		const result = parseRoots(["src", "lib", "tests"])

		assertEquals(result, ["src", "lib", "tests"])
	})

	await t.step("mixes --dir= flags and plain arguments", function testMixedArgs() {
		const result = parseRoots(["--dir=src", "lib", "--dir=tests", "mission-control"])

		assertEquals(result, ["src", "lib", "tests", "mission-control"])
	})

	await t.step("ignores non-directory flags", function testIgnoresOtherFlags() {
		const result = parseRoots([
			"--verbose",
			"src",
			"--dry-run",
			"--dir=lib",
			"tests",
			"--help"
		])

		assertEquals(result, ["src", "lib", "tests"])
	})

	await t.step("handles empty --dir= flag", function testEmptyDirFlag() {
		const result = parseRoots(["--dir=", "src"])

		assertEquals(result, ["", "src"]) // Empty string is preserved
	})

	await t.step("handles directories with special characters", function testSpecialChars() {
		const result = parseRoots([
			"--dir=my-dir",
			"test_folder",
			"--dir=./path/to/dir",
			"@scope/package"
		])

		assertEquals(result, ["my-dir", "test_folder", "./path/to/dir", "@scope/package"])
	})

	await t.step("preserves order of directories", function testPreservesOrder() {
		const result = parseRoots(["zebra", "alpha", "beta"])

		assertEquals(result, ["zebra", "alpha", "beta"])
	})

	await t.step("handles single directory", function testSingleDirectory() {
		const result = parseRoots(["src"])

		assertEquals(result, ["src"])
	})

	await t.step("handles --dir flag with equals and value", function testDirWithEquals() {
		const result = parseRoots(["--dir=applications/mission-control"])

		assertEquals(result, ["applications/mission-control"])
	})

	await t.step("filters out flags starting with dash", function testFiltersDashFlags() {
		const result = parseRoots([
			"-v",
			"src",
			"-rf",
			"--recursive",
			"lib",
			"-abc"
		])

		assertEquals(result, ["src", "lib"])
	})
})

//?? [EXAMPLE] Run with: deno test scripts/sortImports/linguistoots/index.test.ts
