import { assert, assertEquals } from "@std/assert"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import _P from "@sitebender/architect/_html/flow/_P/index.ts"

import type { ElementNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import _Div from "./index.ts"

Deno.test("_Div component", async function divTests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = _Div({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const paragraph = _P({ children: [text] })
			const component = _Div({ children: [paragraph] })

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"rejects naming attributes on div without role",
		function rejectsNamingWithoutRole() {
			const component = _Div({
				aria: {
					label: "Label", // Not allowed on div without explicit role
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-label"], undefined)
			assertEquals(
				isDefined(component.attributes["data-§-bad-aria-label"]),
				true,
			)
			assertEquals(isDefined(component.attributes["data-§-aria-error"]), true)
		},
	)

	await t.step(
		"allows naming attributes on div with role",
		function allowsNamingWithRole() {
			const component = _Div({
				role: "button",
				aria: {
					label: "Click", // Allowed because div has explicit button role
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-label"], "Click")
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)

	await t.step(
		"validates role-specific attributes",
		function validatesRoleSpecific() {
			const component = _Div({
				role: "region",
				aria: {
					label: "Content area", // Allowed for region
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-label"], "Content area")
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)

	await t.step(
		"rejects invalid ARIA attributes for role",
		function rejectsInvalidAriaForRole() {
			const component = _Div({
				role: "button",
				aria: {
					label: "Click",
					checked: "true", // Not allowed on button role
				},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["aria-label"], "Click")
			assertEquals(component.attributes["aria-checked"], undefined)
			assertEquals(
				isDefined(component.attributes["data-§-bad-aria-checked"]),
				true,
			)
			assertEquals(isDefined(component.attributes["data-§-aria-error"]), true)
		},
	)

	await t.step(
		"handles empty aria object",
		function handlesEmptyAria() {
			const component = _Div({
				aria: {},
			}) as ElementNode

			assert(isVirtualNode(component))
			assertEquals(component.attributes["data-§-aria-error"], undefined)
		},
	)
})
