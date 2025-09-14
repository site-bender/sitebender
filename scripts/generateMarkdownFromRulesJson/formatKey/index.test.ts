import { assertEquals } from "@std/assert"

import formatKey from "./index.ts"

//++ Tests for formatKey
Deno.test("formatKey", async (t) => {
	await t.step("formats camelCase keys", () => {
		assertEquals(formatKey("primeDirective"), "Prime directive")
		assertEquals(formatKey("rulesPhilosophy"), "Rules philosophy")
		assertEquals(formatKey("sevenDeadlySins"), "Seven deadly sins")
	})

	await t.step("formats snake_case keys", () => {
		assertEquals(formatKey("snake_case_key"), "Snake case key")
		assertEquals(
			formatKey("no_delete_without_permission"),
			"No delete without permission",
		)
	})

	await t.step("formats kebab-case keys", () => {
		assertEquals(formatKey("kebab-case-key"), "Kebab case key")
		assertEquals(formatKey("single-responsibility"), "Single responsibility")
	})

	await t.step("formats SCREAMING_SNAKE_CASE keys", () => {
		assertEquals(formatKey("SCREAMING_SNAKE_CASE"), "Screaming snake case")
		assertEquals(formatKey("RULES_FILE_LOCATIONS"), "Rules file locations")
	})

	await t.step("handles single word keys", () => {
		assertEquals(formatKey("version"), "Version")
		assertEquals(formatKey("author"), "Author")
		assertEquals(formatKey("testing"), "Testing")
	})

	await t.step("handles mixed formats", () => {
		assertEquals(formatKey("XMLHttpRequest"), "Xml http request")
		assertEquals(formatKey("innerHTMLValue"), "Inner html value")
	})
})
