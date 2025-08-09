import { assertEquals, assertExists } from "@std/assert"

import Picture from "../../../../../../constructors/elements/flow/embedded/Picture/index.ts"

Deno.test("Picture should create a basic picture element with no attributes or children", () => {
	const picture = Picture()([])
	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children, [])
	assertExists(picture.attributes)
})

Deno.test("Picture should create a picture element with valid global attributes", () => {
	const picture = Picture({
		id: "responsive-image",
		class: "hero-picture",
		title: "Hero image with multiple sources",
	})([])

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.attributes["id"], "responsive-image")
	assertEquals(picture.attributes["class"], "hero-picture")
	assertEquals(picture.attributes["title"], "Hero image with multiple sources")
})

Deno.test("Picture should filter out non-global attributes", () => {
	const picture = Picture({
		id: "picture",
		src: "invalid-for-picture",
		alt: "invalid-for-picture",
		width: "invalid-for-picture",
		height: "invalid-for-picture",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.attributes["id"], "picture")
	assertEquals(picture.attributes["src"], undefined)
	assertEquals(picture.attributes["alt"], undefined)
	assertEquals(picture.attributes["width"], undefined)
	assertEquals(picture.attributes["height"], undefined)
	assertEquals((picture.attributes as any).invalidAttr, undefined)
})

Deno.test("Picture should handle responsive image sources with img fallback", () => {
	const children = [
		{
			tag: "Source",
			attributes: { media: "(min-width: 800px)", srcset: "large.jpg" },
			children: [],
		},
		{
			tag: "Source",
			attributes: { media: "(min-width: 400px)", srcset: "medium.jpg" },
			children: [],
		},
		{
			tag: "Img",
			attributes: { src: "small.jpg", alt: "Responsive image" },
			children: [],
		},
	]
	const picture = Picture({ id: "hero-picture" })(children)

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children.length, 3)
	assertEquals((picture.children[0] as any).tag, "Source")
	assertEquals((picture.children[1] as any).tag, "Source")
	assertEquals((picture.children[2] as any).tag, "Img")
})

Deno.test("Picture should handle modern image format fallbacks", () => {
	const children = [
		{
			tag: "Source",
			attributes: { srcset: "image.avif", type: "image/avif" },
			children: [],
		},
		{
			tag: "Source",
			attributes: { srcset: "image.webp", type: "image/webp" },
			children: [],
		},
		{
			tag: "Img",
			attributes: { src: "image.jpg", alt: "Fallback image" },
			children: [],
		},
	]
	const picture = Picture({ class: "modern-image" })(children)

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children.length, 3)
	assertEquals((picture.children[0] as any).attributes.type, "image/avif")
	assertEquals((picture.children[1] as any).attributes.type, "image/webp")
	assertEquals((picture.children[2] as any).tag, "Img")
})

Deno.test("Picture should handle art direction use case", () => {
	const children = [
		{
			tag: "Source",
			attributes: { media: "(max-width: 600px)", srcset: "portrait.jpg" },
			children: [],
		},
		{
			tag: "Source",
			attributes: { media: "(min-width: 601px)", srcset: "landscape.jpg" },
			children: [],
		},
		{
			tag: "Img",
			attributes: { src: "default.jpg", alt: "Art directed image" },
			children: [],
		},
	]
	const picture = Picture({ id: "art-direction" })(children)

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children.length, 3)
})

Deno.test("Picture should handle high DPI displays", () => {
	const children = [
		{
			tag: "Source",
			attributes: {
				srcset: "image-2x.jpg 2x, image-1x.jpg 1x",
				media: "(min-width: 800px)",
			},
			children: [],
		},
		{
			tag: "Img",
			attributes: { src: "image-1x.jpg", alt: "High DPI image" },
			children: [],
		},
	]
	const picture = Picture({ class: "retina-image" })(children)

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children.length, 2)
})

Deno.test("Picture should handle ARIA attributes", () => {
	const picture = Picture({
		id: "accessible-picture",
		aria: {
			label: "Product showcase",
			describedby: "picture-description",
		},
	})([])

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.attributes["aria-label"], "Product showcase")
	assertEquals(picture.attributes["aria-describedby"], "picture-description")
})

Deno.test("Picture should handle only img element (no sources)", () => {
	const children = [
		{
			tag: "Img",
			attributes: { src: "simple.jpg", alt: "Simple image" },
			children: [],
		},
	]
	const picture = Picture({ id: "simple-picture" })(children)

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children.length, 1)
	assertEquals((picture.children[0] as any).tag, "Img")
})

Deno.test("Picture should handle empty children array", () => {
	const picture = Picture({ id: "empty-picture" })([])
	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children, [])
})

Deno.test("Picture should handle single child (not array)", () => {
	const img = {
		tag: "Img",
		attributes: { src: "single.jpg", alt: "Single image" },
		children: [],
	}
	const picture = Picture({ id: "single-child" })(img)

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children.length, 1)
	assertEquals((picture.children[0] as any).tag, "Img")
})

Deno.test("Picture should handle complex responsive scenario", () => {
	const children = [
		{
			tag: "Source",
			attributes: {
				srcset: "hero-desktop.avif 1x, hero-desktop-2x.avif 2x",
				type: "image/avif",
				media: "(min-width: 1200px)",
			},
			children: [],
		},
		{
			tag: "Source",
			attributes: {
				srcset: "hero-tablet.webp 1x, hero-tablet-2x.webp 2x",
				type: "image/webp",
				media: "(min-width: 768px)",
			},
			children: [],
		},
		{
			tag: "Source",
			attributes: {
				srcset: "hero-mobile.jpg 1x, hero-mobile-2x.jpg 2x",
				type: "image/jpeg",
			},
			children: [],
		},
		{
			tag: "Img",
			attributes: {
				src: "hero-fallback.jpg",
				alt: "Hero image with responsive sources",
				width: 800,
				height: 600,
			},
			children: [],
		},
	]
	const picture = Picture({
		id: "complex-responsive",
		class: "hero-picture",
		dataset: {
			component: "responsive-image",
		},
	} as any)(children)

	console.log(">>>>>>>>>> PICTURE", picture)

	assertEquals(picture.tag, "Picture")
	assertEquals(picture.children.length, 4)
	assertEquals(picture.attributes["id"], "complex-responsive")
	assertEquals(picture.attributes["class"], "hero-picture")
	assertEquals(picture.dataset, {
		component: "responsive-image",
	})
})
