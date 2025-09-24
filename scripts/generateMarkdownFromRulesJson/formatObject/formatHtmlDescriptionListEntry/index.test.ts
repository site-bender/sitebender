import { assertEquals } from "@std/assert"

import includes from "../../../../libraries/toolsmith/src/vanilla/string/contains/index.ts"
import formatHtmlDescriptionListEntry from "./index.ts"

//++ Tests for formatHtmlDescriptionListEntry
Deno.test("formatHtmlDescriptionListEntry", async (t) => {
	await t.step("formats simple key-value pair", () => {
		const result = formatHtmlDescriptionListEntry(["name", "Test"])

		assertEquals(
			result,
			"<div>\n<dt><strong>Name</strong></dt>\n<dd>Test</dd>\n</div>",
		)
	})

	await t.step("formats camelCase keys", () => {
		const result = formatHtmlDescriptionListEntry(["firstName", "John"])

		assertEquals(includes("<dt><strong>First name</strong></dt>")(result), true)
		assertEquals(includes("<dd>John</dd>")(result), true)
	})

	await t.step("formats snake_case keys", () => {
		const result = formatHtmlDescriptionListEntry(["user_name", "alice"])

		assertEquals(includes("<dt><strong>User name</strong></dt>")(result), true)
		assertEquals(includes("<dd>alice</dd>")(result), true)
	})

	await t.step("preserves value exactly as provided", () => {
		const result = formatHtmlDescriptionListEntry(["key", "Value With Spaces"])

		assertEquals(includes("<dd>Value With Spaces</dd>")(result), true)
	})
})
