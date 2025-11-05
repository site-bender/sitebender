import { assert, assertEquals } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import _Hn from "./index.ts"

Deno.test("_Hn component", async function hnTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Hn({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"generates HN placeholder tag",
		function generatesHnPlaceholder() {
			const component = _Hn({})

			assertEquals(component._tag, "element")
			if (component._tag === "element") {
				assertEquals(component.tagName, "HN")
			}
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const component = _Hn({ children: [text] })

			assert(isVirtualNode(component))
			assertEquals(component._tag, "element")
			if (component._tag === "element") {
				assertEquals(component.children.length, 1)
				assertEquals(component.children[0], text)
			}
		},
	)

	await t.step(
		"preserves attributes",
		function preservesAttributes() {
			const component = _Hn({
				id: "my-heading",
				class: "heading-class",
			})

			assertEquals(component._tag, "element")
			if (component._tag === "element") {
				assertEquals(component.attributes.id, "my-heading")
				assertEquals(component.attributes.class, "heading-class")
			}
		},
	)

	await t.step(
		"validates global attributes",
		function validatesGlobalAttributes() {
			const component = _Hn({
				role: "heading",
				"aria-level": "2",
			})

			assert(isVirtualNode(component))
			assertEquals(component._tag, "element")
		},
	)
})
