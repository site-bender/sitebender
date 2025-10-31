import { assertEquals } from "@std/assert"
import _isHeadElement from "./index.ts"

Deno.test("_isHeadElement predicate", async function testIsHeadElement(t) {
	await t.step(
		"returns true for HEAD element",
		function returnsTrueForHead() {
			const headElement = {
				_tag: "element" as const,
				tagName: "HEAD",
				attributes: {},
				children: [],
			}

			assertEquals(_isHeadElement(headElement), true)
		},
	)

	await t.step(
		"returns false for BODY element",
		function returnsFalseForBody() {
			const bodyElement = {
				_tag: "element" as const,
				tagName: "BODY",
				attributes: {},
				children: [],
			}

			assertEquals(_isHeadElement(bodyElement), false)
		},
	)

	await t.step("returns false for null", function returnsFalseForNull() {
		assertEquals(_isHeadElement(null), false)
	})

	await t.step(
		"returns false for non-object",
		function returnsFalseForNonObject() {
			assertEquals(_isHeadElement("not an object"), false)
		},
	)
})
