import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import categorizeImport from "./index.ts"

//++ Tests for categorizeImport function that categorizes import paths
Deno.test("categorizeImport", async function testCategorizeImport(t) {
	await t.step("categorizes local imports", function testLocal() {
		assertEquals(categorizeImport("./module"), "local")
		assertEquals(categorizeImport("./utils/helper"), "local")
		assertEquals(categorizeImport("../parent"), "local")
		assertEquals(categorizeImport("../../grandparent"), "local")
		assertEquals(categorizeImport("../sibling/module"), "local")
	})

	await t.step("categorizes project types imports", function testTypes() {
		assertEquals(categorizeImport("~types/User"), "types")
		assertEquals(categorizeImport("~types/common"), "types")
		assertEquals(categorizeImport("~types/api/Response"), "types")
	})

	await t.step("categorizes project components imports", function testComponents() {
		assertEquals(categorizeImport("~codewright/Button"), "components")
		assertEquals(categorizeImport("~codewright/forms/Input"), "components")
		assertEquals(categorizeImport("~codewright/layout/Header"), "components")
	})

	await t.step("categorizes project utilities imports", function testUtilities() {
		assertEquals(categorizeImport("~utilities/format"), "utilities")
		assertEquals(categorizeImport("~utilities/api/fetch"), "utilities")
		assertEquals(categorizeImport("~utilities/date"), "utilities")
	})

	await t.step("categorizes project constants imports", function testConstants() {
		assertEquals(categorizeImport("~constants/config"), "constants")
		assertEquals(categorizeImport("~constants/routes"), "constants")
		assertEquals(categorizeImport("~constants/api/endpoints"), "constants")
	})

	await t.step("categorizes external imports", function testExternal() {
		// NPM packages
		assertEquals(categorizeImport("react"), "external")
		assertEquals(categorizeImport("@testing-library/react"), "external")
		assertEquals(categorizeImport("lodash/debounce"), "external")

		// Deno imports
		assertEquals(categorizeImport("https://deno.land/std/path/mod.ts"), "external")
		assertEquals(categorizeImport("jsr:@std/path"), "external")

		// Node built-ins
		assertEquals(categorizeImport("fs"), "external")
		assertEquals(categorizeImport("path"), "external")
		assertEquals(categorizeImport("node:crypto"), "external")

		// Absolute paths that aren't project-specific
		assertEquals(categorizeImport("/absolute/path"), "external")
		assertEquals(categorizeImport("some-package"), "external")
	})

	await t.step("handles edge cases", function testEdgeCases() {
		// Empty string
		assertEquals(categorizeImport(""), "external")

		// Just dots
		assertEquals(categorizeImport("."), "external")
		assertEquals(categorizeImport(".."), "external")

		// Paths that look similar but aren't exact matches
		assertEquals(categorizeImport("~type/something"), "external") // Not ~types/
		assertEquals(categorizeImport("types/something"), "external") // Missing ~
		assertEquals(categorizeImport("./~types/something"), "local") // Starts with ./

		// Case sensitive
		assertEquals(categorizeImport("~Types/User"), "external") // Capital T
		assertEquals(categorizeImport("~codewright/Button"), "external") // All caps
	})

	await t.step("preserves exact categorization rules", function testExactRules() {
		// Must start with exact prefix
		assertEquals(categorizeImport("~types"), "external") // No slash
		assertEquals(categorizeImport("~types/"), "types") // With slash
		assertEquals(categorizeImport("prefix~types/User"), "external") // Doesn't start with ~

		// Nested paths still categorize correctly
		assertEquals(categorizeImport("~types/deep/nested/type"), "types")
		assertEquals(categorizeImport("~codewright/very/deep/nested/component"), "components")
	})
})

//?? [EXAMPLE] Run with: deno test scripts/sortImports/sortFileImports/extractImports/categorizeImport/index.test.ts
