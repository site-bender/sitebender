import { assertEquals } from "@std/assert"

import Embed from "../../../../../../constructors/elements/flow/embedded/Embed/index.ts"

Deno.test("Embed should create a basic embed element with no attributes", () => {
	const embed = Embed({})
	assertEquals(embed.tag, "Embed")
	assertEquals(embed.children, undefined)
})

Deno.test("Embed should create an embed element with valid attributes", () => {
	const embed = Embed({
		id: "flash-content",
		src: "animation.swf",
		type: "application/x-shockwave-flash",
		width: 400,
		height: 300,
	})

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["id"], "flash-content")
	assertEquals(embed.attributes["src"], "animation.swf")
	assertEquals(embed.attributes["type"], "application/x-shockwave-flash")
	assertEquals(embed.attributes["width"], 400)
	assertEquals(embed.attributes["height"], 300)
})

Deno.test("Embed should filter out invalid attributes", () => {
	const embed = Embed({
		id: "plugin",
		href: "invalid-for-embed",
		controls: "invalid-for-embed",
		alt: "invalid-for-embed",
		invalidAttr: "should-be-filtered",
	} as any)

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["id"], "plugin")
	assertEquals(embed.attributes["href"], undefined)
	assertEquals(embed.attributes["controls"], undefined)
	assertEquals(embed.attributes["alt"], undefined)
	assertEquals((embed.attributes as any).invalidAttr, undefined)
})

Deno.test("Embed should handle PDF embedding", () => {
	const embed = Embed({
		src: "document.pdf",
		type: "application/pdf",
		width: 800,
		height: 600,
	})

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["src"], "document.pdf")
	assertEquals(embed.attributes["type"], "application/pdf")
	assertEquals(embed.attributes["width"], 800)
	assertEquals(embed.attributes["height"], 600)
})

Deno.test("Embed should handle missing dimensions", () => {
	const embed = Embed({
		src: "content.swf",
		type: "application/x-shockwave-flash",
	})

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["src"], "content.swf")
	assertEquals(embed.attributes["type"], "application/x-shockwave-flash")
	assertEquals(embed.attributes["width"], undefined)
	assertEquals(embed.attributes["height"], undefined)
})

Deno.test("Embed should handle ARIA attributes", () => {
	const embed = Embed({
		id: "accessible-embed",
		src: "interactive.swf",
		type: "application/x-shockwave-flash",
		aria: {
			label: "Interactive content",
			describedby: "embed-description",
		},
	})

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["aria-label"], "Interactive content")
	assertEquals(embed.attributes["aria-describedby"], "embed-description")
})

Deno.test("Embed should handle SVG embedding", () => {
	const embed = Embed({
		src: "diagram.svg",
		type: "image/svg+xml",
		width: 500,
		height: 400,
	})

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["src"], "diagram.svg")
	assertEquals(embed.attributes["type"], "image/svg+xml")
	assertEquals(embed.attributes["width"], 500)
	assertEquals(embed.attributes["height"], 400)
})

Deno.test("Embed should handle video embedding", () => {
	const embed = Embed({
		src: "video.mp4",
		type: "video/mp4",
		width: 640,
		height: 480,
	})

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["src"], "video.mp4")
	assertEquals(embed.attributes["type"], "video/mp4")
	assertEquals(embed.attributes["width"], 640)
	assertEquals(embed.attributes["height"], 480)
})

Deno.test("Embed should handle audio embedding", () => {
	const embed = Embed({
		src: "music.mp3",
		type: "audio/mpeg",
		width: 300,
		height: 50,
	})

	assertEquals(embed.tag, "Embed")
	assertEquals(embed.attributes["src"], "music.mp3")
	assertEquals(embed.attributes["type"], "audio/mpeg")
	assertEquals(embed.attributes["width"], 300)
	assertEquals(embed.attributes["height"], 50)
})
