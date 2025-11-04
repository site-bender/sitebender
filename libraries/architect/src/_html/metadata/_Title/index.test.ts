import { assertEquals } from "@std/assert"
import _Title from "./index.ts"

Deno.test("_Title - creates TITLE element with text child", function testTitleWithText() {
	const result = _Title({ children: ["Page Title"] })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "TITLE")
	assertEquals(result.children, ["Page Title"])
})

Deno.test("_Title - creates TITLE element with empty children", function testTitleEmpty() {
	const result = _Title({})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "TITLE")
	assertEquals(result.children, [])
})

Deno.test("_Title - validates role attribute (should be none)", function testTitleRole() {
	const result = _Title({ role: "banner" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "TITLE")
	assertEquals(result.attributes["data-§-bad-role"], "banner")
})

Deno.test("_Title - includes id attribute", function testTitleWithId() {
	const result = _Title({ id: "page-title" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "TITLE")
	assertEquals(result.attributes.id, "page-title")
})

Deno.test("_Title - validates global attributes", function testTitleGlobalAttrs() {
	const result = _Title({
		lang: "en",
		dir: "ltr",
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "TITLE")
	assertEquals(result.attributes.lang, "en")
	assertEquals(result.attributes.dir, "ltr")
})
