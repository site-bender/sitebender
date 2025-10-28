import { assertEquals } from "@std/assert"

import _Html from "./index.ts"
import _Head from "./_Head/index.ts"
import _Body from "./_Body/index.ts"
import _Title from "../metadata/_Title/index.ts"
import type { VirtualNode } from "../../types/index.ts"

Deno.test("_Html component", async function htmlTests(t) {
	await t.step(
		"creates HTML element with valid head and body",
		function createsValidStructure() {
			const titleText: VirtualNode = { _tag: "text", content: "Test Page" }
			const title = _Title({ children: [titleText] })
			const head = _Head({ children: [title] })
			const body = _Body({})

			const result = _Html({ children: [head, body] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "HTML")
				assertEquals(result.children.length, 2)
				if (result.children[0]._tag === "element") {
					assertEquals(result.children[0].tagName, "HEAD")
				}
				if (result.children[1]._tag === "element") {
					assertEquals(result.children[1].tagName, "BODY")
				}
			}
		},
	)

	await t.step(
		"creates empty head if missing",
		function createsEmptyHead() {
			const body = _Body({})

			const result = _Html({ children: [body] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 2)
				assertEquals(result.children[0]._tag, "element")
				if (result.children[0]._tag === "element") {
					assertEquals(result.children[0].tagName, "HEAD")
					assertEquals(result.children[0].children.length, 0)
				}
				if (result.children[1]._tag === "element") {
					assertEquals(result.children[1].tagName, "BODY")
				}
			}
		},
	)

	await t.step(
		"creates empty body if missing",
		function createsEmptyBody() {
			const titleText: VirtualNode = { _tag: "text", content: "Test" }
			const title = _Title({ children: [titleText] })
			const head = _Head({ children: [title] })

			const result = _Html({ children: [head] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 2)
				if (result.children[0]._tag === "element") {
					assertEquals(result.children[0].tagName, "HEAD")
				}
				assertEquals(result.children[1]._tag, "element")
				if (result.children[1]._tag === "element") {
					assertEquals(result.children[1].tagName, "BODY")
					assertEquals(result.children[1].children.length, 0)
				}
			}
		},
	)

	await t.step(
		"creates both head and body if both missing",
		function createsBothEmpty() {
			const result = _Html({ children: [] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 2)
				assertEquals(result.children[0]._tag, "element")
				assertEquals(result.children[1]._tag, "element")
				if (
					result.children[0]._tag === "element" &&
					result.children[1]._tag === "element"
				) {
					assertEquals(result.children[0].tagName, "HEAD")
					assertEquals(result.children[0].children.length, 0)
					assertEquals(result.children[1].tagName, "BODY")
					assertEquals(result.children[1].children.length, 0)
				}
			}
		},
	)

	await t.step(
		"reorders body before head to head, body",
		function reordersChildren() {
			const titleText: VirtualNode = { _tag: "text", content: "Test" }
			const title = _Title({ children: [titleText] })
			const head = _Head({ children: [title] })
			const body = _Body({})

			const result = _Html({ children: [body, head] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 2)
				if (result.children[0]._tag === "element") {
					assertEquals(result.children[0].tagName, "HEAD")
				}
				if (result.children[1]._tag === "element") {
					assertEquals(result.children[1].tagName, "BODY")
				}
			}
		},
	)

	await t.step(
		"moves head elements to head",
		function movesHeadElements() {
			const titleText: VirtualNode = { _tag: "text", content: "Test" }
			const title = _Title({ children: [titleText] })
			const link: VirtualNode = {
				_tag: "element",
				tagName: "LINK",
				attributes: { rel: "stylesheet", href: "style.css" },
				children: [],
			}
			const body = _Body({})

			/*++
			 + Title and link are outside head wrapper
			 */
			const result = _Html({ children: [title, link, body] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 2)
				/*++
				 + Head should be created with title and link
				 */
				if (result.children[0]._tag === "element") {
					assertEquals(result.children[0].tagName, "HEAD")
					assertEquals(result.children[0].children.length, 2)
					if (result.children[0].children[0]._tag === "element") {
						assertEquals(result.children[0].children[0].tagName, "TITLE")
					}
					if (result.children[0].children[1]._tag === "element") {
						assertEquals(result.children[0].children[1].tagName, "LINK")
					}
				}
				if (result.children[1]._tag === "element") {
					assertEquals(result.children[1].tagName, "BODY")
				}
			}
		},
	)

	await t.step(
		"moves non-head elements to body > main",
		function movesNonHeadElements() {
			const head = _Head({})
			const div: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [{ _tag: "text", content: "Hello" }],
			}

			const result = _Html({ children: [head, div] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 2)
				if (result.children[0]._tag === "element") {
					assertEquals(result.children[0].tagName, "HEAD")
				}
				/*++
				 + Body should be created with main containing div
				 */
				if (result.children[1]._tag === "element") {
					assertEquals(result.children[1].tagName, "BODY")
					assertEquals(result.children[1].children.length, 1)
					if (result.children[1].children[0]._tag === "element") {
						assertEquals(result.children[1].children[0].tagName, "MAIN")
						assertEquals(result.children[1].children[0].children.length, 1)
						assertEquals(result.children[1].children[0].children[0], div)
					}
				}
			}
		},
	)

	await t.step("preserves valid lang attribute", function preservesLang() {
		const head = _Head({})
		const body = _Body({})

		const result = _Html({ lang: "en-US", children: [head, body] })

		assertEquals(result._tag, "element")
		if (result._tag === "element") {
			assertEquals(result.attributes.lang, "en-US")
		}
	})

	await t.step("preserves valid dir attribute", function preservesDir() {
		const head = _Head({})
		const body = _Body({})

		const result = _Html({ dir: "rtl", children: [head, body] })

		assertEquals(result._tag, "element")
		if (result._tag === "element") {
			assertEquals(result.attributes.dir, "rtl")
		}
	})

	await t.step(
		"converts invalid dir value to data-§-error",
		function convertsInvalidDir() {
			const head = _Head({})
			const body = _Body({})

			/*++
			 + [EXCEPTION] Using 'as any' to bypass type checking for invalid value test
			 */
			const result = _Html({
				// deno-lint-ignore no-explicit-any
				dir: "invalid" as any,
				children: [head, body],
			})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.attributes["data-§-error"], "Invalid dir value")
				assertEquals(result.attributes["data-§-original-value"], "invalid")
				assertEquals(result.attributes.dir, undefined)
			}
		},
	)

	await t.step(
		"preserves data-* attributes",
		function preservesDataAttributes() {
			const head = _Head({})
			const body = _Body({})

			const result = _Html({
				"data-test": "value",
				"data-foo": "bar",
				children: [head, body],
			})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.attributes["data-test"], "value")
				assertEquals(result.attributes["data-foo"], "bar")
			}
		},
	)

	await t.step(
		"converts invalid attribute names to data-*",
		function convertsInvalidAttributes() {
			const head = _Head({})
			const body = _Body({})

			const result = _Html({
				onClick: "handler",
				customAttr: "value",
				children: [head, body],
			})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				/*++
				 + Invalid attributes become data-* attributes (not data-§-*)
				 */
				assertEquals(result.attributes["data-on-click"], "handler")
				assertEquals(result.attributes["data-custom-attr"], "value")
				assertEquals(result.attributes.onClick, undefined)
				assertEquals(result.attributes.customAttr, undefined)
			}
		},
	)

	await t.step(
		"preserves aria-* attributes",
		function preservesAriaAttributes() {
			const head = _Head({})
			const body = _Body({})

			const result = _Html({
				"aria-label": "Main",
				"aria-hidden": "false",
				children: [head, body],
			})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.attributes["aria-label"], "Main")
				assertEquals(result.attributes["aria-hidden"], "false")
			}
		},
	)

	await t.step(
		"handles mixed valid and invalid children",
		function handlesMixedChildren() {
			const titleText: VirtualNode = { _tag: "text", content: "Test" }
			const title = _Title({ children: [titleText] })
			const div: VirtualNode = {
				_tag: "element",
				tagName: "DIV",
				attributes: {},
				children: [],
			}
			const link: VirtualNode = {
				_tag: "element",
				tagName: "LINK",
				attributes: { rel: "stylesheet", href: "style.css" },
				children: [],
			}
			const span: VirtualNode = {
				_tag: "element",
				tagName: "SPAN",
				attributes: {},
				children: [{ _tag: "text", content: "Content" }],
			}

			const result = _Html({ children: [title, div, link, span] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.children.length, 2)
				/*++
				 + Head should contain title and link
				 */
				if (result.children[0]._tag === "element") {
					assertEquals(result.children[0].tagName, "HEAD")
					assertEquals(result.children[0].children.length, 2)
					if (result.children[0].children[0]._tag === "element") {
						assertEquals(result.children[0].children[0].tagName, "TITLE")
					}
					if (result.children[0].children[1]._tag === "element") {
						assertEquals(result.children[0].children[1].tagName, "LINK")
					}
				}
				/*++
				 + Body should contain main with div and span
				 */
				if (result.children[1]._tag === "element") {
					assertEquals(result.children[1].tagName, "BODY")
					assertEquals(result.children[1].children.length, 1)
					if (result.children[1].children[0]._tag === "element") {
						assertEquals(result.children[1].children[0].tagName, "MAIN")
						assertEquals(result.children[1].children[0].children.length, 2)
						assertEquals(result.children[1].children[0].children[0], div)
						assertEquals(result.children[1].children[0].children[1], span)
					}
				}
			}
		},
	)
})
