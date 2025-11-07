import { assertEquals } from "@std/assert"

import _validateAttributes from "./index.ts"

Deno.test("_validateAttributes", async function validateAttributesTests(t) {
	await t.step(
		"validates global attributes",
		function validatesGlobalAttributes() {
			const result = _validateAttributes("div")({
				id: "test",
				class: "container",
			})

			assertEquals(result.id, "test")
			assertEquals(result.class, "container")
		},
	)

	await t.step(
		"validates element-specific attributes",
		function validatesElementSpecific() {
			const result = _validateAttributes("a")({
				href: "/home",
				target: "_blank",
			})

			assertEquals(result.href, "/home")
			assertEquals(result.target, "_blank")
		},
	)

	await t.step(
		"validates ARIA attributes",
		function validatesAriaAttributes() {
			const result = _validateAttributes("div")({
				aria: { label: "Main", hidden: "true" },
			})

			assertEquals(result["aria-label"], "Main")
			assertEquals(result["aria-hidden"], "true")
		},
	)

	await t.step(
		"validates role attribute",
		function validatesRoleAttribute() {
			const result = _validateAttributes("button")({
				role: "tab",
			})

			assertEquals(result.role, "tab")
		},
	)

	await t.step(
		"marks invalid role as bad",
		function marksInvalidRoleAsBad() {
			const result = _validateAttributes("div")({
				role: "invalid",
			})

			assertEquals(result["data-§-bad-role"], "invalid")
			assertEquals(result.role, undefined)
		},
	)

	await t.step(
		"converts unknown attributes to data-*",
		function convertsUnknownToData() {
			const result = _validateAttributes("div")({
				onClick: "handler",
				customProp: "value",
			})

			assertEquals(result["data-on-click"], "handler")
			assertEquals(result["data-custom-prop"], "value")
		},
	)

	await t.step(
		"cleans data-data-* duplicates",
		function cleansDataDuplicates() {
			const result = _validateAttributes("div")({
				"data-custom": "value",
			})

			assertEquals(result["data-custom"], "value")
			assertEquals(result["data-data-custom"], undefined)
		},
	)

	await t.step(
		"handles complex combination of attributes",
		function handlesComplexCombination() {
			const result = _validateAttributes("a")({
				id: "link",
				class: "nav-link",
				href: "/home",
				target: "_blank",
				aria: { label: "Home link" },
				role: "button",
				onClick: "handler",
			})

			assertEquals(result.id, "link")
			assertEquals(result.class, "nav-link")
			assertEquals(result.href, "/home")
			assertEquals(result.target, "_blank")
			assertEquals(result["aria-label"], "Home link")
			assertEquals(result.role, "button")
			assertEquals(result["data-on-click"], "handler")
		},
	)
})
