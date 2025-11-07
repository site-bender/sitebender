import { assertEquals } from "@std/assert"
import _validateImgRole from "./index.ts"

Deno.test("_validateImgRole - with accessible name allows button role", function testImgAccessibleNameButton() {
	const result = _validateImgRole(true, false)("button")

	assertEquals(result, { role: "button" })
})

Deno.test("_validateImgRole - with accessible name allows checkbox role", function testImgAccessibleNameCheckbox() {
	const result = _validateImgRole(true, false)("checkbox")

	assertEquals(result, { role: "checkbox" })
})

Deno.test("_validateImgRole - with accessible name allows link role", function testImgAccessibleNameLink() {
	const result = _validateImgRole(true, false)("link")

	assertEquals(result, { role: "link" })
})

Deno.test("_validateImgRole - with accessible name allows none role", function testImgAccessibleNameNone() {
	const result = _validateImgRole(true, false)("none")

	assertEquals(result, { role: "none" })
})

Deno.test("_validateImgRole - with accessible name allows presentation role", function testImgAccessibleNamePresentation() {
	const result = _validateImgRole(true, false)("presentation")

	assertEquals(result, { role: "presentation" })
})

Deno.test("_validateImgRole - with accessible name rejects invalid role", function testImgAccessibleNameRejectsInvalid() {
	const result = _validateImgRole(true, false)("invalid")

	assertEquals(result, { "data-§-bad-role": "invalid" })
})

Deno.test("_validateImgRole - with empty alt allows none role", function testImgEmptyAltNone() {
	const result = _validateImgRole(false, true)("none")

	assertEquals(result, { role: "none" })
})

Deno.test("_validateImgRole - with empty alt allows presentation role", function testImgEmptyAltPresentation() {
	const result = _validateImgRole(false, true)("presentation")

	assertEquals(result, { role: "presentation" })
})

Deno.test("_validateImgRole - with empty alt rejects button role", function testImgEmptyAltRejectsButton() {
	const result = _validateImgRole(false, true)("button")

	assertEquals(result, { "data-§-bad-role": "button" })
})

Deno.test("_validateImgRole - with empty alt rejects link role", function testImgEmptyAltRejectsLink() {
	const result = _validateImgRole(false, true)("link")

	assertEquals(result, { "data-§-bad-role": "link" })
})

Deno.test("_validateImgRole - without alt allows none role", function testImgNoAltNone() {
	const result = _validateImgRole(false, false)("none")

	assertEquals(result, { role: "none" })
})

Deno.test("_validateImgRole - without alt allows presentation role", function testImgNoAltPresentation() {
	const result = _validateImgRole(false, false)("presentation")

	assertEquals(result, { role: "presentation" })
})

Deno.test("_validateImgRole - without alt rejects button role", function testImgNoAltRejectsButton() {
	const result = _validateImgRole(false, false)("button")

	assertEquals(result, { "data-§-bad-role": "button" })
})

Deno.test("_validateImgRole - returns empty object when role is undefined", function testImgRoleUndefined() {
	const result = _validateImgRole(true, false)(undefined)

	assertEquals(result, {})
})

Deno.test("_validateImgRole - returns empty object when role is null", function testImgRoleNull() {
	const result = _validateImgRole(true, false)(null)

	assertEquals(result, {})
})

Deno.test("_validateImgRole - returns empty object when role is not a string", function testImgRoleNotString() {
	const result = _validateImgRole(true, false)(123)

	assertEquals(result, {})
})
