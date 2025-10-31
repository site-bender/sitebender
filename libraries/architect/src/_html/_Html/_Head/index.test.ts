import { assertEquals } from "@std/assert"
import _Head from "./index.ts"

Deno.test("_Head component", async function testHead(t) {
	await t.step(
		"creates HEAD element with empty children",
		function createsEmptyHead() {
			const result = _Head({})

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "HEAD")
				assertEquals(result.children.length, 0)
			}
		},
	)

	await t.step(
		"creates HEAD element with children",
		function createsHeadWithChildren() {
			const titleElement = {
				_tag: "element" as const,
				tagName: "TITLE",
				attributes: {},
				children: [],
			}

			const result = _Head({ children: [titleElement] })

			assertEquals(result._tag, "element")
			if (result._tag === "element") {
				assertEquals(result.tagName, "HEAD")
				assertEquals(result.children.length, 1)
			}
		},
	)
})
