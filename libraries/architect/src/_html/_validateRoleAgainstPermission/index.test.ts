import { assertEquals } from "@std/assert"
import _validateRoleAgainstPermission from "./index.ts"

Deno.test("_validateRoleAgainstPermission - permission 'none' rejects any role", function testPermissionNoneRejects() {
	const validate = _validateRoleAgainstPermission("none")
	const result = validate("button")

	assertEquals(result["data-§-bad-role"], "button")
	assertEquals(result.role, undefined)
})

Deno.test("_validateRoleAgainstPermission - permission 'none' rejects presentation role", function testPermissionNoneRejectsPresentation() {
	const validate = _validateRoleAgainstPermission("none")
	const result = validate("presentation")

	assertEquals(result["data-§-bad-role"], "presentation")
})

Deno.test("_validateRoleAgainstPermission - permission 'any' accepts button role", function testPermissionAnyAcceptsButton() {
	const validate = _validateRoleAgainstPermission("any")
	const result = validate("button")

	assertEquals(result.role, "button")
	assertEquals(result["data-§-bad-role"], undefined)
})

Deno.test("_validateRoleAgainstPermission - permission 'any' accepts custom role", function testPermissionAnyAcceptsCustom() {
	const validate = _validateRoleAgainstPermission("any")
	const result = validate("custom-role")

	assertEquals(result.role, "custom-role")
})

Deno.test("_validateRoleAgainstPermission - array permission accepts allowed role", function testArrayPermissionAccepts() {
	const validate = _validateRoleAgainstPermission(["button", "link", "checkbox"])
	const result = validate("button")

	assertEquals(result.role, "button")
	assertEquals(result["data-§-bad-role"], undefined)
})

Deno.test("_validateRoleAgainstPermission - array permission accepts another allowed role", function testArrayPermissionAcceptsAnother() {
	const validate = _validateRoleAgainstPermission(["button", "link", "checkbox"])
	const result = validate("checkbox")

	assertEquals(result.role, "checkbox")
})

Deno.test("_validateRoleAgainstPermission - array permission rejects disallowed role", function testArrayPermissionRejects() {
	const validate = _validateRoleAgainstPermission(["button", "link"])
	const result = validate("checkbox")

	assertEquals(result["data-§-bad-role"], "checkbox")
	assertEquals(result.role, undefined)
})

Deno.test("_validateRoleAgainstPermission - array permission rejects invalid role", function testArrayPermissionRejectsInvalid() {
	const validate = _validateRoleAgainstPermission(["button", "link"])
	const result = validate("invalid-role")

	assertEquals(result["data-§-bad-role"], "invalid-role")
})

Deno.test("_validateRoleAgainstPermission - returns empty object when role is undefined", function testUndefinedRole() {
	const validate = _validateRoleAgainstPermission("any")
	const result = validate(undefined)

	assertEquals(result, {})
})

Deno.test("_validateRoleAgainstPermission - returns empty object when role is null", function testNullRole() {
	const validate = _validateRoleAgainstPermission("any")
	const result = validate(null)

	assertEquals(result, {})
})

Deno.test("_validateRoleAgainstPermission - returns empty object when role is not a string", function testNonStringRole() {
	const validate = _validateRoleAgainstPermission("any")
	const result = validate(123)

	assertEquals(result, {})
})

Deno.test("_validateRoleAgainstPermission - returns empty object when role is boolean", function testBooleanRole() {
	const validate = _validateRoleAgainstPermission(["button", "link"])
	const result = validate(true)

	assertEquals(result, {})
})

Deno.test("_validateRoleAgainstPermission - returns empty object when role is object", function testObjectRole() {
	const validate = _validateRoleAgainstPermission("none")
	const result = validate({ role: "button" })

	assertEquals(result, {})
})

Deno.test("_validateRoleAgainstPermission - empty array permission rejects any role", function testEmptyArrayPermission() {
	const validate = _validateRoleAgainstPermission([])
	const result = validate("button")

	assertEquals(result["data-§-bad-role"], "button")
	assertEquals(result.role, undefined)
})

Deno.test("_validateRoleAgainstPermission - doc roles work with array permission", function testDocRoles() {
	const validate = _validateRoleAgainstPermission([
		"doc-backlink",
		"doc-biblioref",
		"doc-glossref",
	])
	const result = validate("doc-backlink")

	assertEquals(result.role, "doc-backlink")
})
