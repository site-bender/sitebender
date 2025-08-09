import { assertEquals, assertExists } from "@std/assert"

import Meta from "../../../../../../constructors/elements/flow/metadata/Meta/index.ts"

Deno.test("Meta should create a basic meta element with no attributes", () => {
	const meta = Meta()
	assertEquals(meta.tag, "Meta")
	assertExists(meta.attributes)
	assertExists(meta.attributes["id"])
})

Deno.test("Meta should create a meta element with charset attribute", () => {
	const meta = Meta({ charset: "utf-8" })

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["charset"], "utf-8")
	assertExists(meta.attributes["id"])
})

Deno.test("Meta should create a meta element with name and content attributes", () => {
	const meta = Meta({
		name: "description",
		content: "Page description",
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["name"], "description")
	assertEquals(meta.attributes["content"], "Page description")
	assertExists(meta.attributes["id"])
})

Deno.test("Meta should create a meta element with httpEquiv attribute", () => {
	const meta = Meta({
		httpEquiv: "content-type",
		content: "text/html; charset=utf-8",
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["httpEquiv"], "content-type")
	assertEquals(meta.attributes["content"], "text/html; charset=utf-8")
	assertExists(meta.attributes["id"])
})

Deno.test("Meta should filter out invalid httpEquiv values", () => {
	const meta = Meta({
		httpEquiv: "invalid-value",
		content: "test content",
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["httpEquiv"], undefined)
	assertEquals(meta.attributes["content"], "test content")
})

Deno.test("Meta should create a meta element with media attribute", () => {
	const meta = Meta({
		name: "theme-color",
		content: "#000000",
		media: "(prefers-color-scheme: dark)",
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["name"], "theme-color")
	assertEquals(meta.attributes["content"], "#000000")
	assertEquals(meta.attributes["media"], "(prefers-color-scheme: dark)")
})

Deno.test("Meta should handle global attributes", () => {
	const meta = Meta({
		id: "meta-description",
		class: "meta-tag",
		name: "description",
		content: "Page description",
		title: "Description meta tag",
		lang: "en",
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["id"], "meta-description")
	assertEquals(meta.attributes["class"], "meta-tag")
	assertEquals(meta.attributes["name"], "description")
	assertEquals(meta.attributes["content"], "Page description")
	assertEquals(meta.attributes["title"], "Description meta tag")
	assertEquals(meta.attributes["lang"], "en")
})

Deno.test("Meta should filter out invalid attributes", () => {
	const meta = Meta({
		id: "meta-test",
		name: "description",
		content: "Page description",
		invalidAttribute: "should-be-removed",
		onClick: "should-be-filtered",
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["id"], "meta-test")
	assertEquals(meta.attributes["name"], "description")
	assertEquals(meta.attributes["content"], "Page description")
	assertEquals(meta.attributes["invalidAttribute"], undefined)
	assertEquals(meta.attributes["onClick"], undefined)
})

Deno.test("Meta should handle special properties", () => {
	const meta = Meta({
		id: "meta-test",
		name: "description",
		content: "Page description",
		calculation: { formula: "meta-level" },
		dataset: { section: "metadata" },
		display: "none",
		format: "html",
		scripts: ["meta.js"],
		stylesheets: ["meta.css"],
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["id"], "meta-test")
	assertEquals(meta.attributes["name"], "description")
	assertEquals(meta.attributes["content"], "Page description")
	assertExists(meta.calculation)
	assertExists(meta.dataset)
	assertExists(meta.display)
	assertExists(meta.scripts)
	assertExists(meta.stylesheets)
})

Deno.test("Meta should handle ARIA attributes", () => {
	const meta = Meta({
		id: "meta-test",
		name: "description",
		content: "Page description",
		aria: {
			label: "Page description meta",
			hidden: "true",
		},
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["id"], "meta-test")
	assertEquals(meta.attributes["name"], "description")
	assertEquals(meta.attributes["content"], "Page description")
	assertEquals(meta.attributes["aria-label"], "Page description meta")
	assertEquals(meta.attributes["aria-hidden"], "true")
})

Deno.test("Meta should handle meta element with all supported attributes", () => {
	const meta = Meta({
		id: "comprehensive-meta",
		charset: "utf-8",
		name: "viewport",
		content: "width=device-width, initial-scale=1",
		httpEquiv: "x-ua-compatible",
		media: "screen",
		class: "meta-element",
		title: "Comprehensive meta tag",
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["id"], "comprehensive-meta")
	assertEquals(meta.attributes["charset"], "utf-8")
	assertEquals(meta.attributes["name"], "viewport")
	assertEquals(
		meta.attributes["content"],
		"width=device-width, initial-scale=1",
	)
	assertEquals(meta.attributes["httpEquiv"], "x-ua-compatible")
	assertEquals(meta.attributes["media"], "screen")
	assertEquals(meta.attributes["class"], "meta-element")
	assertEquals(meta.attributes["title"], "Comprehensive meta tag")
})

Deno.test("Meta should filter out non-string values for string attributes", () => {
	const meta = Meta({
		id: "meta-test",
		charset: 123, // Invalid: should be string
		name: true, // Invalid: should be string
		content: [], // Invalid: should be string
		media: {}, // Invalid: should be string
	})

	assertEquals(meta.tag, "Meta")
	assertEquals(meta.attributes["id"], "meta-test")
	assertEquals(meta.attributes["charset"], undefined)
	assertEquals(meta.attributes["name"], undefined)
	assertEquals(meta.attributes["content"], undefined)
	assertEquals(meta.attributes["media"], undefined)
})
