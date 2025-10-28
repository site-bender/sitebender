import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isElementNode from "./index.ts"
import type { VirtualNode } from "../../types/virtualNode/index.ts"

Deno.test("isElementNode", async function isElementNodeTests(t) {
	await t.step(
		"returns true for element node",
		function returnsTrueForElement() {
			const element: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			assertEquals(isElementNode(element), true)
		},
	)

	await t.step(
		"returns false for text node",
		function returnsFalseForText() {
			const text: VirtualNode = {
				_tag: "text",
				content: "Hello",
			}

			assertEquals(isElementNode(text), false)
		},
	)

	await t.step(
		"returns false for comment node",
		function returnsFalseForComment() {
			const comment: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			assertEquals(isElementNode(comment), false)
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

			assertEquals(isElementNode(errorNode), false)
		},
	)

	await t.step(
		"returns false for non-VirtualNode",
		function returnsFalseForNonVirtualNode() {
			assertEquals(isElementNode({}), false)
			assertEquals(isElementNode(null), false)
			assertEquals(isElementNode("string"), false)
			assertEquals(isElementNode(123), false)
		},
	)

	await t.step(
		"returns true for element with namespace",
		function returnsTrueForElementWithNamespace() {
			const element: VirtualNode = {
				_tag: "element",
				tagName: "SVG",
				attributes: {},
				children: [],
				namespace: "http://www.w3.org/2000/svg",
			}

			assertEquals(isElementNode(element), true)
		},
	)
})

Deno.test("isElementNode - property: element nodes return true", function elementNodesReturnTrue() {
	fc.assert(
		fc.property(
			fc.record({
				_tag: fc.constant("element"),
				tagName: fc.string(),
				attributes: fc.dictionary(fc.string(), fc.string()),
				children: fc.constant([]),
			}),
			function propertyElementNodes(node) {
				assertEquals(isElementNode(node), true)
			},
		),
	)
})

Deno.test("isElementNode - property: non-element nodes return false", function nonElementNodesReturnFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
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
			function propertyNonElementNodes(node) {
				assertEquals(isElementNode(node), false)
			},
		),
	)
})
