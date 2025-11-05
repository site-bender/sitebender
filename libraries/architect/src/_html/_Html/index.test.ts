import { assert, assertEquals } from "@std/assert"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"

import type { ElementNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import _Html from "./index.ts"

Deno.test("_Html component", async function htmlTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Html({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const component = _Html({ children: [text] })

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"validates valid ARIA attributes",
		function validatesValidAria() {
			const component = _Html({
				aria: {
					hidden: "true",
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-hidden"], "true")
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)

	await t.step(
		"rejects invalid ARIA attributes",
		function rejectsInvalidAria() {
			const component = _Html({
				aria: {
					pressed: "true", // Not allowed on html element
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
		"rejects invalid ARIA values",
		function rejectsInvalidValues() {
			const component = _Html({
				aria: {
					hidden: "maybe", // Invalid value
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-hidden"], undefined)
			assertEquals(
				isDefined(component.attributes["data-§-bad-aria-hidden"]),
				true,
			)
			assertEquals(isDefined(component.attributes["data-§-aria-error"]), true)
		},
	)

	await t.step(
		"handles empty aria object",
		function handlesEmptyAria() {
			const component = _Html({
				aria: {},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)
})
