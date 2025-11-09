import type { CommentNode } from "../../types/index.ts"

import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import getCommentContent from "./index.ts"

Deno.test("getCommentContent", async function getCommentContentTests(t) {
	await t.step(
		"returns ok with content for valid CommentNode",
		function returnsOkWithContent() {
			const node: CommentNode = {
				_tag: "comment",
				content: "This is a comment",
			}

			const result = getCommentContent(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "This is a comment")
			}
		},
	)

	await t.step(
		"returns ok for empty string content",
		function worksWithEmptyContent() {
			const node: CommentNode = {
				_tag: "comment",
				content: "",
			}

			const result = getCommentContent(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "")
			}
		},
	)

	await t.step(
		"returns error for non-CommentNode",
		function returnsErrorForNonCommentNode() {
			const node = {
				_tag: "text",
				content: "not a comment",
			} as unknown as CommentNode

			const result = getCommentContent(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_COMMENT_NODE")
			}
		},
	)

	await t.step(
		"returns error for node missing content",
		function returnsErrorForMissingContent() {
			const node = {
				_tag: "comment",
			} as unknown as CommentNode

			const result = getCommentContent(node)

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
				_tag: "comment",
				content: 123,
			} as unknown as CommentNode

			const result = getCommentContent(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_CONTENT_TYPE")
			}
		},
	)

	await t.step(
		"protects against type assertion bypasses",
		function protectsAgainstTypeAssertions() {
			const node = {} as CommentNode

			const result = getCommentContent(node)

			assert(result._tag === "Error")
		},
	)
})
