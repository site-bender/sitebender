import { assertEquals } from "@std/assert"
import _Label from "./index.ts"

Deno.test("_Label - with htmlFor rejects any role", function testLabelWithForRejectsRole() {
	const result = _Label({ htmlFor: "input-id", role: "button" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "LABEL")
	assertEquals(result.attributes["data-§-bad-role"], "button")
	assertEquals(result.attributes.for, "input-id")
})

Deno.test("_Label - with htmlFor converts to for attribute", function testLabelHtmlForConverted() {
	const result = _Label({ htmlFor: "input-id" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "LABEL")
	assertEquals(result.attributes.for, "input-id")
})

Deno.test("_Label - without htmlFor allows button role", function testLabelWithoutForButton() {
	const result = _Label({ role: "button" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "LABEL")
	assertEquals(result.attributes.role, "button")
})

Deno.test("_Label - without htmlFor allows any role", function testLabelWithoutForAnyRole() {
	const result = _Label({ role: "presentation" })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "LABEL")
	assertEquals(result.attributes.role, "presentation")
})

Deno.test("_Label - validates global attributes", function testLabelGlobalAttrs() {
	const result = _Label({
		id: "test-label",
		class: "form-label",
	})

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "LABEL")
	assertEquals(result.attributes.id, "test-label")
	assertEquals(result.attributes.class, "form-label")
})

Deno.test("_Label - creates empty children array by default", function testLabelEmptyChildren() {
	const result = _Label({})

	assertEquals(result.children, [])
})

Deno.test("_Label - preserves text children", function testLabelWithChildren() {
	const result = _Label({ children: ["Username:"] })

	assertEquals(result._tag, "element")
	assertEquals(result.tagName, "LABEL")
	assertEquals(result.children, ["Username:"])
})
