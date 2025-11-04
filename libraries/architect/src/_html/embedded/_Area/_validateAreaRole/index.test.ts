import { assertEquals } from "@std/assert"
import _validateAreaRole from "./index.ts"

Deno.test("_validateAreaRole - with href allows button role", function testAreaWithHrefButton() {
	const result = _validateAreaRole(true)("button")

	assertEquals(result, { role: "button" })
})

Deno.test("_validateAreaRole - with href allows link role", function testAreaWithHrefLink() {
	const result = _validateAreaRole(true)("link")

	assertEquals(result, { role: "link" })
})

Deno.test("_validateAreaRole - with href rejects generic role", function testAreaWithHrefRejectsGeneric() {
	const result = _validateAreaRole(true)("generic")

	assertEquals(result, { "data-§-bad-role": "generic" })
})

Deno.test("_validateAreaRole - with href rejects invalid role", function testAreaWithHrefRejectsInvalid() {
	const result = _validateAreaRole(true)("invalid")

	assertEquals(result, { "data-§-bad-role": "invalid" })
})

Deno.test("_validateAreaRole - without href allows generic role", function testAreaWithoutHrefGeneric() {
	const result = _validateAreaRole(false)("generic")

	assertEquals(result, { role: "generic" })
})

Deno.test("_validateAreaRole - without href rejects button role", function testAreaWithoutHrefRejectsButton() {
	const result = _validateAreaRole(false)("button")

	assertEquals(result, { "data-§-bad-role": "button" })
})

Deno.test("_validateAreaRole - without href rejects link role", function testAreaWithoutHrefRejectsLink() {
	const result = _validateAreaRole(false)("link")

	assertEquals(result, { "data-§-bad-role": "link" })
})

Deno.test("_validateAreaRole - returns empty object when role is undefined", function testAreaRoleUndefined() {
	const result = _validateAreaRole(true)(undefined)

	assertEquals(result, {})
})

Deno.test("_validateAreaRole - returns empty object when role is null", function testAreaRoleNull() {
	const result = _validateAreaRole(true)(null)

	assertEquals(result, {})
})

Deno.test("_validateAreaRole - returns empty object when role is not a string", function testAreaRoleNotString() {
	const result = _validateAreaRole(true)(123)

	assertEquals(result, {})
})
