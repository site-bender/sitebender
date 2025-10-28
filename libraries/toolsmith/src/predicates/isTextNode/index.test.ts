import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isTextNode from "./index.ts"
import type { VirtualNode } from "../../types/virtualNode/index.ts"

Deno.test("isTextNode", async function isTextNodeTests(t) {
	await t.step(
		"returns true for text node",
		function returnsTrueForText() {
			const text: VirtualNode = {
				_tag: "text",
				content: "Hello world",
			}

			assertEquals(isTextNode(text), true)
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

			assertEquals(isTextNode(element), false)
		},
	)

	await t.step(
		"returns false for comment node",
		function returnsFalseForComment() {
			const comment: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			assertEquals(isTextNode(comment), false)
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

			assertEquals(isTextNode(errorNode), false)
		},
	)

	await t.step(
		"returns false for non-VirtualNode",
		function returnsFalseForNonVirtualNode() {
			assertEquals(isTextNode({}), false)
			assertEquals(isTextNode(null), false)
			assertEquals(isTextNode("string"), false)
			assertEquals(isTextNode(123), false)
		},
	)
})

Deno.test("isTextNode - property: text nodes return true", function textNodesReturnTrue() {
	fc.assert(
		fc.property(
			fc.record({
				_tag: fc.constant("text"),
				content: fc.string(),
			}),
			function propertyTextNodes(node) {
				assertEquals(isTextNode(node), true)
			},
		),
	)
})

Deno.test("isTextNode - property: non-text nodes return false", function nonTextNodesReturnFalse() {
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
					_tag: fc.constant("comment"),
					content: fc.string(),
				}),
				fc.record({
					_tag: fc.constant("error"),
					code: fc.string(),
					message: fc.string(),
				}),
			),
			function propertyNonTextNodes(node) {
				assertEquals(isTextNode(node), false)
			},
		),
	)
})
