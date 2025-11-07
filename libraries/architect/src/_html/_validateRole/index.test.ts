import { assertEquals } from "@std/assert"

import _validateRole from "./index.ts"

Deno.test("_validateRole", async function validateRoleTests(t) {
	await t.step(
		"returns empty object for non-string role",
		function returnsEmptyForNonString() {
			const result = _validateRole("div")(null)

			assertEquals(result, {})
		},
	)

	await t.step(
		"returns role for valid role on element",
		function returnsRoleForValid() {
			const result = _validateRole("button")("tab")

			assertEquals(result, { role: "tab" })
		},
	)

	await t.step(
		"returns data-§-bad-role for invalid role on element",
		function returnsBadRoleForInvalid() {
			const result = _validateRole("button")("invalid-role")

			assertEquals(result, { "data-§-bad-role": "invalid-role" })
		},
	)

	await t.step(
		"returns data-§-bad-role for element with no permitted roles",
		function returnsBadRoleForNoPermitted() {
			const result = _validateRole("html")("banner")

			assertEquals(result, { "data-§-bad-role": "banner" })
		},
	)

	await t.step(
		"returns data-§-bad-role for unknown element",
		function returnsBadRoleForUnknownElement() {
			const result = _validateRole("unknown")("button")

			assertEquals(result, { "data-§-bad-role": "button" })
		},
	)
})
