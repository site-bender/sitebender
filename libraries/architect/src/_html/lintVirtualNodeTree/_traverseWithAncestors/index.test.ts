import { assertEquals } from "@std/assert"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type { AncestorContext, ValidationError } from "../types/index.ts"
import _traverseWithAncestors from "./index.ts"

Deno.test("_traverseWithAncestors", async function traverseWithAncestorsTests(
	t,
) {
	await t.step(
		"calls validator for single node",
		function callsValidatorForSingleNode() {
			const node: VirtualNode = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			function validator(
				_node: VirtualNode,
				_ancestors: AncestorContext,
			): ReadonlyArray<ValidationError> {
				return [{
					node,
					errorType: "invalid-role-structure",
					message: "Test error",
				}]
			}

			const errors = _traverseWithAncestors(validator)([])(node)

			assertEquals(errors.length, 1)
			assertEquals(errors[0]?.message, "Test error")
		},
	)

	await t.step(
		"traverses children with updated ancestor context",
		function traversesChildrenWithUpdatedContext() {
			const child: VirtualNode = {
				_tag: "element" as const,
				tagName: "SPAN",
				attributes: {},
				children: [],
			}

			const parent: VirtualNode = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [child],
			}

			const ancestorTags: Array<string> = []

			function validator(
				node: VirtualNode,
				ancestors: AncestorContext,
			): ReadonlyArray<ValidationError> {
				if (node._tag === "element") {
					/*++
					 + Record ancestor tags for verification
					 */
					const tags = ancestors
						.filter(function filterElements(a) {
							return a._tag === "element"
						})
						.map(function extractTagName(a) {
							if (a._tag === "element") {
								return a.tagName
							}
							return ""
						})

					ancestorTags.push(...tags)
				}

				return []
			}

			_traverseWithAncestors(validator)([])(parent)

			/*++
			 + Parent has no ancestors (empty)
			 + Child has parent as ancestor (DIV)
			 */
			assertEquals(ancestorTags.length, 1)
			assertEquals(ancestorTags[0], "DIV")
		},
	)

	await t.step(
		"accumulates errors from all nodes",
		function accumulatesErrorsFromAllNodes() {
			const grandchild: VirtualNode = {
				_tag: "element" as const,
				tagName: "SPAN",
				attributes: {},
				children: [],
			}

			const child: VirtualNode = {
				_tag: "element" as const,
				tagName: "P",
				attributes: {},
				children: [grandchild],
			}

			const root: VirtualNode = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [child],
			}

			function validator(
				node: VirtualNode,
				_ancestors: AncestorContext,
			): ReadonlyArray<ValidationError> {
				/*++
				 + Generate one error per node
				 */
				return [{
					node,
					errorType: "invalid-role-structure",
					message: `Error from ${
						node._tag === "element" ? node.tagName : "text"
					}`,
				}]
			}

			const errors = _traverseWithAncestors(validator)([])(root)

			/*++
			 + Should have 3 errors (root + child + grandchild)
			 */
			assertEquals(errors.length, 3)
			assertEquals(errors[0]?.message, "Error from DIV")
			assertEquals(errors[1]?.message, "Error from P")
			assertEquals(errors[2]?.message, "Error from SPAN")
		},
	)

	await t.step(
		"handles text nodes correctly",
		function handlesTextNodesCorrectly() {
			const textNode: VirtualNode = {
				_tag: "text" as const,
				content: "Hello",
			}

			const parent: VirtualNode = {
				_tag: "element" as const,
				tagName: "P",
				attributes: {},
				children: [textNode],
			}

			function validator(
				node: VirtualNode,
				_ancestors: AncestorContext,
			): ReadonlyArray<ValidationError> {
				return [{
					node,
					errorType: "invalid-role-structure",
					message: node._tag === "text" ? "text" : "element",
				}]
			}

			const errors = _traverseWithAncestors(validator)([])(parent)

			/*++
			 + Should have 2 errors (parent element + text node)
			 */
			assertEquals(errors.length, 2)
			assertEquals(errors[0]?.message, "element")
			assertEquals(errors[1]?.message, "text")
		},
	)

	await t.step(
		"maintains ancestor order (immediate parent first)",
		function maintainsAncestorOrder() {
			const grandchild: VirtualNode = {
				_tag: "element" as const,
				tagName: "SPAN",
				attributes: {},
				children: [],
			}

			const child: VirtualNode = {
				_tag: "element" as const,
				tagName: "P",
				attributes: {},
				children: [grandchild],
			}

			const root: VirtualNode = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [child],
			}

			let grandchildAncestors: ReadonlyArray<string> = []

			function validator(
				node: VirtualNode,
				ancestors: AncestorContext,
			): ReadonlyArray<ValidationError> {
				if (node._tag === "element" && node.tagName === "SPAN") {
					/*++
					 + Record ancestor tag names for grandchild
					 */
					grandchildAncestors = ancestors
						.filter(function filterElements(a) {
							return a._tag === "element"
						})
						.map(function extractTagName(a) {
							if (a._tag === "element") {
								return a.tagName
							}
							return ""
						})
				}

				return []
			}

			_traverseWithAncestors(validator)([])(root)

			/*++
			 + Grandchild should have [P, DIV] as ancestors
			 + P is immediate parent (first), DIV is grandparent (second)
			 */
			assertEquals(grandchildAncestors.length, 2)
			assertEquals(grandchildAncestors[0], "P")
			assertEquals(grandchildAncestors[1], "DIV")
		},
	)
})
