import { assertEquals, assertExists } from "@std/assert"

import Link from "../../../../../../constructors/elements/flow/metadata/Link/index.ts"

Deno.test("Link should create a basic link element with no attributes", () => {
	const link = Link()
	assertEquals(link.tag, "Link")
	assertExists(link.attributes)
	assertExists(link.attributes["id"])
})

Deno.test("Link should create a link element with href attribute", () => {
	const link = Link({
		href: "https://example.com/styles.css",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["href"], "https://example.com/styles.css")
})

Deno.test("Link should create a link element with rel attribute", () => {
	const link = Link({
		rel: "stylesheet",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["rel"], "stylesheet")
})

Deno.test("Link should create a link element with type attribute", () => {
	const link = Link({
		type: "text/css",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["type"], "text/css")
})

Deno.test("Link should handle multiple link attributes", () => {
	const link = Link({
		href: "https://fonts.googleapis.com/css2?family=Roboto",
		rel: "stylesheet",
		type: "text/css",
		media: "screen",
	})

	assertEquals(link.tag, "Link")
	assertEquals(
		link.attributes["href"],
		"https://fonts.googleapis.com/css2?family=Roboto",
	)
	assertEquals(link.attributes["rel"], "stylesheet")
	assertEquals(link.attributes["type"], "text/css")
	assertEquals(link.attributes["media"], "screen")
})

Deno.test("Link should handle crossorigin attribute", () => {
	const link = Link({
		href: "https://cdn.example.com/font.woff2",
		rel: "preload",
		crossorigin: "anonymous",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["crossorigin"], "anonymous")
})

Deno.test("Link should handle integrity attribute", () => {
	const link = Link({
		href: "https://cdn.example.com/bootstrap.css",
		rel: "stylesheet",
		integrity: "sha384-example-hash",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["integrity"], "sha384-example-hash")
})

Deno.test("Link should handle hreflang attribute", () => {
	const link = Link({
		href: "https://example.com/es/page",
		rel: "alternate",
		hreflang: "es",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["hreflang"], "es")
})

Deno.test("Link should handle sizes attribute", () => {
	const link = Link({
		href: "/icon-192.png",
		rel: "icon",
		sizes: "192x192",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["sizes"], "192x192")
})

Deno.test("Link should handle global attributes", () => {
	const link = Link({
		id: "main-stylesheet",
		class: "critical-css",
		title: "Main Styles",
		lang: "en",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["id"], "main-stylesheet")
	assertEquals(link.attributes["class"], "critical-css")
	assertEquals(link.attributes["title"], "Main Styles")
	assertEquals(link.attributes["lang"], "en")
})

Deno.test("Link should handle ARIA attributes", () => {
	const link = Link({
		aria: {
			label: "External stylesheet",
			hidden: "true",
		},
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["aria-label"], "External stylesheet")
	assertEquals(link.attributes["aria-hidden"], "true")
})

Deno.test("Link should handle special properties", () => {
	const link = Link({
		calculation: "linkCalculation",
		dataset: { type: "stylesheet", priority: "high" },
		display: "none",
		scripts: ["link-loader.js"],
		stylesheets: ["base.css"],
	})

	assertEquals(link.tag, "Link")
	assertEquals((link as any).calculation, "linkCalculation")
	assertEquals((link as any).dataset, { type: "stylesheet", priority: "high" })
	assertEquals((link as any).display, "none")
	assertEquals((link as any).scripts, ["link-loader.js"])
	assertEquals((link as any).stylesheets, ["base.css"])
})

Deno.test("Link should filter out invalid attributes", () => {
	const link = Link({
		href: "https://example.com/style.css",
		rel: "stylesheet",
		invalidAttr: "should-be-filtered",
		onclick: "alert('invalid')",
	} as any)

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["href"], "https://example.com/style.css")
	assertEquals(link.attributes["rel"], "stylesheet")
	assertEquals((link.attributes as any).invalidAttr, undefined)
	assertEquals((link.attributes as any).onclick, undefined)
})

Deno.test("Link should handle different rel values", () => {
	const relValues = [
		"stylesheet",
		"preload",
		"prefetch",
		"icon",
		"alternate",
		"canonical",
		"dns-prefetch",
		"preconnect",
	]

	relValues.forEach((rel) => {
		const link = Link({ rel })
		assertEquals(link.attributes["rel"], rel)
	})
})

Deno.test("Link should handle different crossorigin values", () => {
	const crossoriginValues = ["anonymous", "use-credentials"]

	crossoriginValues.forEach((crossorigin) => {
		const link = Link({ crossorigin })
		assertEquals(link.attributes["crossorigin"], crossorigin)
	})
})

Deno.test("Link should handle complex icon links", () => {
	const link = Link({
		href: "/favicon.ico",
		rel: "icon",
		type: "image/x-icon",
		sizes: "16x16 32x32",
	})

	assertEquals(link.tag, "Link")
	assertEquals(link.attributes["href"], "/favicon.ico")
	assertEquals(link.attributes["rel"], "icon")
	assertEquals(link.attributes["type"], "image/x-icon")
	assertEquals(link.attributes["sizes"], "16x16 32x32")
})
