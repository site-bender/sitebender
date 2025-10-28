import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import getVirtualNodeTag from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
import type { VirtualNode } from "../../types/index.ts"

Deno.test("getVirtualNodeTag", async function getVirtualNodeTagTests(t) {
	await t.step(
		"retrieves tag from element node",
		function retrievesElementTag() {
			const element: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			const result = getVirtualNodeTag(element)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "element")
			}
		},
	)

	await t.step(
		"retrieves tag from text node",
		function retrievesTextTag() {
			const text: VirtualNode = {
				_tag: "text",
				content: "Hello world",
			}

			const result = getVirtualNodeTag(text)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "text")
			}
		},
	)

	await t.step(
		"retrieves tag from comment node",
		function retrievesCommentTag() {
			const comment: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			const result = getVirtualNodeTag(comment)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "comment")
			}
		},
	)

	await t.step(
		"retrieves tag from error node",
		function retrievesErrorTag() {
			const errorNode: VirtualNode = {
				_tag: "error",
				code: "INVALID_CHILD",
				message: "Invalid child type",
			}

			const result = getVirtualNodeTag(errorNode)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "error")
			}
		},
	)

	await t.step(
		"returns error when node is null",
		function returnsErrorWhenNull() {
			const result = getVirtualNodeTag(null as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "INVALID_VIRTUAL_NODE")
			}
		},
	)

	await t.step(
		"returns error when node is not an object",
		function returnsErrorWhenNotObject() {
			const result = getVirtualNodeTag("not an object" as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "INVALID_VIRTUAL_NODE")
			}
		},
	)

	await t.step(
		"returns error when node has no _tag",
		function returnsErrorWhenNoTag() {
			const obj = { tagName: "DIV" }

			const result = getVirtualNodeTag(obj as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "MISSING_TAG")
			}
		},
	)

	await t.step(
		"returns error when _tag is not a string",
		function returnsErrorWhenTagNotString() {
			const obj = { _tag: 123 }

			const result = getVirtualNodeTag(obj as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "INVALID_TAG_TYPE")
			}
		},
	)

	await t.step(
		"returns error when _tag is invalid value",
		function returnsErrorWhenInvalidTag() {
			const obj = { _tag: "invalid-tag" }

			const result = getVirtualNodeTag(obj as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "INVALID_TAG_VALUE")
			}
		},
	)

	await t.step(
		"returns error when _tag is empty string",
		function returnsErrorWhenEmptyTag() {
			const obj = { _tag: "" }

			const result = getVirtualNodeTag(obj as never)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "INVALID_TAG_VALUE")
			}
		},
	)

	await t.step(
		"defends against type assertion bypass",
		function defendsAgainstTypeAssertion() {
			const malicious = {} as VirtualNode

			const result = getVirtualNodeTag(malicious)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "MISSING_TAG")
			}
		},
	)

	await t.step(
		"defends against invalid tag via type assertion",
		function defendsAgainstInvalidTagAssertion() {
			const malicious = { _tag: "fake-tag" } as unknown as VirtualNode

			const result = getVirtualNodeTag(malicious)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "INVALID_TAG_VALUE")
			}
		},
	)
})

Deno.test("getVirtualNodeTag - property: always returns Result", function alwaysReturnsResult() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.record({
					_tag: fc.constantFrom("element", "text", "comment", "error"),
					tagName: fc.string(),
				}),
				fc.record({
					_tag: fc.string(),
				}),
				fc.anything(),
			),
			function propertyReturnsResult(input) {
				const result = getVirtualNodeTag(input as never)

				assertEquals(
					isOk(result) || isError(result),
					true,
				)
			},
		),
	)
})

Deno.test("getVirtualNodeTag - property: valid nodes return Ok", function validNodesReturnOk() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.record({
					_tag: fc.constant("element"),
					tagName: fc.string(),
					attributes: fc.dictionary(fc.string(), fc.string()),
					children: fc.constant([]),
				}),
				fc.record({
					_tag: fc.constant("text"),
					content: fc.string(),
				}),
				fc.record({
					_tag: fc.constant("comment"),
					content: fc.string(),
				}),
				fc.record({
					_tag: fc.constant("error"),
					code: fc.string(),
					message: fc.string(),
				}),
			),
			function propertyValidNodesOk(node) {
				const result = getVirtualNodeTag(node as VirtualNode)

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, node._tag)
				}
			},
		),
	)
})
