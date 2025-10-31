import { assertEquals } from "@std/assert"
import _isBodyElement from "./index.ts"

Deno.test("_isBodyElement predicate", async function testIsBodyElement(t) {
	await t.step(
		"returns true for BODY element",
		function returnsTrueForBody() {
			const bodyElement = {
				_tag: "element" as const,
				tagName: "BODY",
				attributes: {},
				children: [],
			}

			assertEquals(_isBodyElement(bodyElement), true)
		},
	)

	await t.step(
		"returns false for HEAD element",
		function returnsFalseForHead() {
			const headElement = {
				_tag: "element" as const,
				tagName: "HEAD",
				attributes: {},
				children: [],
			}

			assertEquals(_isBodyElement(headElement), false)
		},
	)

	await t.step("returns false for null", function returnsFalseForNull() {
		assertEquals(_isBodyElement(null), false)
	})

	await t.step(
		"returns false for non-object",
		function returnsFalseForNonObject() {
			assertEquals(_isBodyElement("not an object"), false)
		},
	)
})
