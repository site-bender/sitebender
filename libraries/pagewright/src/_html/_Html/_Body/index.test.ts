import { assertEquals } from "jsr:@std/assert"
import _Body from "./index.ts"

Deno.test("_Body component", async function testBody(t) {
	await t.step(
		"creates BODY element with empty children",
		function createsEmptyBody() {
			const result = _Body({})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "BODY")
				assertEquals(result.children.length, 0)
			}
		},
	)

	await t.step(
		"creates BODY element with children",
		function createsBodyWithChildren() {
			const divElement = {
				_tag: "element" as const,
				tagName: "DIV",
				attributes: {},
				children: [],
			}

			const result = _Body({ children: [divElement] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "BODY")
				assertEquals(result.children.length, 1)
			}
		},
	)
})
