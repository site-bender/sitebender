import { assertEquals } from "jsr:@std/assert"
import _isOrphanedChild from "./index.ts"

Deno.test("_isOrphanedChild predicate", async function testIsOrphanedChild(t) {
	await t.step(
		"returns true for DIV element",
		function returnsTrueForDiv() {
			const divElement = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			assertEquals(_isOrphanedChild(divElement), true)
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

			assertEquals(_isOrphanedChild(headElement), false)
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

			assertEquals(_isOrphanedChild(bodyElement), false)
		},
	)

	await t.step("returns false for null", function returnsFalseForNull() {
		assertEquals(_isOrphanedChild(null), false)
	})
})
