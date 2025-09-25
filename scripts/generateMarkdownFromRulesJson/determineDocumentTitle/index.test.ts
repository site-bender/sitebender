import { assertEquals } from "@std/assert"

import determineDocumentTitle from "./index.ts"

//++ Tests for determineDocumentTitle
Deno.test("determineDocumentTitle", async (t) => {
	await t.step("returns 'Project rules' for root rules file", () => {
		assertEquals(determineDocumentTitle("/rules/index.json"), "Project rules")
		assertEquals(determineDocumentTitle("rules/index.json"), "Project rules")
	})

	await t.step(
		"returns library name with 'rules' for library rules files",
		() => {
			assertEquals(
				determineDocumentTitle("/libraries/envoy/rules/index.json"),
				"Envoy rules",
			)
			assertEquals(
				determineDocumentTitle("/libraries/arborist/rules/index.json"),
				"Arborist rules",
			)
			assertEquals(
				determineDocumentTitle("/libraries/agent/rules/index.json"),
				"Agent rules",
			)
		},
	)

	await t.step("returns 'Application rules' for application rules", () => {
		assertEquals(
			determineDocumentTitle("/applications/rules/index.json"),
			"Application rules",
		)
		assertEquals(
			determineDocumentTitle("/applications/web/rules/index.json"),
			"Application rules",
		)
	})

	await t.step("returns 'Rules documentation' for unknown paths", () => {
		assertEquals(
			determineDocumentTitle("/unknown/path.json"),
			"Rules documentation",
		)
		assertEquals(determineDocumentTitle(""), "Rules documentation")
	})
})
