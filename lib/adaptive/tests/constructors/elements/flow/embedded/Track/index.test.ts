import { assertEquals } from "@std/assert"

import Track from "../../../../../../constructors/elements/flow/embedded/Track/index.ts"

Deno.test("Track should create element with default attributes", () => {
	const track = Track({ src: "subtitles.vtt" })

	assertEquals(track.tag, "Track")
	assertEquals(track.children, [])
	assertEquals(track.attributes["src"], "subtitles.vtt")
})

Deno.test("Track should filter and validate track attributes", () => {
	const result = Track({
		src: "captions.vtt",
		kind: "captions",
		label: "English Captions",
		srcLang: "en",
		default: true,
	})

	assertEquals(result.attributes["src"], "captions.vtt")
	assertEquals(result.attributes["kind"], "captions")
	assertEquals(result.attributes["label"], "English Captions")
	assertEquals(result.attributes["srclang"], "en")
	assertEquals(result.attributes["default"], true)
})

Deno.test("Track should handle global attributes", () => {
	const result = Track({
		src: "chapters.vtt",
		id: "track-chapters",
		class: "video-track",
		title: "Chapter Track",
		tabindex: "0",
	})

	assertEquals(result.attributes["id"], "track-chapters")
	assertEquals(result.attributes["class"], "video-track")
	assertEquals(result.attributes["title"], "Chapter Track")
	assertEquals(result.attributes["tabindex"], "0")
})

Deno.test("Track should validate kind attribute values", () => {
	// Valid kind values
	const subtitles = Track({ src: "sub.vtt", kind: "subtitles" })
	assertEquals(subtitles.attributes["kind"], "subtitles")

	const captions = Track({ src: "cap.vtt", kind: "captions" })
	assertEquals(captions.attributes["kind"], "captions")

	const descriptions = Track({ src: "desc.vtt", kind: "descriptions" })
	assertEquals(descriptions.attributes["kind"], "descriptions")

	const chapters = Track({ src: "chap.vtt", kind: "chapters" })
	assertEquals(chapters.attributes["kind"], "chapters")

	const metadata = Track({ src: "meta.vtt", kind: "metadata" })
	assertEquals(metadata.attributes["kind"], "metadata")
})

Deno.test("Track should handle invalid attributes by filtering them out", () => {
	const result = Track({
		src: "test.vtt",
		invalidAttribute: "should-be-removed",
		onClick: "handler",
		kind: "invalid", // Invalid kind value should be filtered
	} as any)

	assertEquals(result.attributes["src"], "test.vtt")
	assertEquals(result.attributes["invalidAttribute"], undefined)
	assertEquals(result.attributes["onClick"], undefined)
	assertEquals(result.attributes["kind"], undefined) // Invalid kind filtered out
})

Deno.test("Track should support ARIA attributes", () => {
	const result = Track({
		src: "accessibility.vtt",
		aria: {
			label: "Video captions",
			hidden: "false",
		},
	})

	assertEquals(result.attributes["aria-label"], "Video captions")
	assertEquals(result.attributes["aria-hidden"], "false")
})

Deno.test("Track should handle special properties", () => {
	const result = Track({
		src: "special.vtt",
		calculation: "trackCalculation",
		dataset: { track: "special" },
		display: "trackDisplay",
		scripts: ["track.js"],
		stylesheets: ["track.css"],
		validation: "trackValidation",
	})

	assertEquals(result.calculation, "trackCalculation")
	assertEquals(result.dataset, { track: "special" })
	assertEquals(result.display, "trackDisplay")
	assertEquals(result.scripts, ["track.js"])
	assertEquals(result.stylesheets, ["track.css"])
	assertEquals(result.validation, "trackValidation")
})

Deno.test("Track should be void element with empty children", () => {
	const result = Track({ src: "void-test.vtt" })

	assertEquals(result.children, [])
	assertEquals(Array.isArray(result.children), true)
	assertEquals(result.children.length, 0)
})

Deno.test("Track should handle minimal configuration", () => {
	const result = Track({ src: "minimal.vtt" })

	assertEquals(result.tag, "Track")
	assertEquals(result.attributes["src"], "minimal.vtt")
	assertEquals(result.children, [])
})
