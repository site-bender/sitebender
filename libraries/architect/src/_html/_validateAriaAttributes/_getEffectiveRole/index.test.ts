import { assertEquals } from "@std/assert"
import _getEffectiveRole from "./index.ts"

Deno.test("_getEffectiveRole", async function getEffectiveRoleTests(t) {
	await t.step(
		"returns implicit role when no explicit role provided",
		function returnsImplicitRole() {
			const result = _getEffectiveRole("button")(undefined)

			assertEquals(result, "button")
		},
	)

	await t.step(
		"returns explicit role when allowed",
		function returnsExplicitRole() {
			const result = _getEffectiveRole("button")("link")

			assertEquals(result, "link") // link is in button's allowedRoles
		},
	)

	await t.step(
		"returns implicit role when explicit role not allowed",
		function returnsImplicitWhenInvalid() {
			const result = _getEffectiveRole("button")("table")

			assertEquals(result, "button") // table not in allowedRoles, fall back to implicit
		},
	)

	await t.step(
		"handles 'any' allowed roles",
		function handlesAnyRole() {
			const result = _getEffectiveRole("div")("button")

			assertEquals(result, "button") // div allows any role
		},
	)

	await t.step(
		"handles 'false' allowed roles (no explicit role)",
		function handlesFalseRole() {
			const result = _getEffectiveRole("main")("navigation")

			assertEquals(result, "main") // main allows no explicit role, use implicit
		},
	)

	await t.step(
		"returns undefined for unknown element",
		function returnsUndefinedForUnknown() {
			const result = _getEffectiveRole("unknown-element")(undefined)

			assertEquals(result, undefined)
		},
	)

	await t.step(
		"ignores non-string explicit role",
		function ignoresNonString() {
			const result = _getEffectiveRole("button")(123)

			assertEquals(result, "button") // Invalid type, use implicit
		},
	)

	await t.step(
		"handles naming-prohibited elements correctly",
		function handlesNamingProhibited() {
			// div has namingProhibited: true, but should still return generic
			const result = _getEffectiveRole("div")(undefined)

			assertEquals(result, "generic")
		},
	)

	await t.step(
		"handles metadata elements with noAriaAttrs",
		function handlesNoAriaAttrs() {
			const result = _getEffectiveRole("title")(undefined)

			assertEquals(result, undefined) // title has no implicit role
		},
	)
})
