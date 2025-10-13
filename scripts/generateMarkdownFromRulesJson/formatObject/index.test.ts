import { assertEquals } from "@std/assert"

import type { JsonObject, JsonValue } from "../types/index.ts"

import includes from "../../../libraries/toolsmith/src/string/contains/index.ts"
import formatObject from "./index.ts"

//++ Tests for formatObject
Deno.test("formatObject", async (t) => {
	function mockFormatValue(value: JsonValue): string {
		return String(value)
	}

	await t.step("returns '_empty object_' for empty object", () => {
		const obj: JsonObject = {}
		const result = formatObject(mockFormatValue)(obj)

		assertEquals(result, "_empty object_")
	})

	await t.step(
		"formats object with all string values as HTML description list",
		() => {
			const obj: JsonObject = {
				name: "Test",
				description: "A test object",
				version: "1.0.0",
			}
			const result = formatObject(mockFormatValue)(obj)

			assertEquals(includes("<dl>")(result), true)
			assertEquals(includes("</dl>")(result), true)
			assertEquals(includes("<dt><strong>Name</strong></dt>")(result), true)
			assertEquals(includes("<dd>Test</dd>")(result), true)
			assertEquals(
				includes("<dt><strong>Description</strong></dt>")(result),
				true,
			)
			assertEquals(includes("<dd>A test object</dd>")(result), true)
		},
	)

	await t.step("formats complex object with mixed values", () => {
		const obj: JsonObject = {
			name: "Test",
			count: 42,
			enabled: true,
		}
		const result = formatObject(mockFormatValue)(obj)

		assertEquals(includes("**Name**: Test")(result), true)
		assertEquals(includes("**Count**: 42")(result), true)
		assertEquals(includes("**Enabled**: true")(result), true)
		assertEquals(includes("<dl>")(result), false) // Should not use HTML for mixed types
	})

	await t.step("formats nested objects", () => {
		const obj: JsonObject = {
			config: { port: 3000, host: "localhost" },
			flags: ["debug", "verbose"],
		}
		const result = formatObject(mockFormatValue)(obj)

		assertEquals(includes("**Config**:")(result), true)
		assertEquals(includes("**Flags**:")(result), true)
	})

	await t.step("formats camelCase keys properly", () => {
		const obj: JsonObject = {
			rulesPhilosophy: "Test philosophy",
			primeDirective: "Test directive",
		}
		const result = formatObject(mockFormatValue)(obj)

		assertEquals(includes("Rules philosophy")(result), true)
		assertEquals(includes("Prime directive")(result), true)
	})
})
