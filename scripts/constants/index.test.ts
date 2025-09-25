import {
	assertEquals,
	assertExists,
	assertInstanceOf,
} from "https://deno.land/std/assert/mod.ts"

import {
	ARCHITECT_SRC,
	ARCHITECT_TYPES,
	DEFAULT_ALIAS_SCOPES,
	DEFAULT_FP_GLOBS,
	DEFAULT_NO_REACT_GLOBS,
	FORMAT_EXCLUDES,
	FORMAT_EXTENSIONS,
	FORMAT_ROOTS,
	FP_ALLOWLIST,
	FP_FORBIDDEN,
	NO_REACT_ALLOWLIST,
	TOOLSMITH_SRC,
} from "./index.ts"

//++ Tests for script constants and configuration
Deno.test("constants", async function testConstants(t) {
	await t.step("exports path constants", function testPaths() {
		assertEquals(typeof ARCHITECT_SRC, "string")
		assertEquals(ARCHITECT_SRC, "libraries/architect/src/")
		assertEquals(typeof ARCHITECT_TYPES, "string")
		assertEquals(ARCHITECT_TYPES, "libraries/architect/types/")
		assertEquals(typeof TOOLSMITH_SRC, "string")
		assertEquals(TOOLSMITH_SRC, "libraries/toolsmith/src/")
	})

	await t.step("exports alias scopes", function testAliasScopes() {
		assertExists(DEFAULT_ALIAS_SCOPES)
		assertInstanceOf(DEFAULT_ALIAS_SCOPES, Array)
		assertEquals(DEFAULT_ALIAS_SCOPES.length > 0, true)
		assertEquals(
			DEFAULT_ALIAS_SCOPES.includes("libraries/pagewright/src"),
			true,
		)
		assertEquals(
			DEFAULT_ALIAS_SCOPES.includes("applications/mission-control/src"),
			true,
		)
		assertEquals(DEFAULT_ALIAS_SCOPES.includes("scripts"), true)
	})

	await t.step("exports FP globs", function testFpGlobs() {
		assertExists(DEFAULT_FP_GLOBS)
		assertInstanceOf(DEFAULT_FP_GLOBS, Array)
		assertEquals(DEFAULT_FP_GLOBS.length > 0, true)
		// Check glob patterns are strings
		for (const glob of DEFAULT_FP_GLOBS) {
			assertEquals(typeof glob, "string")
			assertEquals(glob.includes("*"), true) // Should contain wildcards
		}
	})

	await t.step("exports FP forbidden patterns", function testFpForbidden() {
		assertExists(FP_FORBIDDEN)
		assertInstanceOf(FP_FORBIDDEN, Array)
		assertEquals(FP_FORBIDDEN.length > 0, true)

		// Check structure of forbidden patterns
		for (const pattern of FP_FORBIDDEN) {
			assertExists(pattern.name)
			assertEquals(typeof pattern.name, "string")
			assertExists(pattern.regex)
			assertInstanceOf(pattern.regex, RegExp)
		}

		// Check specific patterns exist
		const names = FP_FORBIDDEN.map((p) => p.name)
		assertEquals(names.includes("let"), true)
		assertEquals(names.includes("var"), true)
		assertEquals(names.includes("for-loop"), true)
		assertEquals(names.includes("class"), true)
		assertEquals(names.includes("push"), true)
		assertEquals(names.includes("pop"), true)
		assertEquals(names.includes("throw"), true)
	})

	await t.step("exports FP allowlist", function testFpAllowlist() {
		assertExists(FP_ALLOWLIST)
		assertInstanceOf(FP_ALLOWLIST, Set)

		// Check it contains expected files
		assertEquals(
			FP_ALLOWLIST.has("libraries/toolsmith/src/state/store.ts"),
			true,
		)
		assertEquals(
			FP_ALLOWLIST.has("libraries/architect/src/reactive/signal.ts"),
			true,
		)
	})

	await t.step("exports no-React globs", function testNoReactGlobs() {
		assertExists(DEFAULT_NO_REACT_GLOBS)
		assertInstanceOf(DEFAULT_NO_REACT_GLOBS, Array)
		assertEquals(DEFAULT_NO_REACT_GLOBS.length > 0, true)

		for (const glob of DEFAULT_NO_REACT_GLOBS) {
			assertEquals(typeof glob, "string")
		}
	})

	await t.step("exports no-React allowlist", function testNoReactAllowlist() {
		assertExists(NO_REACT_ALLOWLIST)
		assertInstanceOf(NO_REACT_ALLOWLIST, Set)
	})

	await t.step("exports format configuration", function testFormatConfig() {
		assertExists(FORMAT_ROOTS)
		assertInstanceOf(FORMAT_ROOTS, Array)
		assertEquals(FORMAT_ROOTS.length > 0, true)

		assertExists(FORMAT_EXTENSIONS)
		assertInstanceOf(FORMAT_EXTENSIONS, Array)
		assertEquals(FORMAT_EXTENSIONS.length > 0, true)
		assertEquals(FORMAT_EXTENSIONS.includes("ts"), true)
		assertEquals(FORMAT_EXTENSIONS.includes("tsx"), true)

		assertExists(FORMAT_EXCLUDES)
		assertInstanceOf(FORMAT_EXCLUDES, Array)
		// Common exclusions
		for (const exclude of FORMAT_EXCLUDES) {
			assertEquals(typeof exclude, "string")
		}
	})

	await t.step(
		"regex patterns match expected code",
		function testRegexPatterns() {
			// Test FP forbidden patterns
			const letPattern = FP_FORBIDDEN.find((p) => p.name === "let")!
			assertEquals(letPattern.regex.test("let x = 5"), true)
			assertEquals(letPattern.regex.test("letter"), false) // Should not match inside words

			const classPattern = FP_FORBIDDEN.find((p) => p.name === "class")!
			assertEquals(classPattern.regex.test("class MyClass {"), true)
			assertEquals(classPattern.regex.test("className"), false) // Should not match className

			const pushPattern = FP_FORBIDDEN.find((p) => p.name === "push")!
			assertEquals(pushPattern.regex.test("arr.push(item)"), true)
			assertEquals(pushPattern.regex.test("pushButton"), false) // Should not match function names
		},
	)
})

//?? [EXAMPLE] Run with: deno test scripts/constants/index.test.ts
