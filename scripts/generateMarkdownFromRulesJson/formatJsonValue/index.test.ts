import { assertEquals } from "https://deno.land/std/assert/mod.ts"
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
	
	await t.step("formats objects with string values as description lists", () => {
		const result = formatJsonValue(0)({ key1: "value1", key2: "value2" })
		assertEquals(result.includes("<dl>"), true)
		assertEquals(result.includes("Key 1"), true)
		assertEquals(result.includes("value1"), true)
	})
	
	await t.step("formats complex nested structures", () => {
		const complex = {
			section: {
				subsection: ["item1", "item2"]
			}
		}
		const result = formatJsonValue(0)(complex)
		assertEquals(result.includes("Section"), true)
		assertEquals(result.includes("Subsection"), true)
		assertEquals(result.includes("- item1"), true)
	})
})