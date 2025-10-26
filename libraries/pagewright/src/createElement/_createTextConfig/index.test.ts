import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _createTextConfig from "./index.ts"

Deno.test("_createTextConfig", async function createTextConfigTests(t) {
	await t.step(
		"creates text node config from string",
		function createsTextNode() {
			const result = _createTextConfig("Hello, world!")

			assertEquals(result._tag, "text")
			if (result._tag === "text") {
				assertEquals((result as any).content, "Hello, world!")
			}
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = _createTextConfig("")

			assertEquals(result._tag, "text")
			assertEquals((result as any).content, "")
		},
	)

	await t.step(
		"handles whitespace-only string",
		function handlesWhitespace() {
			const result = _createTextConfig("   \n\t  ")

			assertEquals(result._tag, "text")
			assertEquals((result as any).content, "   \n\t  ")
		},
	)

	await t.step(
		"handles special characters",
		function handlesSpecialChars() {
			const result = _createTextConfig("<>&\"'")

			assertEquals(result._tag, "text")
			assertEquals((result as any).content, "<>&\"'")
		},
	)

	await t.step(
		"handles unicode characters",
		function handlesUnicode() {
			const result = _createTextConfig("你好世界 🚀")

			assertEquals(result._tag, "text")
			assertEquals((result as any).content, "你好世界 🚀")
		},
	)

	await t.step(
		"handles multiline strings",
		function handlesMultiline() {
			const result = _createTextConfig("line1\nline2\nline3")

			assertEquals(result._tag, "text")
			assertEquals((result as any).content, "line1\nline2\nline3")
		},
	)

	await t.step(
		"preserves exact string content",
		function preservesContent() {
			const content = "This is a test string with numbers 123 and symbols !@#"
			const result = _createTextConfig(content)

			assertEquals((result as any).content, content)
		},
	)
})

Deno.test("_createTextConfig - property: always returns text tag", function alwaysTextTag() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyTextTag(value) {
				const result = _createTextConfig(value)
				assertEquals(result._tag, "text")
			},
		),
	)
})

Deno.test("_createTextConfig - property: preserves content", function preservesContent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyPreservesContent(value) {
				const result = _createTextConfig(value)
				assertEquals((result as any).content, value)
			},
		),
	)
})

Deno.test("_createTextConfig - property: idempotent config", function idempotentConfig() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = _createTextConfig(value)
				const second = _createTextConfig(value)
				assertEquals(first, second)
			},
		),
	)
})
