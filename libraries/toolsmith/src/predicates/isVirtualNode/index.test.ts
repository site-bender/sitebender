import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import isVirtualNode from "./index.ts"
import type { VirtualNode } from "../../types/index.ts"

Deno.test("isVirtualNode", async function isVirtualNodeTests(t) {
	await t.step(
		"returns true for element node",
		function returnsTrueForElement() {
			const element: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			assertEquals(isVirtualNode(element), true)
		},
	)

	await t.step(
		"returns true for text node",
		function returnsTrueForText() {
			const text: VirtualNode = {
				_tag: "text",
				content: "Hello",
			}

			assertEquals(isVirtualNode(text), true)
		},
	)

	await t.step(
		"returns true for comment node",
		function returnsTrueForComment() {
			const comment: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			assertEquals(isVirtualNode(comment), true)
		},
	)

	await t.step(
		"returns true for error node",
		function returnsTrueForError() {
			const errorNode: VirtualNode = {
				_tag: "error",
				code: "INVALID_CHILD",
				message: "Invalid child type",
			}

			assertEquals(isVirtualNode(errorNode), true)
		},
	)

	await t.step(
		"returns false for object without _tag",
		function returnsFalseWhenNoTag() {
			const obj = { tagName: "DIV" }

			assertEquals(isVirtualNode(obj), false)
		},
	)

	await t.step(
		"returns false for object with invalid _tag",
		function returnsFalseWhenInvalidTag() {
			const obj = { _tag: "invalid-tag" }

			assertEquals(isVirtualNode(obj), false)
		},
	)

	await t.step(
		"returns false for null",
		function returnsFalseForNull() {
			assertEquals(isVirtualNode(null), false)
		},
	)

	await t.step(
		"returns false for undefined",
		function returnsFalseForUndefined() {
			assertEquals(isVirtualNode(undefined), false)
		},
	)

	await t.step(
		"returns false for strings",
		function returnsFalseForStrings() {
			assertEquals(isVirtualNode("hello"), false)
		},
	)

	await t.step(
		"returns false for numbers",
		function returnsFalseForNumbers() {
			assertEquals(isVirtualNode(42), false)
		},
	)

	await t.step(
		"returns false for arrays",
		function returnsFalseForArrays() {
			assertEquals(isVirtualNode([]), false)
		},
	)

	await t.step(
		"returns false for functions",
		function returnsFalseForFunctions() {
			function test() {}
			assertEquals(isVirtualNode(test), false)
		},
	)

	await t.step(
		"returns false for empty object literal",
		function returnsFalseForEmptyObject() {
			assertEquals(isVirtualNode({}), false)
		},
	)

	await t.step(
		"defends against type assertion bypass",
		function defendsAgainstTypeAssertion() {
			const malicious = {} as unknown as VirtualNode

			assertEquals(isVirtualNode(malicious), false)
		},
	)

	await t.step(
		"defends against invalid tag via type assertion",
		function defendsAgainstInvalidTagAssertion() {
			const malicious = { _tag: "fake-tag" } as unknown as VirtualNode

			assertEquals(isVirtualNode(malicious), false)
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

			assertEquals(isVirtualNode(element), true)
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

			assertEquals(isVirtualNode(errorNode), true)
		},
	)
})

Deno.test("isVirtualNode - property: valid nodes return true", function validNodesReturnTrue() {
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
			function propertyValidNodes(node) {
				assertEquals(isVirtualNode(node), true)
			},
		),
	)
})

Deno.test("isVirtualNode - property: invalid nodes return false", function invalidNodesReturnFalse() {
	fc.assert(
		fc.property(
			fc.oneof(
				fc.string(),
				fc.integer(),
				fc.boolean(),
				fc.constant(null),
				fc.constant(undefined),
				fc.array(fc.anything()),
				fc.record({
					_tag: fc.string().filter((s) =>
						!["element", "text", "comment", "error"].includes(s)
					),
				}),
			),
			function propertyInvalidNodes(value) {
				assertEquals(isVirtualNode(value), false)
			},
		),
	)
})
