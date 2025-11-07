import { assertEquals } from "@std/assert"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import _resolveHeadingLevels from "./index.ts"

Deno.test("_resolveHeadingLevels", async function resolveHeadingLevelsTests(t) {
	await t.step(
		"resolves HEADING at root level to H1",
		function resolvesRootToH1() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "HEADING",
				attributes: {},
				children: [],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "H1")
			}
		},
	)

	await t.step(
		"resolves HEADING inside ARTICLE to H2",
		function resolvesArticleToH2() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "ARTICLE",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "HEADING",
						attributes: {},
						children: [],
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				const child = result.children[0]
				assertEquals(child._tag, "element")
				if (child._tag === "element") {
					assertEquals(child.tagName, "H2")
				}
			}
		},
	)

	await t.step(
		"resolves HEADING inside nested SECTION to H3",
		function resolvesNestedSectionToH3() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "ARTICLE",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "SECTION",
						attributes: {},
						children: [
							{
								_tag: "element",
								tagName: "HEADING",
								attributes: {},
								children: [],
							},
						],
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				const section = result.children[0]
				assertEquals(section._tag, "element")
				if (section._tag === "element") {
					const heading = section.children[0]
					assertEquals(heading._tag, "element")
					if (heading._tag === "element") {
						assertEquals(heading.tagName, "H3")
					}
				}
			}
		},
	)

	await t.step(
		"caps heading level at H6 for deep nesting",
		function capsAtH6() {
			/*++
			 + Create deeply nested structure: Article > Section × 7 > HEADING
			 + Should resolve to H6 (capped) even though depth would be 8
			 */
			function createNestedSections(depth: number): VirtualNode {
				if (depth === 0) {
					return {
						_tag: "element",
						tagName: "HEADING",
						attributes: {},
						children: [],
					}
				}

				return {
					_tag: "element",
					tagName: "SECTION",
					attributes: {},
					children: [createNestedSections(depth - 1)],
				}
			}

			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "ARTICLE",
				attributes: {},
				children: [createNestedSections(7)],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			/*++
			 + Navigate to deepest heading
			 */
			function findDeepestHeading(node: VirtualNode): VirtualNode | null {
				if (node._tag !== "element") return null
				if (node.tagName.startsWith("H")) return node
				if (node.children.length > 0) {
					const child = node.children[0]
					return findDeepestHeading(child)
				}
				return null
			}

			const deepestHeading = findDeepestHeading(result)
			assertEquals(deepestHeading?._tag, "element")
			if (deepestHeading?._tag === "element") {
				assertEquals(deepestHeading.tagName, "H6")
			}
		},
	)

	await t.step(
		"adds warning attribute for excessive nesting",
		function addsWarningForExcessiveNesting() {
			/*++
			 + Create nesting beyond practical limit (H4+)
			 + Article > Section > Section > Section > HEADING = H5
			 */
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "ARTICLE",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "SECTION",
						attributes: {},
						children: [
							{
								_tag: "element",
								tagName: "SECTION",
								attributes: {},
								children: [
									{
										_tag: "element",
										tagName: "SECTION",
										attributes: {},
										children: [
											{
												_tag: "element",
												tagName: "HEADING",
												attributes: { id: "test" },
												children: [],
											},
										],
									},
								],
							},
						],
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			/*++
			 + Navigate to heading
			 */
			function findHeading(node: VirtualNode): VirtualNode | null {
				if (node._tag !== "element") return null
				if (node.tagName.startsWith("H") && node.tagName !== "HEADING") {
					return node
				}
				if (node.children.length > 0) {
					return node.children.reduce(
						function reduceToFindHeading(
							acc: VirtualNode | null,
							child: VirtualNode,
						): VirtualNode | null {
							return acc || findHeading(child)
						},
						null as VirtualNode | null,
					)
				}
				return null
			}

			const heading = findHeading(result)
			assertEquals(heading?._tag, "element")
			if (heading?._tag === "element") {
				assertEquals(heading.tagName, "H5")
				assertEquals(
					"data-§-warning-excessive-nesting" in heading.attributes,
					true,
				)
			}
		},
	)

	await t.step(
		"preserves existing attributes on HEADING elements",
		function preservesAttributes() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "HEADING",
				attributes: {
					id: "my-heading",
					class: "heading-class",
				},
				children: [],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.attributes.id, "my-heading")
				assertEquals(result.attributes.class, "heading-class")
			}
		},
	)

	await t.step(
		"preserves text children in HEADING elements",
		function preservesChildren() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "HEADING",
				attributes: {},
				children: [
					{
						_tag: "text",
						content: "My Heading Text",
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 1)
				const child = result.children[0]
				assertEquals(child._tag, "text")
				if (child._tag === "text") {
					assertEquals(child.content, "My Heading Text")
				}
			}
		},
	)

	await t.step(
		"handles HEADING in DIV (non-sectioning) as H1",
		function handlesNonSectioningAsH1() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "HEADING",
						attributes: {},
						children: [],
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				const child = result.children[0]
				assertEquals(child._tag, "element")
				if (child._tag === "element") {
					assertEquals(child.tagName, "H1")
				}
			}
		},
	)

	await t.step(
		"resolves multiple HEADING elements at different depths correctly",
		function resolvesMultipleHeadings() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "ARTICLE",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "HEADING",
						attributes: { id: "h1" },
						children: [],
					},
					{
						_tag: "element",
						tagName: "SECTION",
						attributes: {},
						children: [
							{
								_tag: "element",
								tagName: "HEADING",
								attributes: { id: "h2" },
								children: [],
							},
							{
								_tag: "element",
								tagName: "SECTION",
								attributes: {},
								children: [
									{
										_tag: "element",
										tagName: "HEADING",
										attributes: { id: "h3" },
										children: [],
									},
								],
							},
						],
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			function findHeadingById(
				node: VirtualNode,
				id: string,
			): VirtualNode | null {
				if (node._tag !== "element") return null
				if (
					node.tagName.startsWith("H") &&
					node.attributes.id === id
				) {
					return node
				}
				if (node.children.length > 0) {
					return node.children.reduce(
						function reduceToFindHeadingById(
							acc: VirtualNode | null,
							child: VirtualNode,
						): VirtualNode | null {
							return acc || findHeadingById(child, id)
						},
						null as VirtualNode | null,
					)
				}
				return null
			}

			const h1 = findHeadingById(result, "h1")
			const h2 = findHeadingById(result, "h2")
			const h3 = findHeadingById(result, "h3")

			if (h1?._tag === "element") assertEquals(h1.tagName, "H2")
			if (h2?._tag === "element") assertEquals(h2.tagName, "H3")
			if (h3?._tag === "element") assertEquals(h3.tagName, "H4")
		},
	)

	await t.step(
		"handles ASIDE as sectioning element",
		function handlesAside() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "ASIDE",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "HEADING",
						attributes: {},
						children: [],
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			if (result._tag === "element") {
				const child = result.children[0]
				if (child._tag === "element") {
					assertEquals(child.tagName, "H2")
				}
			}
		},
	)

	await t.step(
		"handles NAV as sectioning element",
		function handlesNav() {
			const vnode: VirtualNode = {
				_tag: "element",
				tagName: "NAV",
				attributes: {},
				children: [
					{
						_tag: "element",
						tagName: "HEADING",
						attributes: {},
						children: [],
					},
				],
			}

			const result = _resolveHeadingLevels(vnode)(0)

			if (result._tag === "element") {
				const child = result.children[0]
				if (child._tag === "element") {
					assertEquals(child.tagName, "H2")
				}
			}
		},
	)

	await t.step(
		"passes through non-element VirtualNodes unchanged",
		function passesThroughNonElements() {
			const textNode: VirtualNode = {
				_tag: "text",
				content: "Plain text",
			}

			const commentNode: VirtualNode = {
				_tag: "comment",
				content: "A comment",
			}

			const errorNode: VirtualNode = {
				_tag: "error",
				code: "TEST_ERROR",
				message: "Test error",
			}

			assertEquals(_resolveHeadingLevels(textNode)(0), textNode)
			assertEquals(_resolveHeadingLevels(commentNode)(0), commentNode)
			assertEquals(_resolveHeadingLevels(errorNode)(0), errorNode)
		},
	)
})
