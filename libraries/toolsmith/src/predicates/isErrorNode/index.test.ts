import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isErrorNode from "./index.ts"
import type { VirtualNode } from "../../types/virtualNode/index.ts"

Deno.test("isErrorNode", async function isErrorNodeTests(t) {
	await t.step(
		"returns true for error node",
		function returnsTrueForError() {
			const errorNode: VirtualNode = {
				_tag: "error",
				code: "INVALID_CHILD",
				message: "Invalid child type",
			}

			assertEquals(isErrorNode(errorNode), true)
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

			assertEquals(isErrorNode(element), false)
		},
	)

	await t.step(
		"returns false for text node",
		function returnsFalseForText() {
			const text: VirtualNode = {
				_tag: "text",
				content: "Hello",
			}

			assertEquals(isErrorNode(text), false)
		},
	)

	await t.step(
		"returns false for comment node",
		function returnsFalseForComment() {
			const comment: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			assertEquals(isErrorNode(comment), false)
		},
	)

	await t.step(
		"returns false for non-VirtualNode",
		function returnsFalseForNonVirtualNode() {
			assertEquals(isErrorNode({}), false)
			assertEquals(isErrorNode(null), false)
			assertEquals(isErrorNode("string"), false)
			assertEquals(isErrorNode(123), false)
		},
	)

	await t.step(
		"returns true for error with context",
		function returnsTrueForErrorWithContext() {
			const errorNode: VirtualNode = {
				_tag: "error",
				code: "INVALID_CHILD",
				message: "Invalid child type",
				context: "Processing JSX children",
			}

			assertEquals(isErrorNode(errorNode), true)
		},
	)

	await t.step(
		"returns true for error with received",
		function returnsTrueForErrorWithReceived() {
			const errorNode: VirtualNode = {
				_tag: "error",
				code: "INVALID_CHILD",
				message: "Invalid child type",
				received: true,
			}

			assertEquals(isErrorNode(errorNode), true)
		},
	)
})

Deno.test("isErrorNode - property: error nodes return true", function errorNodesReturnTrue() {
	fc.assert(
		fc.property(
			fc.record({
				_tag: fc.constant("error"),
				code: fc.string(),
				message: fc.string(),
			}),
			function propertyErrorNodes(node) {
				assertEquals(isErrorNode(node), true)
			},
		),
	)
})

Deno.test("isErrorNode - property: non-error nodes return false", function nonErrorNodesReturnFalse() {
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
			),
			function propertyNonErrorNodes(node) {
				assertEquals(isErrorNode(node), false)
			},
		),
	)
})
