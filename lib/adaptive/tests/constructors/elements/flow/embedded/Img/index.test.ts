import { assertEquals } from "@std/assert"

import Img from "../../../../../../constructors/elements/flow/embedded/Img/index.ts"

Deno.test("Img should create a basic img element with no attributes", () => {
	const img = Img({})
	assertEquals(img.tag, "Img")
	assertEquals(img.children, undefined)
})

Deno.test("Img should create an img element with valid attributes", () => {
	const img = Img({
		id: "hero-image",
		src: "hero.jpg",
		alt: "Hero image",
		width: 800,
		height: 400,
		loading: "lazy",
		decoding: "async",
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["id"], "hero-image")
	assertEquals(img.attributes["src"], "hero.jpg")
	assertEquals(img.attributes["alt"], "Hero image")
	assertEquals(img.attributes["width"], 800)
	assertEquals(img.attributes["height"], 400)
	assertEquals(img.attributes["loading"], "lazy")
	assertEquals(img.attributes["decoding"], "async")
})

Deno.test("Img should filter out invalid attributes", () => {
	const img = Img({
		id: "photo",
		href: "invalid-for-img",
		controls: "invalid-for-img",
		autoplay: "invalid-for-img",
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["id"], "photo")
	assertEquals(img.attributes["href"], undefined)
	assertEquals(img.attributes["controls"], undefined)
	assertEquals(img.attributes["autoplay"], undefined)
	assertEquals((img.attributes as any).invalidAttr, undefined)
})

Deno.test("Img should handle crossorigin attribute", () => {
	const img = Img({
		src: "https://example.com/image.jpg",
		alt: "External image",
		crossorigin: "anonymous",
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["crossorigin"], "anonymous")
})

Deno.test("Img should handle ismap attribute", () => {
	const img = Img({
		src: "map.png",
		alt: "Image map",
		ismap: true,
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["ismap"], true)
})

Deno.test("Img should handle usemap attribute", () => {
	const img = Img({
		src: "interactive.jpg",
		alt: "Interactive image",
		usemap: "#imagemap",
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["usemap"], "#imagemap")
})

Deno.test("Img should handle srcset and sizes attributes", () => {
	const img = Img({
		src: "image.jpg",
		alt: "Responsive image",
		srcset: "image-480w.jpg 480w, image-800w.jpg 800w",
		sizes: "(max-width: 600px) 480px, 800px",
	})

	assertEquals(img.tag, "Img")
	assertEquals(
		img.attributes["srcset"],
		"image-480w.jpg 480w, image-800w.jpg 800w",
	)
	assertEquals(img.attributes["sizes"], "(max-width: 600px) 480px, 800px")
})

Deno.test("Img should handle fetchpriority attribute", () => {
	const img = Img({
		src: "priority.jpg",
		alt: "High priority image",
		fetchpriority: "high",
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["fetchpriority"], "high")
})

Deno.test("Img should handle referrerpolicy attribute", () => {
	const img = Img({
		src: "secure.jpg",
		alt: "Secure image",
		referrerpolicy: "no-referrer",
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["referrerpolicy"], "no-referrer")
})

Deno.test("Img should handle longdesc attribute", () => {
	const img = Img({
		src: "chart.png",
		alt: "Sales chart",
		longdesc: "chart-description.html",
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["longdesc"], "chart-description.html")
})

Deno.test("Img should handle ARIA attributes", () => {
	const img = Img({
		id: "accessible-img",
		src: "diagram.svg",
		alt: "Process diagram",
		aria: {
			describedby: "diagram-description",
			hidden: "false",
		},
	})

	assertEquals(img.tag, "Img")
	assertEquals(img.attributes["aria-describedby"], "diagram-description")
	assertEquals(img.attributes["aria-hidden"], "false")
})

Deno.test("Img should handle loading attribute values", () => {
	const img1 = Img({ src: "image1.jpg", alt: "Image 1", loading: "eager" })
	const img2 = Img({ src: "image2.jpg", alt: "Image 2", loading: "lazy" })

	assertEquals(img1.attributes["loading"], "eager")
	assertEquals(img2.attributes["loading"], "lazy")
})

Deno.test("Img should handle decoding attribute values", () => {
	const img1 = Img({ src: "image1.jpg", alt: "Image 1", decoding: "sync" })
	const img2 = Img({ src: "image2.jpg", alt: "Image 2", decoding: "async" })
	const img3 = Img({ src: "image3.jpg", alt: "Image 3", decoding: "auto" })

	assertEquals(img1.attributes["decoding"], "sync")
	assertEquals(img2.attributes["decoding"], "async")
	assertEquals(img3.attributes["decoding"], "auto")
})
