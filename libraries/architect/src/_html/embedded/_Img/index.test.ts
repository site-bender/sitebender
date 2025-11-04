import { assertEquals } from "@std/assert"
import _Img from "./index.ts"

Deno.test("_Img - with non-empty alt allows button role", function testImgWithAltButton() {
	const result = _Img({ alt: "Image description", role: "button" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes.role, "button")
	assertEquals(result.attributes.alt, "Image description")
})

Deno.test("_Img - with non-empty alt allows link role", function testImgWithAltLink() {
	const result = _Img({ alt: "Image description", role: "link" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes.role, "link")
})

Deno.test("_Img - with empty alt allows none role", function testImgEmptyAltNone() {
	const result = _Img({ alt: "", role: "none" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes.role, "none")
	assertEquals(result.attributes.alt, "")
})

Deno.test("_Img - with empty alt allows presentation role", function testImgEmptyAltPresentation() {
	const result = _Img({ alt: "", role: "presentation" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes.role, "presentation")
})

Deno.test("_Img - with empty alt rejects button role", function testImgEmptyAltRejectsButton() {
	const result = _Img({ alt: "", role: "button" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes["data-§-bad-role"], "button")
})

Deno.test("_Img - without alt rejects button role", function testImgNoAltRejectsButton() {
	const result = _Img({ role: "button" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes["data-§-bad-role"], "button")
})

Deno.test("_Img - without alt allows presentation role", function testImgNoAltPresentation() {
	const result = _Img({ role: "presentation" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes.role, "presentation")
})

Deno.test("_Img - creates IMG element with src attribute", function testImgWithSrc() {
	const result = _Img({ src: "/image.png", alt: "Image" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes.src, "/image.png")
})

Deno.test("_Img - validates global attributes", function testImgGlobalAttrs() {
	const result = _Img({
		alt: "Image",
		id: "test-img",
		class: "photo",
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "IMG")
	assertEquals(result.attributes.id, "test-img")
	assertEquals(result.attributes.class, "photo")
})

Deno.test("_Img - creates empty children array by default", function testImgEmptyChildren() {
	const result = _Img({ alt: "Image" })

	assertEquals(result.children, [])
})
