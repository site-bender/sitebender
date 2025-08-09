import { assertEquals } from "@std/assert"

import Source from "../../../../../../constructors/elements/flow/embedded/Source/index.ts"

Deno.test("Source should create a basic source element with no attributes", () => {
	const source = Source({})
	assertEquals(source.tag, "Source")
	assertEquals(source.children, undefined)
})

Deno.test("Source should create a source element with valid attributes", () => {
	const source = Source({
		id: "video-source",
		src: "video.webm",
		type: "video/webm",
		media: "(min-width: 800px)",
		srcset: "video-480.webm 480w, video-800.webm 800w",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["id"], "video-source")
	assertEquals(source.attributes["src"], "video.webm")
	assertEquals(source.attributes["type"], "video/webm")
	assertEquals(source.attributes["media"], "(min-width: 800px)")
	assertEquals(
		source.attributes["srcset"],
		"video-480.webm 480w, video-800.webm 800w",
	)
})

Deno.test("Source should filter out invalid attributes", () => {
	const source = Source({
		id: "src",
		href: "invalid-for-source",
		controls: "invalid-for-source",
		alt: "invalid-for-source",
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["id"], "src")
	assertEquals(source.attributes["href"], undefined)
	assertEquals(source.attributes["controls"], undefined)
	assertEquals(source.attributes["alt"], undefined)
	assertEquals((source.attributes as any).invalidAttr, undefined)
})

Deno.test("Source should handle video sources", () => {
	const source = Source({
		src: "movie.mp4",
		type: "video/mp4",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["src"], "movie.mp4")
	assertEquals(source.attributes["type"], "video/mp4")
})

Deno.test("Source should handle audio sources", () => {
	const source = Source({
		src: "music.ogg",
		type: "audio/ogg",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["src"], "music.ogg")
	assertEquals(source.attributes["type"], "audio/ogg")
})

Deno.test("Source should handle responsive image sources", () => {
	const source = Source({
		media: "(max-width: 600px)",
		srcset: "small.jpg 1x, small-2x.jpg 2x",
		type: "image/jpeg",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["media"], "(max-width: 600px)")
	assertEquals(source.attributes["srcset"], "small.jpg 1x, small-2x.jpg 2x")
	assertEquals(source.attributes["type"], "image/jpeg")
})

Deno.test("Source should handle WebP image sources", () => {
	const source = Source({
		srcset: "image.webp",
		type: "image/webp",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["srcset"], "image.webp")
	assertEquals(source.attributes["type"], "image/webp")
})

Deno.test("Source should handle AVIF image sources", () => {
	const source = Source({
		srcset: "image.avif",
		type: "image/avif",
		media: "(min-width: 1200px)",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["srcset"], "image.avif")
	assertEquals(source.attributes["type"], "image/avif")
	assertEquals(source.attributes["media"], "(min-width: 1200px)")
})

Deno.test("Source should handle sizes attribute", () => {
	const source = Source({
		srcset: "image-480.jpg 480w, image-800.jpg 800w, image-1200.jpg 1200w",
		sizes: "(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px",
		type: "image/jpeg",
	})

	assertEquals(source.tag, "Source")
	assertEquals(
		source.attributes["sizes"],
		"(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px",
	)
})

Deno.test("Source should handle width and height attributes", () => {
	const source = Source({
		src: "poster.jpg",
		type: "image/jpeg",
		width: 800,
		height: 600,
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["width"], 800)
	assertEquals(source.attributes["height"], 600)
})

Deno.test("Source should handle ARIA attributes", () => {
	const source = Source({
		id: "accessible-source",
		src: "content.mp4",
		type: "video/mp4",
		aria: {
			label: "Video source",
			describedby: "source-description",
		},
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["aria-label"], "Video source")
	assertEquals(source.attributes["aria-describedby"], "source-description")
})

Deno.test("Source should handle missing type attribute", () => {
	const source = Source({
		src: "video.unknown",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["src"], "video.unknown")
	assertEquals(source.attributes["type"], undefined)
})

Deno.test("Source should handle modern video codecs", () => {
	const source = Source({
		src: "video.av1.webm",
		type: "video/webm; codecs=av01.0.01M.08",
	})

	assertEquals(source.tag, "Source")
	assertEquals(source.attributes["type"], "video/webm; codecs=av01.0.01M.08")
})
