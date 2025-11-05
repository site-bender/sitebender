import { assert, assertEquals } from "@std/assert"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import _P from "@sitebender/architect/_html/flow/_P/index.ts"

import type { ElementNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import _Button from "./index.ts"

Deno.test("_Button component", async function buttonTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Button({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const paragraph = _P({ children: [text] })
			const component = _Button({ children: [paragraph] })

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"validates valid ARIA attributes",
		function validatesValidAria() {
			const component = _Button({
				aria: {
					label: "Click me",
					pressed: "true",
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-label"], "Click me")
			assertEquals(component.attributes["aria-pressed"], "true")
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)

	await t.step(
		"rejects invalid ARIA attributes",
		function rejectsInvalidAria() {
			const component = _Button({
				aria: {
					label: "Click",
					colcount: "5", // Not allowed on button
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-label"], "Click")
			assertEquals(component.attributes["aria-colcount"], undefined)
			assertEquals(
				isDefined(component.attributes["data-§-bad-aria-colcount"]),
				true,
			)
			assertEquals(isDefined(component.attributes["data-§-aria-error"]), true)
		},
	)

	await t.step(
		"rejects invalid ARIA values",
		function rejectsInvalidValues() {
			const component = _Button({
				aria: {
					pressed: "maybe", // Invalid value
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-pressed"], undefined)
			assertEquals(
				isDefined(component.attributes["data-§-bad-aria-pressed"]),
				true,
			)
			assertEquals(isDefined(component.attributes["data-§-aria-error"]), true)
		},
	)

	await t.step(
		"handles explicit role changing allowed attributes",
		function handlesExplicitRole() {
			const component = _Button({
				role: "checkbox",
				aria: {
					checked: "true", // Allowed because of checkbox role
					label: "Enable feature",
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-checked"], "true")
			assertEquals(component.attributes["aria-label"], "Enable feature")
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)

	await t.step(
		"handles empty aria object",
		function handlesEmptyAria() {
			const component = _Button({
				aria: {},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)
})
