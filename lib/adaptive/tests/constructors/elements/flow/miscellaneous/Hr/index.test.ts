import { assertEquals, assertExists } from "@std/assert"

import Hr from "../../../../../../constructors/elements/flow/miscellaneous/Hr/index.ts"

Deno.test("Hr should create a basic hr with no attributes", () => {
	const hr = Hr()
	assertEquals(hr.tag, "Hr")
	assertExists(hr.attributes)
})

Deno.test("Hr should create an hr with valid global attributes", () => {
	const hr = Hr({
		id: "section-break",
		class: "divider",
		title: "Section divider",
		lang: "en",
	})

	assertEquals(hr.tag, "Hr")
	assertEquals(hr.attributes["id"], "section-break")
	assertEquals(hr.attributes["class"], "divider")
	assertEquals(hr.attributes["title"], "Section divider")
	assertEquals(hr.attributes["lang"], "en")
})

Deno.test("Hr should filter out invalid attributes", () => {
	const hr = Hr({
		id: "section-break",
		invalidAttribute: "should-be-removed",
		class: "divider",
	})

	assertEquals(hr.tag, "Hr")
	assertEquals(hr.attributes["id"], "section-break")
	assertEquals(hr.attributes["class"], "divider")
	assertEquals(hr.attributes["invalidAttribute"], undefined)
})

Deno.test("Hr should handle special properties", () => {
	const hr = Hr({
		id: "section-break",
		dataset: { testId: "hr-test" },
		display: "block",
		scripts: ["hr.js"],
	})

	assertEquals(hr.tag, "Hr")
	assertEquals(hr.attributes["id"], "section-break")
	assertEquals(hr.dataset, { testId: "hr-test" })
	assertEquals(hr.display, "block")
	assertEquals(hr.scripts, ["hr.js"])
})

Deno.test("Hr should handle ARIA attributes", () => {
	const hr = Hr({
		id: "section-break",
		aria: {
			label: "Section break",
			hidden: "false",
		},
	})

	assertEquals(hr.tag, "Hr")
	assertEquals(hr.attributes["id"], "section-break")
	assertEquals(hr.attributes["aria-label"], "Section break")
	assertEquals(hr.attributes["aria-hidden"], "false")
})

Deno.test("Hr should handle empty attributes", () => {
	const hr = Hr({})

	assertEquals(hr.tag, "Hr")
	assertExists(hr.attributes)
	assertExists(hr.attributes["id"]) // getId always generates an id
})
