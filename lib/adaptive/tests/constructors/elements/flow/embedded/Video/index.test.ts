import { assertEquals, assertExists } from "@std/assert"

import Video from "../../../../../../constructors/elements/flow/embedded/Video/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Video should create a basic video element with no attributes or children", () => {
	const video = Video()([])
	assertEquals(video.tag, "Video")
	assertEquals(video.children, [])
	assertExists(video.attributes)
})

Deno.test("Video should create a video element with valid attributes", () => {
	const video = Video({
		id: "main-video",
		src: "movie.mp4",
		controls: true,
		autoplay: false,
		loop: true,
		muted: false,
		width: 640,
		height: 480,
		poster: "poster.jpg",
		preload: "metadata",
	})([])

	assertEquals(video.tag, "Video")
	assertEquals(video.attributes["id"], "main-video")
	assertEquals(video.attributes["src"], "movie.mp4")
	assertEquals(video.attributes["controls"], true)
	assertEquals(video.attributes["autoplay"], false)
	assertEquals(video.attributes["loop"], true)
	assertEquals(video.attributes["muted"], false)
	assertEquals(video.attributes["width"], 640)
	assertEquals(video.attributes["height"], 480)
	assertEquals(video.attributes["poster"], "poster.jpg")
	assertEquals(video.attributes["preload"], "metadata")
})

Deno.test("Video should filter out invalid attributes", () => {
	const video = Video({
		id: "player",
		href: "invalid-for-video",
		alt: "invalid-for-video",
		accept: "invalid-for-video",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(video.tag, "Video")
	assertEquals(video.attributes["id"], "player")
	assertEquals(video.attributes["href"], undefined)
	assertEquals(video.attributes["alt"], undefined)
	assertEquals(video.attributes["accept"], undefined)
	assertEquals((video.attributes as any).invalidAttr, undefined)
})

Deno.test("Video should accept fallback content for unsupported browsers", () => {
	const fallback = TextNode("Your browser does not support the video tag.")
	const video = Video({ src: "video.mp4" })([fallback])

	assertEquals(video.tag, "Video")
	assertEquals(video.children.length, 1)
	assertEquals(video.children[0], fallback)
})

Deno.test("Video should handle crossorigin attribute", () => {
	const video = Video({
		src: "https://example.com/video.mp4",
		crossorigin: "anonymous",
	})([])

	assertEquals(video.tag, "Video")
	assertEquals(video.attributes["crossorigin"], "anonymous")
})

Deno.test("Video should handle playsinline attribute", () => {
	const video = Video({
		src: "mobile-video.mp4",
		playsinline: true,
	})([])

	assertEquals(video.tag, "Video")
	assertEquals(video.attributes["playsinline"], true)
})

Deno.test("Video should handle multiple source elements", () => {
	const children = [
		{
			tag: "Source",
			attributes: { src: "video.webm", type: "video/webm" },
			children: [],
		},
		{
			tag: "Source",
			attributes: { src: "video.mp4", type: "video/mp4" },
			children: [],
		},
		TextNode("Your browser does not support the video tag."),
	]
	const video = Video({ controls: true, width: 800, height: 600 })(children)

	assertEquals(video.tag, "Video")
	assertEquals(video.children.length, 3)
	assertEquals((video.children[0] as any).tag, "Source")
	assertEquals((video.children[1] as any).tag, "Source")
	assertEquals((video.children[2] as any).tag, "TextNode")
})

Deno.test("Video should handle special properties", () => {
	const video = Video({
		id: "tutorial-video",
		calculation: "videoCalculation",
		dataset: { duration: "300", quality: "hd" },
		display: "block",
		scripts: ["video-analytics.js"],
		stylesheets: ["video.css"],
	})([])

	assertEquals(video.tag, "Video")
	assertEquals((video as any).calculation, "videoCalculation")
	assertEquals((video as any).dataset, {
		duration: "300",
		quality: "hd",
	})
	assertEquals((video as any).display, "block")
	assertEquals((video as any).scripts, ["video-analytics.js"])
	assertEquals((video as any).stylesheets, ["video.css"])
})

Deno.test("Video should handle ARIA attributes", () => {
	const video = Video({
		id: "accessible-video",
		aria: {
			label: "Tutorial video",
			describedby: "video-description",
		},
	})([])

	assertEquals(video.tag, "Video")
	assertEquals(video.attributes["aria-label"], "Tutorial video")
	assertEquals(video.attributes["aria-describedby"], "video-description")
})

Deno.test("Video should handle boolean attributes correctly", () => {
	const video = Video({
		controls: true,
		autoplay: false,
		loop: true,
		muted: false,
		playsinline: true,
	})([])

	assertEquals(video.tag, "Video")
	assertEquals(video.attributes["controls"], true)
	assertEquals(video.attributes["autoplay"], false)
	assertEquals(video.attributes["loop"], true)
	assertEquals(video.attributes["muted"], false)
	assertEquals(video.attributes["playsinline"], true)
})

Deno.test("Video should handle preload attribute values", () => {
	const video1 = Video({ preload: "auto" })([])
	const video2 = Video({ preload: "metadata" })([])
	const video3 = Video({ preload: "none" })([])

	assertEquals(video1.attributes["preload"], "auto")
	assertEquals(video2.attributes["preload"], "metadata")
	assertEquals(video3.attributes["preload"], "none")
})

Deno.test("Video should handle single child (not array)", () => {
	const fallback = TextNode("Video not supported")
	const video = Video({ src: "test.mp4" })(fallback)

	assertEquals(video.tag, "Video")
	assertEquals(video.children.length, 1)
	assertEquals(video.children[0], fallback)
})
