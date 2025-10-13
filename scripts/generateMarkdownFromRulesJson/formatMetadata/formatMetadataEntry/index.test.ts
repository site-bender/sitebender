import { assertEquals } from "@std/assert"

import type { JsonValue } from "../../types/index.ts"

import includes from "../../../../libraries/toolsmith/src/string/contains/index.ts"
import formatMetadataEntry from "./index.ts"

//++ Tests for formatMetadataEntry
Deno.test("formatMetadataEntry", async (t) => {
	await t.step("formats simple string metadata", () => {
		const entry: [string, JsonValue] = ["version", "1.0.0"]
		const result = formatMetadataEntry(entry)

		assertEquals(result, "**Version**: 1.0.0")
	})

	await t.step("formats camelCase keys", () => {
		const entry: [string, JsonValue] = ["lastUpdated", "2025-01-11"]
		const result = formatMetadataEntry(entry)

		assertEquals(result, "**Last updated**: 2025-01-11")
	})

	await t.step("formats number values", () => {
		const entry: [string, JsonValue] = ["count", 42]
		const result = formatMetadataEntry(entry)

		assertEquals(result, "**Count**: 42")
	})

	await t.step("formats boolean values", () => {
		const entry: [string, JsonValue] = ["enabled", true]
		const result = formatMetadataEntry(entry)

		assertEquals(result, "**Enabled**: true")
	})

	await t.step("formats array values", () => {
		const entry: [string, JsonValue] = ["scope", ["lib", "app"]]
		const result = formatMetadataEntry(entry)

		assertEquals(includes("**Scope**:\n")(result), true)
		assertEquals(includes("- lib")(result), true)
		assertEquals(includes("- app")(result), true)
	})
})
