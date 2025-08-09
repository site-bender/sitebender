import { assertEquals } from "@std/assert"

import IFrame from "../../../../../../constructors/elements/flow/embedded/IFrame/index.ts"

Deno.test("IFrame should create a basic iframe element with no attributes", () => {
	const iframe = IFrame({})
	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.children, undefined)
})

Deno.test("IFrame should create an iframe element with valid attributes", () => {
	const iframe = IFrame({
		id: "embedded-page",
		src: "https://example.com",
		width: 800,
		height: 600,
		allowfullscreen: true,
		loading: "lazy",
		sandbox: "allow-scripts",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["id"], "embedded-page")
	assertEquals(iframe.attributes["src"], "https://example.com")
	assertEquals(iframe.attributes["width"], 800)
	assertEquals(iframe.attributes["height"], 600)
	assertEquals(iframe.attributes["allowfullscreen"], true)
	assertEquals(iframe.attributes["loading"], "lazy")
	assertEquals(iframe.attributes["sandbox"], "allow-scripts")
})

Deno.test("IFrame should filter out invalid attributes", () => {
	const iframe = IFrame({
		id: "frame",
		alt: "invalid-for-iframe",
		controls: "invalid-for-iframe",
		autoplay: "invalid-for-iframe",
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["id"], "frame")
	assertEquals(iframe.attributes["alt"], undefined)
	assertEquals(iframe.attributes["controls"], undefined)
	assertEquals(iframe.attributes["autoplay"], undefined)
	assertEquals((iframe.attributes as any).invalidAttr, undefined)
})

Deno.test("IFrame should handle sandbox attribute", () => {
	const iframe = IFrame({
		src: "sandboxed.html",
		sandbox: "allow-scripts allow-same-origin",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["sandbox"], "allow-scripts allow-same-origin")
})

Deno.test("IFrame should handle allow attribute", () => {
	const iframe = IFrame({
		src: "media.html",
		allow: "camera *; microphone *; geolocation *",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(
		iframe.attributes["allow"],
		"camera *; microphone *; geolocation *",
	)
})

Deno.test("IFrame should handle referrerpolicy attribute", () => {
	const iframe = IFrame({
		src: "secure-content.html",
		referrerpolicy: "no-referrer",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["referrerpolicy"], "no-referrer")
})

Deno.test("IFrame should handle srcdoc attribute", () => {
	const iframe = IFrame({
		srcdoc: "<html><body><h1>Inline HTML</h1></body></html>",
		width: 400,
		height: 300,
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(
		iframe.attributes["srcdoc"],
		"<html><body><h1>Inline HTML</h1></body></html>",
	)
	assertEquals(iframe.attributes["width"], 400)
	assertEquals(iframe.attributes["height"], 300)
})

Deno.test("IFrame should handle name attribute", () => {
	const iframe = IFrame({
		src: "target.html",
		name: "target-frame",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["name"], "target-frame")
})

Deno.test("IFrame should handle loading attribute", () => {
	const iframe1 = IFrame({ src: "content1.html", loading: "eager" })
	const iframe2 = IFrame({ src: "content2.html", loading: "lazy" })

	assertEquals(iframe1.attributes["loading"], "eager")
	assertEquals(iframe2.attributes["loading"], "lazy")
})

Deno.test("IFrame should handle ARIA attributes", () => {
	const iframe = IFrame({
		id: "accessible-iframe",
		src: "content.html",
		aria: {
			label: "Embedded content",
			describedby: "iframe-description",
		},
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["aria-label"], "Embedded content")
	assertEquals(iframe.attributes["aria-describedby"], "iframe-description")
})

Deno.test("IFrame should handle YouTube embedding", () => {
	const iframe = IFrame({
		src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		width: 560,
		height: 315,
		allowfullscreen: true,
		sandbox: "allow-scripts allow-same-origin",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(
		iframe.attributes["src"],
		"https://www.youtube.com/embed/dQw4w9WgXcQ",
	)
	assertEquals(iframe.attributes["width"], 560)
	assertEquals(iframe.attributes["height"], 315)
	assertEquals(iframe.attributes["allowfullscreen"], true)
})

Deno.test("IFrame should handle Google Maps embedding", () => {
	const iframe = IFrame({
		src: "https://www.google.com/maps/embed?pb=!1m18...",
		width: 600,
		height: 450,
		allowfullscreen: false,
		loading: "lazy",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["allowfullscreen"], false)
	assertEquals(iframe.attributes["loading"], "lazy")
})

Deno.test("IFrame should handle missing src and srcdoc", () => {
	const iframe = IFrame({
		width: 400,
		height: 300,
		sandbox: "allow-scripts",
	})

	assertEquals(iframe.tag, "IFrame")
	assertEquals(iframe.attributes["src"], undefined)
	assertEquals(iframe.attributes["srcdoc"], undefined)
	assertEquals(iframe.attributes["sandbox"], "allow-scripts")
})
