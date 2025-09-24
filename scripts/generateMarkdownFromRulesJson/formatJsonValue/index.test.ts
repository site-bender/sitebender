import { assertEquals } from "@std/assert"

import includes from "../../../libraries/toolsmith/src/vanilla/string/contains/index.ts"
import formatJsonValue from "./index.ts"

//++ Tests for formatJsonValue
Deno.test("formatJsonValue", async (t) => {
	await t.step("formats strings as-is", () => {
		assertEquals(formatJsonValue(0)("simple string"), "simple string")
		assertEquals(formatJsonValue(0)("multi\nline"), "multi\nline")
	})

	await t.step("formats numbers and booleans", () => {
		assertEquals(formatJsonValue(0)(42), "42")
		assertEquals(formatJsonValue(0)(3.14), "3.14")
		assertEquals(formatJsonValue(0)(true), "true")
		assertEquals(formatJsonValue(0)(false), "false")
	})

	await t.step("formats null", () => {
		assertEquals(formatJsonValue(0)(null), "_null_")
	})

	await t.step("formats simple arrays as bullet lists", () => {
		assertEquals(formatJsonValue(0)(["item1", "item2"]), "- item1\n- item2")
		assertEquals(formatJsonValue(0)([]), "_empty list_")
	})

	await t.step(
		"formats objects with string values as description lists",
		() => {
			const result = formatJsonValue(0)({ key1: "value1", key2: "value2" })
			assertEquals(includes("<dl>")(result), true)
			assertEquals(includes("Key 1")(result), true)
			assertEquals(includes("value1")(result), true)
		},
	)

	await t.step("formats complex nested structures", () => {
		const complex = {
			section: {
				subsection: ["item1", "item2"],
			},
		}
		const result = formatJsonValue(0)(complex)
		assertEquals(includes("Section")(result), true)
		assertEquals(includes("Subsection")(result), true)
		assertEquals(includes("- item1")(result), true)
	})
})
