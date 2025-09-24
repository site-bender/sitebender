import { assertEquals } from "@std/assert"

import formatArray from "./index.ts"

//++ Tests for formatArray
Deno.test("formatArray", async (t) => {
	function mockFormatValue(value: unknown): string {
		if (typeof value === "object" && value !== null) {
			return `{nested object}`
		}
		return String(value)
	}

	await t.step("returns '_empty list_' for empty array", () => {
		const result = formatArray(0)(mockFormatValue)([])

		assertEquals(result, "_empty list_")
	})

	await t.step("formats string array as bullet list", () => {
		const result = formatArray(0)(mockFormatValue)(["item1", "item2", "item3"])

		assertEquals(result, "- item1\n- item2\n- item3")
	})

	await t.step("formats string array with indentation", () => {
		const result = formatArray(2)(mockFormatValue)(["item1", "item2"])

		assertEquals(result, "    - item1\n    - item2")
	})

	await t.step("formats complex array as numbered list", () => {
		const result = formatArray(0)(mockFormatValue)([
			{ key: "value" },
			"string",
			42,
		])
		const expected = "1. {nested object}\n\n2. string\n\n3. 42"

		assertEquals(result, expected)
	})

	await t.step("formats complex array with indentation", () => {
		const result = formatArray(1)(mockFormatValue)([{ key: "value" }, 42])
		const expected = "  1. {nested object}\n\n  2. 42"

		assertEquals(result, expected)
	})
})
