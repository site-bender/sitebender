import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _replaceString from "./index.ts"

Deno.test("_replaceString", async function replaceStringTests(t) {
	await t.step(
		"replaces pattern with replacement using string pattern",
		function replacesWithStringPattern() {
			const result = _replaceString("world")("universe")("hello world")

			assertEquals(result, "hello universe")
		},
	)

	await t.step(
		"replaces pattern with replacement using RegExp pattern",
		function replacesWithRegExpPattern() {
			const result = _replaceString(/world/g)("universe")("hello world")

			assertEquals(result, "hello universe")
		},
	)

	await t.step(
		"replaces all occurrences with global RegExp",
		function replacesAllOccurrences() {
			const result = _replaceString(/o/g)("0")("hello world")

			assertEquals(result, "hell0 w0rld")
		},
	)

	await t.step(
		"replaces only first occurrence without global flag",
		function replacesFirstOccurrence() {
			const result = _replaceString(/o/)("0")("hello world")

			assertEquals(result, "hell0 world")
		},
	)

	await t.step(
		"returns original string if pattern is not string or RegExp",
		function returnsOriginalForInvalidPattern() {
			const result = _replaceString(123 as unknown as string)("universe")(
				"hello world",
			)

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"returns original string if replacement is not string",
		function returnsOriginalForInvalidReplacement() {
			const result = _replaceString("world")(123 as unknown as string)(
				"hello world",
			)

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"returns original string if input is not string",
		function returnsOriginalForInvalidInput() {
			const result = _replaceString("world")("universe")(
				123 as unknown as string,
			)

			assertEquals(result, 123 as unknown as string)
		},
	)

	await t.step(
		"handles empty string replacement",
		function handlesEmptyReplacement() {
			const result = _replaceString(/[<>]/g)("")("<div>hello</div>")

			assertEquals(result, "divhello/div")
		},
	)
})

Deno.test(
	"_replaceString - property: idempotent when pattern not found",
	function idempotentProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyIdempotent(str) {
				const result = _replaceString("NONEXISTENT")("replacement")(str)

				assertEquals(result, str)
			}),
		)
	},
)
