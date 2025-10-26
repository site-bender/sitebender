import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _createCommentConfig from "./index.ts"

Deno.test("_createCommentConfig", async function createCommentConfigTests(t) {
	await t.step(
		"creates comment node config from string",
		function createsCommentNode() {
			const result = _createCommentConfig("This is a comment")

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "This is a comment")
			}
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = _createCommentConfig("")

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "")
			}
		},
	)

	await t.step(
		"handles whitespace-only string",
		function handlesWhitespace() {
			const result = _createCommentConfig("   \n\t  ")

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "   \n\t  ")
			}
		},
	)

	await t.step(
		"handles special characters",
		function handlesSpecialChars() {
			const result = _createCommentConfig("<>&\"'")

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "<>&\"'")
			}
		},
	)

	await t.step(
		"handles unicode characters",
		function handlesUnicode() {
			const result = _createCommentConfig("你好世界 🚀")

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "你好世界 🚀")
			}
		},
	)

	await t.step(
		"handles multiline strings",
		function handlesMultiline() {
			const result = _createCommentConfig("line1\nline2\nline3")

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "line1\nline2\nline3")
			}
		},
	)

	await t.step(
		"preserves exact string content",
		function preservesContent() {
			const content = "This is a test comment with numbers 123 and symbols !@#"
			const result = _createCommentConfig(content)

			if (result._tag === "comment") {
				assertEquals(result.content, content)
			}
		},
	)

	await t.step(
		"handles HTML-like content",
		function handlesHtmlContent() {
			const result = _createCommentConfig("<div>test</div>")

			assertEquals(result._tag, "comment")
			if (result._tag === "comment") {
				assertEquals(result.content, "<div>test</div>")
			}
		},
	)

	await t.step(
		"handles long strings",
		function handlesLongStrings() {
			const longString = "a".repeat(1000)
			const result = _createCommentConfig(longString)

			if (result._tag === "comment") {
				assertEquals(result.content, longString)
				assertEquals(result.content.length, 1000)
			}
		},
	)
})

Deno.test("_createCommentConfig - property: always returns comment tag", function alwaysCommentTag() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyCommentTag(value) {
				const result = _createCommentConfig(value)
				assertEquals(result._tag, "comment")
			},
		),
	)
})

Deno.test("_createCommentConfig - property: preserves content", function preservesContent() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyPreservesContent(value) {
				const result = _createCommentConfig(value)
				if (result._tag === "comment") {
					assertEquals(result.content, value)
				}
			},
		),
	)
})

Deno.test("_createCommentConfig - property: idempotent config", function idempotentConfig() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyIdempotent(value) {
				const first = _createCommentConfig(value)
				const second = _createCommentConfig(value)
				assertEquals(first, second)
			},
		),
	)
})
