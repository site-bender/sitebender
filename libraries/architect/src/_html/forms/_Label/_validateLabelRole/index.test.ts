import { assertEquals } from "@std/assert"
import _validateLabelRole from "./index.ts"

Deno.test("_validateLabelRole - with for attribute rejects any role", function testLabelWithForRejectsRole() {
	const result = _validateLabelRole(true)("button")

	assertEquals(result, { "data-§-bad-role": "button" })
})

Deno.test("_validateLabelRole - with for attribute rejects presentation role", function testLabelWithForRejectsPresentation() {
	const result = _validateLabelRole(true)("presentation")

	assertEquals(result, { "data-§-bad-role": "presentation" })
})

Deno.test("_validateLabelRole - with for attribute rejects none role", function testLabelWithForRejectsNone() {
	const result = _validateLabelRole(true)("none")

	assertEquals(result, { "data-§-bad-role": "none" })
})

Deno.test("_validateLabelRole - without for allows button role", function testLabelWithoutForButton() {
	const result = _validateLabelRole(false)("button")

	assertEquals(result, { role: "button" })
})

Deno.test("_validateLabelRole - without for allows presentation role", function testLabelWithoutForPresentation() {
	const result = _validateLabelRole(false)("presentation")

	assertEquals(result, { role: "presentation" })
})

Deno.test("_validateLabelRole - without for allows any valid role", function testLabelWithoutForAnyRole() {
	const result = _validateLabelRole(false)("region")

	assertEquals(result, { role: "region" })
})

Deno.test("_validateLabelRole - returns empty object when role is undefined", function testLabelRoleUndefined() {
	const result = _validateLabelRole(true)(undefined)

	assertEquals(result, {})
})

Deno.test("_validateLabelRole - returns empty object when role is null", function testLabelRoleNull() {
	const result = _validateLabelRole(false)(null)

	assertEquals(result, {})
})

Deno.test("_validateLabelRole - returns empty object when role is not a string", function testLabelRoleNotString() {
	const result = _validateLabelRole(false)(123)

	assertEquals(result, {})
})
