import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _trimString from "./index.ts"

Deno.test("_trimString", async function trimStringTests(t) {
	await t.step(
		"trims whitespace from both ends",
		function trimsWhitespace() {
			const result = _trimString("  hello world  ")

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"trims only leading whitespace",
		function trimsLeading() {
			const result = _trimString("  hello world")

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"trims only trailing whitespace",
		function trimsTrailing() {
			const result = _trimString("hello world  ")

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"handles string with no whitespace",
		function handlesNoWhitespace() {
			const result = _trimString("hello")

			assertEquals(result, "hello")
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = _trimString("")

			assertEquals(result, "")
		},
	)

	await t.step(
		"handles string with only whitespace",
		function handlesOnlyWhitespace() {
			const result = _trimString("   ")

			assertEquals(result, "")
		},
	)

	await t.step(
		"trims tabs and newlines",
		function trimsTabsAndNewlines() {
			const result = _trimString("\t\nhello\n\t")

			assertEquals(result, "hello")
		},
	)

	await t.step(
		"returns original input if not a string",
		function returnsOriginalForNonString() {
			const result = _trimString(123 as unknown as string)

			assertEquals(result, 123 as unknown as string)
		},
	)
})

Deno.test(
	"_trimString - property: length less than or equal to original",
	function lengthProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyLength(str) {
				const result = _trimString(str)

				assertEquals(typeof result === "string", true)
				if (typeof result === "string") {
					assertEquals(result.length <= str.length, true)
				}
			}),
		)
	},
)
