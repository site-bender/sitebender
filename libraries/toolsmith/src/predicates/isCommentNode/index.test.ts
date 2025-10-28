import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isCommentNode from "./index.ts"
import type { VirtualNode } from "../../types/virtualNode/index.ts"

Deno.test("isCommentNode", async function isCommentNodeTests(t) {
	await t.step(
		"returns true for comment node",
		function returnsTrueForComment() {
			const comment: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			assertEquals(isCommentNode(comment), true)
		},
	)

	await t.step(
		"returns false for element node",
		function returnsFalseForElement() {
			const element: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			assertEquals(isCommentNode(element), false)
		},
	)

	await t.step(
		"returns false for text node",
		function returnsFalseForText() {
			const text: VirtualNode = {
				_tag: "text",
				content: "Hello",
			}

			assertEquals(isCommentNode(text), false)
		},
	)

	await t.step(
		"returns false for error node",
		function returnsFalseForError() {
			const errorNode: VirtualNode = {
				_tag: "error",
				code: "INVALID_CHILD",
				message: "Invalid child type",
			}

			assertEquals(isCommentNode(errorNode), false)
		},
	)

	await t.step(
		"returns false for non-VirtualNode",
		function returnsFalseForNonVirtualNode() {
			assertEquals(isCommentNode({}), false)
			assertEquals(isCommentNode(null), false)
			assertEquals(isCommentNode("string"), false)
			assertEquals(isCommentNode(123), false)
		},
	)
})

Deno.test("isCommentNode - property: comment nodes return true", function commentNodesReturnTrue() {
	fc.assert(
		fc.property(
			fc.record({
				_tag: fc.constant("comment"),
				content: fc.string(),
			}),
			function propertyCommentNodes(node) {
				assertEquals(isCommentNode(node), true)
			},
		),
	)
})

Deno.test("isCommentNode - property: non-comment nodes return false", function nonCommentNodesReturnFalse() {
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
					_tag: fc.constant("error"),
					code: fc.string(),
					message: fc.string(),
				}),
			),
			function propertyNonCommentNodes(node) {
				assertEquals(isCommentNode(node), false)
			},
		),
	)
})
