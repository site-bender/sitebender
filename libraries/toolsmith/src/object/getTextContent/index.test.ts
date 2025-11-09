import type { TextNode } from "../../types/index.ts"

import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import getTextContent from "./index.ts"

Deno.test("getTextContent", async function getTextContentTests(t) {
	await t.step(
		"returns ok with content for valid TextNode",
		function returnsOkWithContent() {
			const node: TextNode = {
				_tag: "text",
				content: "Hello, world!",
			}

			const result = getTextContent(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "Hello, world!")
			}
		},
	)

	await t.step(
		"returns ok for empty string content",
		function worksWithEmptyContent() {
			const node: TextNode = {
				_tag: "text",
				content: "",
			}

			const result = getTextContent(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "")
			}
		},
	)

	await t.step(
		"returns error for non-TextNode",
		function returnsErrorForNonTextNode() {
			const node = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			} as unknown as TextNode

			const result = getTextContent(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_TEXT_NODE")
			}
		},
	)

	await t.step(
		"returns error for node missing content",
		function returnsErrorForMissingContent() {
			const node = {
				_tag: "text",
			} as unknown as TextNode

			const result = getTextContent(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "MISSING_CONTENT")
			}
		},
	)

	await t.step(
		"returns error for non-string content",
		function returnsErrorForNonStringContent() {
			const node = {
				_tag: "text",
				content: 123,
			} as unknown as TextNode

			const result = getTextContent(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_CONTENT_TYPE")
			}
		},
	)

	await t.step(
		"protects against type assertion bypasses",
		function protectsAgainstTypeAssertions() {
			const node = {} as TextNode

			const result = getTextContent(node)

			assert(result._tag === "Error")
		},
	)
})
