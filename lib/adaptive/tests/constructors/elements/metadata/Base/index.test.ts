import { assertEquals, assertExists } from "@std/assert"

import Base from "../../../../../constructors/elements/metadata/Base/index.ts"

Deno.test("Base should create a basic base element with no attributes", () => {
	const base = Base()
	assertEquals(base.tag, "Base")
	assertExists(base.attributes)
	assertExists(base.attributes["id"])
})

Deno.test("Base should create a base element with valid href attribute", () => {
	const base = Base({
		href: "https://example.com/",
	})

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["href"], "https://example.com/")
})

Deno.test("Base should create a base element with valid target attribute", () => {
	const base = Base({
		target: "_blank",
	})

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["target"], "_blank")
})

Deno.test("Base should create a base element with both href and target", () => {
	const base = Base({
		href: "https://example.com/",
		target: "_self",
	})

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["href"], "https://example.com/")
	assertEquals(base.attributes["target"], "_self")
})

Deno.test("Base should accept valid target values", () => {
	const targets = ["_blank", "_self", "_parent", "_top"]

	targets.forEach((target) => {
		const base = Base({ target })
		assertEquals(base.attributes["target"], target)
	})
})

Deno.test("Base should filter out invalid target values", () => {
	const base = Base({
		target: "invalid-target",
	} as any)

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["target"], undefined)
})

Deno.test("Base should handle global attributes", () => {
	const base = Base({
		id: "base-element",
		class: "base-class",
		title: "Base Title",
		lang: "en",
	})

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["id"], "base-element")
	assertEquals(base.attributes["class"], "base-class")
	assertEquals(base.attributes["title"], "Base Title")
	assertEquals(base.attributes["lang"], "en")
})

Deno.test("Base should handle ARIA attributes", () => {
	const base = Base({
		aria: {
			label: "Base element",
			hidden: "true",
		},
	})

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["aria-label"], "Base element")
	assertEquals(base.attributes["aria-hidden"], "true")
})

Deno.test("Base should handle special properties", () => {
	const base = Base({
		calculation: "baseCalculation",
		dataset: { type: "base", value: "test" },
		display: "none",
		scripts: ["base-script.js"],
		stylesheets: ["base-style.css"],
	})

	assertEquals(base.tag, "Base")
	assertEquals((base as any).calculation, "baseCalculation")
	assertEquals((base as any).dataset, { type: "base", value: "test" })
	assertEquals((base as any).display, "none")
	assertEquals((base as any).scripts, ["base-script.js"])
	assertEquals((base as any).stylesheets, ["base-style.css"])
})

Deno.test("Base should filter out invalid attributes", () => {
	const base = Base({
		href: "https://example.com/",
		target: "_blank",
		src: "invalid-for-base",
		alt: "invalid-for-base",
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["href"], "https://example.com/")
	assertEquals(base.attributes["target"], "_blank")
	assertEquals(base.attributes["src"], undefined)
	assertEquals((base.attributes as any).alt, undefined)
	assertEquals((base.attributes as any).invalidAttr, undefined)
})

Deno.test("Base should handle empty href", () => {
	const base = Base({
		href: "",
	})

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["href"], "")
})

Deno.test("Base should handle complex href URLs", () => {
	const complexUrl =
		"https://example.com:8080/path/to/resource?query=value&another=param#section"
	const base = Base({
		href: complexUrl,
	})

	assertEquals(base.tag, "Base")
	assertEquals(base.attributes["href"], complexUrl)
})
