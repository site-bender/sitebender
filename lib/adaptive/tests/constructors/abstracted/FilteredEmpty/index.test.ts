import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import FilteredEmpty from "../../../../constructors/abstracted/FilteredEmpty/index.ts"

Deno.test("FilteredEmpty should create element with default tag Img and identity filter", () => {
	const createImg = FilteredEmpty()()
	const result = createImg({})

	assertEquals(result.tag, "Img")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	// FilteredEmpty has no children property (enforced by TypeScript)
})

Deno.test("FilteredEmpty should create element with custom tag", () => {
	const createBr = FilteredEmpty("Br")()
	const result = createBr({})

	assertEquals(result.tag, "Br")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
})

Deno.test("FilteredEmpty should apply custom attribute filter function", () => {
	// Filter that only allows 'src', 'alt' and 'id' attributes for images
	const filterImgAttribs = (attrs: any) => {
		const { src, alt, id, ...rest } = attrs
		return { src, alt, id }
	}

	const createImg = FilteredEmpty("Img")(filterImgAttribs)({
		id: "image-id",
		src: "/image.jpg",
		alt: "Test Image",
		class: "should-be-filtered",
		title: "should-be-filtered",
		onclick: "should-be-filtered",
	})

	assertEquals(createImg.attributes["id"], "image-id")
	assertEquals(createImg.attributes["src"], "/image.jpg")
	assertEquals(createImg.attributes["alt"], "Test Image")
	assertEquals(createImg.attributes["class"], undefined)
	assertEquals(createImg.attributes["title"], undefined)
	assertEquals((createImg.attributes as any).onclick, undefined)
})

Deno.test("FilteredEmpty should handle ARIA attributes", () => {
	const createImg = FilteredEmpty("Img")()({
		aria: {
			hidden: "true",
			label: "Decorative Image",
			describedby: "description",
		},
	})

	assertEquals(createImg.attributes["aria-hidden"], "true")
	assertEquals(createImg.attributes["aria-label"], "Decorative Image")
	assertEquals(createImg.attributes["aria-describedby"], "description")
})

Deno.test("FilteredEmpty should handle special properties (no format property)", () => {
	const createBr = FilteredEmpty("Br")()({
		calculation: "someCalculation",
		dataset: { type: "break", value: "test" },
		display: "block",
		scripts: ["script1.js", "script2.js"],
		stylesheets: ["style1.css", "style2.css"],
	})

	assertEquals(createBr.calculation, "someCalculation")
	assertEquals(createBr.dataset, { type: "break", value: "test" })
	assertEquals(createBr.display, "block")
	assertEquals(createBr.scripts, ["script1.js", "script2.js"])
	assertEquals(createBr.stylesheets, ["style1.css", "style2.css"])
	// Note: FilteredEmpty doesn't have format property
	assertEquals((createBr as any).format, undefined)
})

Deno.test("FilteredEmpty should work with complex validation filtering", () => {
	// Custom filter that validates image attributes
	const filterImgAttribs = (attrs: any) => {
		const { src, alt, width, height, id, ...rest } = attrs
		const result: any = { id }
		if (typeof src === "string" && src.length > 0) {
			result.src = src
		}
		if (typeof alt === "string") {
			result.alt = alt
		}
		if (typeof width === "number" && width > 0) {
			result.width = width
		}
		if (typeof height === "number" && height > 0) {
			result.height = height
		}
		return result
	}

	const createImg = FilteredEmpty("Img")(filterImgAttribs)({
		id: "valid-img",
		src: "/valid-image.jpg",
		alt: "Valid Image",
		width: 300,
		height: 200,
		onclick: "invalidAttribute",
		class: "invalidAttribute",
		"data-invalid": "invalidAttribute",
	})

	assertEquals(createImg.attributes["id"], "valid-img")
	assertEquals(createImg.attributes["src"], "/valid-image.jpg")
	assertEquals(createImg.attributes["alt"], "Valid Image")
	assertEquals(createImg.attributes["width"], 300)
	assertEquals(createImg.attributes["height"], 200)
	assertEquals(createImg.attributes["onclick"], undefined)
	assertEquals(createImg.attributes["class"], undefined)
	assertEquals(createImg.attributes["data-invalid"], undefined)
})

Deno.test("FilteredEmpty should handle identity filter with all attributes", () => {
	const createBr = FilteredEmpty("Br")((a: any) => a)({
		calculation: "calculation",
		dataset: { value: "dataset" },
		display: "display",
		scripts: ["scripts"],
		stylesheets: ["stylesheets"],
		id: "test-id",
	})

	assertExists(createBr.attributes["id"])
	assertEquals(createBr.calculation, "calculation")
	assertEquals(createBr.dataset, { value: "dataset" })
	assertEquals(createBr.display, "display")
	assertEquals(createBr.scripts, ["scripts"])
	assertEquals(createBr.stylesheets, ["stylesheets"])
	assertEquals(createBr.tag, "Br")
})

Deno.test("FilteredEmpty should handle empty attributes", () => {
	const createBr = FilteredEmpty("Br")((a: any) => a)()

	assertEquals(createBr.tag, "Br")
	assertEquals(typeof createBr.attributes, "object")
	assertExists(createBr.attributes["id"]) // getId should still generate an id
})

Deno.test("FilteredEmpty should handle undefined special properties", () => {
	const createImg = FilteredEmpty("Img")()({
		calculation: undefined,
		dataset: undefined,
		display: undefined,
		scripts: undefined,
		stylesheets: undefined,
	})

	assertEquals(createImg.calculation, undefined)
	assertEquals(createImg.dataset, undefined)
	assertEquals(createImg.display, undefined)
	assertEquals(createImg.scripts, undefined)
	assertEquals(createImg.stylesheets, undefined)
})
