import { assertEquals, assertExists } from "@std/assert"

import Obj from "../../../../../../constructors/elements/flow/embedded/Obj/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Obj should create a basic object element with no attributes or children", () => {
	const obj = Obj()([])
	assertEquals(obj.tag, "Object")
	assertEquals(obj.children, [])
	assertExists(obj.attributes)
})

Deno.test("Obj should create an object element with valid attributes", () => {
	const obj = Obj({
		id: "flash-object",
		data: "animation.swf",
		type: "application/x-shockwave-flash",
		width: 400,
		height: 300,
		form: "main-form",
		name: "flash-animation",
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["id"], "flash-object")
	assertEquals(obj.attributes["data"], "animation.swf")
	assertEquals(obj.attributes["type"], "application/x-shockwave-flash")
	assertEquals(obj.attributes["width"], 400)
	assertEquals(obj.attributes["height"], 300)
	assertEquals(obj.attributes["form"], "main-form")
	assertEquals(obj.attributes["name"], "flash-animation")
})

Deno.test("Obj should filter out invalid attributes", () => {
	const obj = Obj({
		id: "object",
		href: "invalid-for-object",
		src: "invalid-for-object",
		alt: "invalid-for-object",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["id"], "object")
	assertEquals(obj.attributes["href"], undefined)
	assertEquals(obj.attributes["src"], undefined)
	assertEquals(obj.attributes["alt"], undefined)
	assertEquals((obj.attributes as any).invalidAttr, undefined)
})

Deno.test("Obj should accept fallback content for unsupported objects", () => {
	const fallback = TextNode("Your browser does not support this content.")
	const obj = Obj({
		data: "content.swf",
		type: "application/x-shockwave-flash",
	})([fallback])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.children.length, 1)
	assertEquals(obj.children[0], fallback)
})

Deno.test("Obj should handle PDF embedding", () => {
	const obj = Obj({
		data: "document.pdf",
		type: "application/pdf",
		width: 800,
		height: 600,
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["data"], "document.pdf")
	assertEquals(obj.attributes["type"], "application/pdf")
	assertEquals(obj.attributes["width"], 800)
	assertEquals(obj.attributes["height"], 600)
})

Deno.test("Obj should handle Java applet embedding", () => {
	const obj = Obj({
		data: "applet.class",
		type: "application/java",
		width: 300,
		height: 200,
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["data"], "applet.class")
	assertEquals(obj.attributes["type"], "application/java")
})

Deno.test("Obj should handle complex fallback content with parameters", () => {
	const children = [
		{
			tag: "Param",
			attributes: { name: "movie", value: "animation.swf" },
			children: [],
		},
		{
			tag: "Param",
			attributes: { name: "quality", value: "high" },
			children: [],
		},
		{
			tag: "P",
			attributes: {},
			children: [TextNode("Flash content is not supported.")],
		},
	]
	const obj = Obj({
		type: "application/x-shockwave-flash",
		width: 500,
		height: 400,
	})(children)

	assertEquals(obj.tag, "Object")
	assertEquals(obj.children.length, 3)
	assertEquals((obj.children[0] as any).tag, "Param")
	assertEquals((obj.children[1] as any).tag, "Param")
	assertEquals((obj.children[2] as any).tag, "P")
})

Deno.test("Obj should handle form association", () => {
	const obj = Obj({
		data: "interactive.swf",
		type: "application/x-shockwave-flash",
		form: "user-form",
		name: "interactive-element",
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["form"], "user-form")
	assertEquals(obj.attributes["name"], "interactive-element")
})

Deno.test("Obj should handle special properties", () => {
	const obj = Obj({
		id: "media-object",
		data: "video.mp4",
		calculation: "objectCalculation",
		dataset: { format: "mp4", duration: "120" },
		display: "block",
		scripts: ["object-handler.js"],
		stylesheets: ["object.css"],
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals((obj as any).calculation, "objectCalculation")
	assertEquals((obj as any).dataset, {
		format: "mp4",
		duration: "120",
	})
	assertEquals((obj as any).display, "block")
	assertEquals((obj as any).scripts, ["object-handler.js"])
	assertEquals((obj as any).stylesheets, ["object.css"])
})

Deno.test("Obj should handle ARIA attributes", () => {
	const obj = Obj({
		id: "accessible-object",
		data: "interactive.swf",
		aria: {
			label: "Interactive content",
			describedby: "object-description",
		},
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["aria-label"], "Interactive content")
	assertEquals(obj.attributes["aria-describedby"], "object-description")
})

Deno.test("Obj should handle missing data attribute", () => {
	const obj = Obj({
		type: "application/x-shockwave-flash",
		width: 400,
		height: 300,
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["data"], undefined)
	assertEquals(obj.attributes["type"], "application/x-shockwave-flash")
})

Deno.test("Obj should handle single child (not array)", () => {
	const fallback = TextNode("Object not supported")
	const obj = Obj({ data: "content.swf" })(fallback)

	assertEquals(obj.tag, "Object")
	assertEquals(obj.children.length, 1)
	assertEquals(obj.children[0], fallback)
})

Deno.test("Obj should handle SVG embedding", () => {
	const obj = Obj({
		data: "diagram.svg",
		type: "image/svg+xml",
		width: 500,
		height: 400,
	})([])

	assertEquals(obj.tag, "Object")
	assertEquals(obj.attributes["data"], "diagram.svg")
	assertEquals(obj.attributes["type"], "image/svg+xml")
})
