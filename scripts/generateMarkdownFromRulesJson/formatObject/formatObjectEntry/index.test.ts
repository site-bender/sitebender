import { assertEquals } from "@std/assert"

import type { JsonValue } from "../../types/index.ts"

import formatObjectEntry from "./index.ts"

//++ Tests for formatObjectEntry
Deno.test("formatObjectEntry", async (t) => {
	function mockFormatValue(value: JsonValue): string {
		return String(value)
	}

	const formatter = formatObjectEntry(mockFormatValue)

	await t.step("formats simple string entry", () => {
		const result = formatter(["name", "Test"])

		assertEquals(result, "**Name**: Test")
	})

	await t.step("formats camelCase keys", () => {
		const result = formatter(["firstName", "John"])

		assertEquals(result, "**First name**: John")
	})

	await t.step("formats snake_case keys", () => {
		const result = formatter(["user_name", "alice"])

		assertEquals(result, "**User name**: alice")
	})

	await t.step("formats number values", () => {
		const result = formatter(["count", 42])

		assertEquals(result, "**Count**: 42")
	})

	await t.step("formats boolean values", () => {
		const result = formatter(["enabled", true])

		assertEquals(result, "**Enabled**: true")
	})

	await t.step("uses provided formatter for complex values", () => {
		function typeFormatter(value: JsonValue): string {
			return `[${typeof value}]`
		}

		const customFormatter = formatObjectEntry(typeFormatter)
		const result = customFormatter(["data", { nested: true }])

		assertEquals(result, "**Data**: [object]")
	})
})
