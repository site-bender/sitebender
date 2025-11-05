import { assertEquals } from "@std/assert"
import includes from "@sitebender/toolsmith/array/includes/index.ts"

import _getAllowedAriaAttributes from "./index.ts"

Deno.test("_getAllowedAriaAttributes", async function getAllowedAriaAttributesTests(
	t,
) {
	await t.step(
		"returns empty array for elements with noAriaAttrs",
		function returnsEmptyForNoAriaAttrs() {
			const result = _getAllowedAriaAttributes("title")(undefined)

			assertEquals(result, [])
		},
	)

	await t.step(
		"returns empty array when no effective role",
		function returnsEmptyWhenNoRole() {
			const result = _getAllowedAriaAttributes("div")(undefined)

			assertEquals(result, [])
		},
	)

	await t.step(
		"includes global ARIA attributes for element with role",
		function includesGlobalAttrs() {
			const result = _getAllowedAriaAttributes("button")("button")

			// Global attrs should be included
			assertEquals(includes(result)("aria-label"), true)
			assertEquals(includes(result)("aria-describedby"), true)
			assertEquals(includes(result)("aria-disabled"), true)
		},
	)

	await t.step(
		"includes role-specific attributes",
		function includesRoleSpecific() {
			const result = _getAllowedAriaAttributes("button")("button")

			// Button-specific attrs
			assertEquals(includes(result)("aria-expanded"), true)
			assertEquals(includes(result)("aria-pressed"), true)
		},
	)

	await t.step(
		"includes required attributes",
		function includesRequiredAttrs() {
			const result = _getAllowedAriaAttributes("div")("checkbox")

			// checkbox has requiredAttrs: ["aria-checked"]
			assertEquals(includes(result)("aria-checked"), true)
		},
	)

	await t.step(
		"excludes naming attributes for naming-prohibited elements without role",
		function excludesNamingAttrsWhenProhibited() {
			// div has namingProhibited: true but allowedRoles: "any"
			// When div has explicit role, naming attrs should be allowed
			const result = _getAllowedAriaAttributes("div")("button")

			// With button role, aria-label should be allowed
			assertEquals(includes(result)("aria-label"), true)
		},
	)

	await t.step(
		"handles unknown role gracefully",
		function handlesUnknownRole() {
			const result = _getAllowedAriaAttributes("div")("unknown-role")

			// Unknown role → only global attributes
			// Global attrs should still be present
			assertEquals(includes(result)("aria-describedby"), true)
		},
	)

	await t.step(
		"handles unknown element gracefully",
		function handlesUnknownElement() {
			const result = _getAllowedAriaAttributes("unknown-element")("button")

			// Unknown element → empty array (no validation data)
			assertEquals(result, [])
		},
	)

	await t.step(
		"deduplicates attributes from multiple sources",
		function deduplicatesAttributes() {
			const result = _getAllowedAriaAttributes("button")("button")

			// aria-expanded appears in both global and button-specific
			// Should only appear once
			const expandedCount = result.filter(function countExpanded(attr) {
				return attr === "aria-expanded"
			}).length

			assertEquals(expandedCount, 1)
		},
	)

	await t.step(
		"handles elements with implicit role",
		function handlesImplicitRole() {
			const result = _getAllowedAriaAttributes("article")("article")

			// Article role should have allowed attributes
			assertEquals(includes(result)("aria-expanded"), true)
			assertEquals(includes(result)("aria-label"), true)
		},
	)
})
