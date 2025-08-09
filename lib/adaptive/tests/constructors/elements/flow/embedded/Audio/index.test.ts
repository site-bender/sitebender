import { assertEquals, assertExists } from "@std/assert"

import Audio from "../../../../../../constructors/elements/flow/embedded/Audio/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Audio should create a basic audio element with no attributes or children", () => {
	const audio = Audio()([])
	assertEquals(audio.tag, "Audio")
	assertEquals(audio.children, [])
	assertExists(audio.attributes)
})

Deno.test("Audio should create an audio element with valid attributes", () => {
	const audio = Audio({
		id: "background-music",
		src: "music.mp3",
		controls: true,
		autoplay: false,
		loop: true,
		muted: false,
		preload: "metadata",
	})([])

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.attributes["id"], "background-music")
	assertEquals(audio.attributes["src"], "music.mp3")
	assertEquals(audio.attributes["controls"], true)
	assertEquals(audio.attributes["autoplay"], false)
	assertEquals(audio.attributes["loop"], true)
	assertEquals(audio.attributes["muted"], false)
	assertEquals(audio.attributes["preload"], "metadata")
})

Deno.test("Audio should filter out invalid attributes", () => {
	const audio = Audio({
		id: "player",
		href: "invalid-for-audio",
		width: "invalid-for-audio",
		height: "invalid-for-audio",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.attributes["id"], "player")
	assertEquals(audio.attributes["href"], undefined)
	assertEquals(audio.attributes["width"], undefined)
	assertEquals(audio.attributes["height"], undefined)
	assertEquals((audio.attributes as any).invalidAttr, undefined)
})

Deno.test("Audio should accept fallback content for unsupported browsers", () => {
	const fallback = TextNode("Your browser does not support the audio element.")
	const audio = Audio({ src: "audio.mp3" })([fallback])

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.children.length, 1)
	assertEquals(audio.children[0], fallback)
})

Deno.test("Audio should handle crossorigin attribute", () => {
	const audio = Audio({
		src: "https://example.com/audio.mp3",
		crossorigin: "anonymous",
	})([])

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.attributes["crossorigin"], "anonymous")
})

Deno.test("Audio should handle multiple source elements", () => {
	const children = [
		{
			tag: "Source",
			attributes: { src: "audio.ogg", type: "audio/ogg" },
			children: [],
		},
		{
			tag: "Source",
			attributes: { src: "audio.mp3", type: "audio/mpeg" },
			children: [],
		},
		TextNode("Your browser does not support the audio element."),
	]
	const audio = Audio({ controls: true })(children)

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.children.length, 3)
	assertEquals((audio.children[0] as any).tag, "Source")
	assertEquals((audio.children[1] as any).tag, "Source")
	assertEquals((audio.children[2] as any).tag, "TextNode")
})

Deno.test("Audio should handle special properties", () => {
	const audio = Audio({
		id: "music-player",
		calculation: "audioCalculation",
		dataset: { duration: "180", genre: "classical" },
		display: "block",
		scripts: ["audio-controls.js"],
		stylesheets: ["audio.css"],
	})([])

	assertEquals(audio.tag, "Audio")
	assertEquals((audio as any).calculation, "audioCalculation")
	assertEquals((audio as any).dataset, {
		duration: "180",
		genre: "classical",
	})
	assertEquals((audio as any).display, "block")
	assertEquals((audio as any).scripts, ["audio-controls.js"])
	assertEquals((audio as any).stylesheets, ["audio.css"])
})

Deno.test("Audio should handle ARIA attributes", () => {
	const audio = Audio({
		id: "accessible-audio",
		aria: {
			label: "Background music",
			describedby: "audio-description",
		},
	})([])

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.attributes["aria-label"], "Background music")
	assertEquals(audio.attributes["aria-describedby"], "audio-description")
})

Deno.test("Audio should handle boolean attributes correctly", () => {
	const audio = Audio({
		controls: true,
		autoplay: false,
		loop: true,
		muted: false,
	})([])

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.attributes["controls"], true)
	assertEquals(audio.attributes["autoplay"], false)
	assertEquals(audio.attributes["loop"], true)
	assertEquals(audio.attributes["muted"], false)
})

Deno.test("Audio should handle preload attribute values", () => {
	const audio1 = Audio({ preload: "auto" })([])
	const audio2 = Audio({ preload: "metadata" })([])
	const audio3 = Audio({ preload: "none" })([])

	assertEquals(audio1.attributes["preload"], "auto")
	assertEquals(audio2.attributes["preload"], "metadata")
	assertEquals(audio3.attributes["preload"], "none")
})

Deno.test("Audio should handle single child (not array)", () => {
	const fallback = TextNode("Audio not supported")
	const audio = Audio({ src: "test.mp3" })(fallback)

	assertEquals(audio.tag, "Audio")
	assertEquals(audio.children.length, 1)
	assertEquals(audio.children[0], fallback)
})
