import { assertEquals, assertExists } from "@std/assert"

import Map from "../../../../../../constructors/elements/flow/phrasing/Map/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Map should create a basic map with no attributes or children", () => {
	const map = Map()([])
	assertEquals(map.tag, "Map")
	assertEquals(map.children, [])
	assertExists(map.attributes)
})

Deno.test("Map should create a map with name attribute", () => {
	const map = Map({
		name: "navigation-map",
		id: "main-navigation",
	})([])

	assertEquals(map.tag, "Map")
	assertEquals(map.attributes["name"], "navigation-map")
	assertEquals(map.attributes["id"], "main-navigation")
})

Deno.test("Map should create a map with valid global attributes", () => {
	const map = Map({
		id: "image-map",
		name: "clickable-regions",
		class: "interactive-map",
		title: "Image Map",
		lang: "en",
	})([])

	assertEquals(map.tag, "Map")
	assertEquals(map.attributes["id"], "image-map")
	assertEquals(map.attributes["name"], "clickable-regions")
	assertEquals(map.attributes["class"], "interactive-map")
	assertEquals(map.attributes["title"], "Image Map")
	assertEquals(map.attributes["lang"], "en")
})

Deno.test("Map should filter out invalid attributes", () => {
	const map = Map({
		name: "navigation-map",
		href: "invalid-for-map",
		src: "invalid-for-map",
		alt: "invalid-for-map",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(map.tag, "Map")
	assertEquals(map.attributes["name"], "navigation-map")
	assertEquals(map.attributes["href"], undefined)
	assertEquals(map.attributes["src"], undefined)
	assertEquals(map.attributes["alt"], undefined)
	assertEquals((map.attributes as any).invalidAttr, undefined)
})

Deno.test("Map should accept Area children", () => {
	const areas = [
		{
			tag: "Area",
			attributes: {
				shape: "rect",
				coords: "0,0,100,50",
				href: "/home",
				alt: "Home",
			},
			children: [],
		},
		{
			tag: "Area",
			attributes: {
				shape: "rect",
				coords: "100,0,200,50",
				href: "/about",
				alt: "About",
			},
			children: [],
		},
		{
			tag: "Area",
			attributes: {
				shape: "circle",
				coords: "150,100,25",
				href: "/contact",
				alt: "Contact",
			},
			children: [],
		},
	]
	const map = Map({ name: "navigation-map" })(areas)

	assertEquals(map.tag, "Map")
	assertEquals(map.children.length, 3)
	assertEquals((map.children[0] as any).tag, "Area")
	assertEquals((map.children[1] as any).tag, "Area")
	assertEquals((map.children[2] as any).tag, "Area")
})

Deno.test("Map should accept flow content children", () => {
	const children = [
		{
			tag: "P",
			attributes: {},
			children: [TextNode("Click on the regions below:")],
		},
		{
			tag: "Area",
			attributes: {
				shape: "rect",
				coords: "0,0,100,50",
				href: "/section1",
				alt: "Section 1",
			},
			children: [],
		},
		{
			tag: "Area",
			attributes: {
				shape: "rect",
				coords: "100,0,200,50",
				href: "/section2",
				alt: "Section 2",
			},
			children: [],
		},
	]
	const map = Map({ name: "content-map" })(children)

	assertEquals(map.tag, "Map")
	assertEquals(map.children.length, 3)
	assertEquals((map.children[0] as any).tag, "P")
	assertEquals((map.children[1] as any).tag, "Area")
	assertEquals((map.children[2] as any).tag, "Area")
})

Deno.test("Map should handle single child (not array)", () => {
	const area = {
		tag: "Area",
		attributes: { shape: "default", href: "/fallback", alt: "Default" },
		children: [],
	}
	const map = Map({ name: "simple-map" })(area as any)

	assertEquals(map.tag, "Map")
	assertEquals(map.children.length, 1)
	assertEquals((map.children[0] as any).tag, "Area")
})

Deno.test("Map should handle special properties", () => {
	const map = Map({
		name: "interactive-map",
		calculation: "mapCalculation",
		dataset: { type: "navigation", regions: "3" },
		display: "block",
		scripts: ["map-tracker.js"],
		stylesheets: ["map.css"],
	})([])

	assertEquals(map.tag, "Map")
	assertEquals((map as any).calculation, "mapCalculation")
	assertEquals((map as any).dataset, {
		type: "navigation",
		regions: "3",
	})
	assertEquals((map as any).display, "block")
	assertEquals((map as any).scripts, ["map-tracker.js"])
	assertEquals((map as any).stylesheets, ["map.css"])
})

Deno.test("Map should handle ARIA attributes", () => {
	const map = Map({
		name: "accessible-map",
		aria: {
			label: "Interactive site navigation",
			describedby: "map-instructions",
		},
	})([])

	assertEquals(map.tag, "Map")
	assertEquals(map.attributes["aria-label"], "Interactive site navigation")
	assertEquals(map.attributes["aria-describedby"], "map-instructions")
})

Deno.test("Map should handle different area shapes", () => {
	const areas = [
		{
			tag: "Area",
			attributes: { shape: "rect", coords: "0,0,100,50" },
			children: [],
		},
		{
			tag: "Area",
			attributes: { shape: "circle", coords: "75,100,25" },
			children: [],
		},
		{
			tag: "Area",
			attributes: { shape: "poly", coords: "0,100,50,150,100,100" },
			children: [],
		},
		{ tag: "Area", attributes: { shape: "default" }, children: [] },
	]

	const map = Map({ name: "shape-demo" })(areas)

	assertEquals(map.tag, "Map")
	assertEquals(map.children.length, 4)

	// Verify each area has the expected shape
	const shapes = ["rect", "circle", "poly", "default"]
	shapes.forEach((shape, index) => {
		const area = map.children[index] as any
		assertEquals(area.tag, "Area")
		assertEquals(area.attributes["shape"], shape)
	})
})

Deno.test("Map should handle image map with usemap reference", () => {
	const map = Map({
		name: "product-map",
		id: "product-navigation",
		class: "product-image-map",
	})([
		{
			tag: "Area",
			attributes: {
				shape: "rect",
				coords: "0,0,150,100",
				href: "/products/category1",
				alt: "Category 1",
			},
			children: [],
		},
		{
			tag: "Area",
			attributes: {
				shape: "rect",
				coords: "150,0,300,100",
				href: "/products/category2",
				alt: "Category 2",
			},
			children: [],
		},
	])

	assertEquals(map.tag, "Map")
	assertEquals(map.attributes["name"], "product-map")
	assertEquals(map.attributes["id"], "product-navigation")
	assertEquals(map.attributes["class"], "product-image-map")
	assertEquals(map.children.length, 2)
})

Deno.test("Map should handle empty children array", () => {
	const map = Map({ name: "empty-map" })([])
	assertEquals(map.tag, "Map")
	assertEquals(map.children, [])
})
