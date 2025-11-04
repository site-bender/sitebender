import { assertEquals } from "@std/assert"
import _Area from "./index.ts"

Deno.test("_Area - creates AREA element with href and button role", function testAreaWithHrefButton() {
	const result = _Area({ href: "/page", role: "button" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "AREA")
	assertEquals(result.attributes.role, "button")
	assertEquals(result.attributes.href, "/page")
})

Deno.test("_Area - creates AREA element with href and link role", function testAreaWithHrefLink() {
	const result = _Area({ href: "/page", role: "link" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "AREA")
	assertEquals(result.attributes.role, "link")
})

Deno.test("_Area - rejects button role without href", function testAreaWithoutHrefButton() {
	const result = _Area({ role: "button" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "AREA")
	assertEquals(result.attributes["data-§-bad-role"], "button")
})

Deno.test("_Area - allows generic role without href", function testAreaWithoutHrefGeneric() {
	const result = _Area({ role: "generic" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "AREA")
	assertEquals(result.attributes.role, "generic")
})

Deno.test("_Area - creates AREA element with alt attribute", function testAreaWithAlt() {
	const result = _Area({ alt: "Link description", href: "/page" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "AREA")
	assertEquals(result.attributes.alt, "Link description")
})

Deno.test("_Area - creates AREA element with coords and shape", function testAreaWithCoordsShape() {
	const result = _Area({ coords: "0,0,100,100", shape: "rect", href: "/page" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "AREA")
	assertEquals(result.attributes.coords, "0,0,100,100")
	assertEquals(result.attributes.shape, "rect")
})

Deno.test("_Area - validates global attributes", function testAreaGlobalAttrs() {
	const result = _Area({
		href: "/page",
		id: "test-area",
		class: "link-area",
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "AREA")
	assertEquals(result.attributes.id, "test-area")
	assertEquals(result.attributes.class, "link-area")
})

Deno.test("_Area - creates empty children array by default", function testAreaEmptyChildren() {
	const result = _Area({ href: "/page" })

	assertEquals(result.children, [])
})
