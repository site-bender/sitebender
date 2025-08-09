import { assertEquals, assertExists } from "@std/assert"

import Area from "../../../../../../constructors/elements/flow/phrasing/Area/index.ts"

Deno.test("Area should create a basic area with no attributes", () => {
	const area = Area()
	assertEquals(area.tag, "Area")
	assertExists(area.attributes)
})

Deno.test("Area should create an area with shape and coords attributes", () => {
	const area = Area({
		shape: "rect",
		coords: "0,0,100,100",
		alt: "Navigation area",
		href: "/navigation",
	})

	assertEquals(area.tag, "Area")
	assertEquals(area.attributes["shape"], "rect")
	assertEquals(area.attributes["coords"], "0,0,100,100")
	assertEquals(area.attributes["alt"], "Navigation area")
	assertEquals(area.attributes["href"], "/navigation")
})

Deno.test("Area should handle different shape values", () => {
	const shapes = ["rect", "circle", "poly", "default"]

	shapes.forEach((shape) => {
		const area = Area({ shape })
		assertEquals(area.attributes["shape"], shape)
	})
})

Deno.test("Area should create an area with valid global attributes", () => {
	const area = Area({
		id: "image-map-area",
		class: "clickable-area",
		title: "Click to navigate",
		lang: "en",
	})

	assertEquals(area.tag, "Area")
	assertEquals(area.attributes["id"], "image-map-area")
	assertEquals(area.attributes["class"], "clickable-area")
	assertEquals(area.attributes["title"], "Click to navigate")
	assertEquals(area.attributes["lang"], "en")
})

Deno.test("Area should filter out invalid attributes", () => {
	const area = Area({
		shape: "rect",
		coords: "0,0,100,100",
		children: "invalid-for-area",
		content: "invalid-for-area",
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(area.tag, "Area")
	assertEquals(area.attributes["shape"], "rect")
	assertEquals(area.attributes["coords"], "0,0,100,100")
	assertEquals(area.attributes["children"], undefined)
	assertEquals(area.attributes["content"], undefined)
	assertEquals((area.attributes as any).invalidAttr, undefined)
})

Deno.test("Area should handle href and target attributes", () => {
	const area = Area({
		href: "https://example.com",
		target: "_blank",
		rel: "noopener",
		download: "file.pdf",
	})

	assertEquals(area.tag, "Area")
	assertEquals(area.attributes["href"], "https://example.com")
	assertEquals(area.attributes["target"], "_blank")
	assertEquals(area.attributes["rel"], "noopener")
	assertEquals(area.attributes["download"], "file.pdf")
})

Deno.test("Area should handle media and ping attributes", () => {
	const area = Area({
		media: "screen and (max-width: 600px)",
		ping: "https://analytics.example.com/ping",
		hreflang: "en-US",
	})

	assertEquals(area.tag, "Area")
	assertEquals(area.attributes["media"], "screen and (max-width: 600px)")
	assertEquals(area.attributes["ping"], "https://analytics.example.com/ping")
	assertEquals(area.attributes["hreflang"], "en-US")
})

Deno.test("Area should handle referrer policy attribute", () => {
	const area = Area({
		referrerpolicy: "no-referrer",
		href: "https://example.com",
	})

	assertEquals(area.tag, "Area")
	assertEquals(area.attributes["referrerpolicy"], "no-referrer")
})

Deno.test("Area should handle special properties", () => {
	const area = Area({
		calculation: "areaCalculation",
		dataset: { region: "navigation", type: "interactive" },
		display: "none",
		scripts: ["area-tracker.js"],
		stylesheets: ["area.css"],
	})

	assertEquals(area.tag, "Area")
	assertEquals((area as any).calculation, "areaCalculation")
	assertEquals((area as any).dataset, {
		region: "navigation",
		type: "interactive",
	})
	assertEquals((area as any).display, "none")
	assertEquals((area as any).scripts, ["area-tracker.js"])
	assertEquals((area as any).stylesheets, ["area.css"])
})

Deno.test("Area should handle ARIA attributes", () => {
	const area = Area({
		aria: {
			label: "Navigation area",
			describedby: "area-description",
		},
	})

	assertEquals(area.tag, "Area")
	assertEquals(area.attributes["aria-label"], "Navigation area")
	assertEquals(area.attributes["aria-describedby"], "area-description")
})

Deno.test("Area should handle image map coordinates", () => {
	const areas = [
		{ shape: "rect", coords: "0,0,100,100" },
		{ shape: "circle", coords: "50,50,30" },
		{ shape: "poly", coords: "0,0,50,0,25,50" },
	]

	areas.forEach(({ shape, coords }) => {
		const area = Area({ shape, coords, alt: `${shape} area` })
		assertEquals(area.attributes["shape"], shape)
		assertEquals(area.attributes["coords"], coords)
		assertEquals(area.attributes["alt"], `${shape} area`)
	})
})
