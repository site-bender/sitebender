import { assertEquals } from "@std/assert"

import type { JsonValue } from "../types/index.ts"

import includes from "../../../libraries/toolsmith/src/string/contains/index.ts"
import formatMetadata from "./index.ts"

//++ Tests for formatMetadata
Deno.test("formatMetadata", async (t) => {
	await t.step("formats single metadata entry", () => {
		const input: Array<[string, JsonValue]> = [["version", "1.0"]]
		const result = formatMetadata(input)

		assertEquals(result, "**Version**: 1.0\n")
	})

	await t.step("formats multiple metadata entries", () => {
		const input: Array<[string, JsonValue]> = [
			["version", "1.0.0"],
			["author", "The Architect"],
			["lastUpdated", "2025-01-11"],
		]

		const result = formatMetadata(input)

		assertEquals(
			result,
			"**Version**: 1.0.0  \n**Author**: The Architect  \n**Last updated**: 2025-01-11\n",
		)
	})

	await t.step("handles complex values", () => {
		const input: Array<[string, JsonValue]> = [
			["scope", ["pagewright", "architect", "toolsmith"]],
			["inherits", { from: "base", version: "2.0" }],
		]

		const result = formatMetadata(input)

		// Complex values get formatted by formatJsonValue
		assertEquals(includes("**Scope**:")(result), true)
		assertEquals(includes("**Inherits**:")(result), true)
	})

	await t.step("formats camelCase keys properly", () => {
		const input: Array<[string, JsonValue]> = [
			["rulesPhilosophy", "Test"],
			["primeDirective", "Test"],
		]

		const result = formatMetadata(input)

		assertEquals(includes("**Rules philosophy**:")(result), true)
		assertEquals(includes("**Prime directive**:")(result), true)
	})

	await t.step("handles empty array", () => {
		const input: Array<[string, JsonValue]> = []
		const result = formatMetadata(input)

		assertEquals(result, "\n")
	})
})
