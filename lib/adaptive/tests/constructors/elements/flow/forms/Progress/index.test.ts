import { assertEquals, assertExists } from "@std/assert"

import Progress from "../../../../../../constructors/elements/flow/forms/Progress/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Progress should create a basic progress element with no attributes or children", () => {
	const progress = Progress()([])
	assertEquals(progress.tag, "Progress")
	assertEquals(progress.children, [])
	assertExists(progress.attributes)
})

Deno.test("Progress should create a progress element with valid attributes", () => {
	const progress = Progress({
		id: "file-upload",
		value: 70,
		max: 100,
	})([])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["id"], "file-upload")
	assertEquals(progress.attributes["value"], 70)
	assertEquals(progress.attributes["max"], 100)
})

Deno.test("Progress should filter out invalid attributes", () => {
	const progress = Progress({
		id: "progress",
		href: "invalid-for-progress",
		src: "invalid-for-progress",
		alt: "invalid-for-progress",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["id"], "progress")
	assertEquals(progress.attributes["href"], undefined)
	assertEquals(progress.attributes["src"], undefined)
	assertEquals(progress.attributes["alt"], undefined)
	assertEquals((progress.attributes as any).invalidAttr, undefined)
})

Deno.test("Progress should handle file upload progress", () => {
	const progress = Progress({
		value: 45,
		max: 100,
	})([TextNode("45% uploaded")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 45)
	assertEquals(progress.attributes["max"], 100)
	assertEquals(progress.children.length, 1)
	assertEquals((progress.children[0] as any).tag, "TextNode")
})

Deno.test("Progress should handle form completion progress", () => {
	const progress = Progress({
		value: 3,
		max: 5,
	})([TextNode("Step 3 of 5")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 3)
	assertEquals(progress.attributes["max"], 5)
})

Deno.test("Progress should handle indeterminate progress (no value)", () => {
	const progress = Progress({
		max: 100,
	})([TextNode("Processing...")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], undefined)
	assertEquals(progress.attributes["max"], 100)
})

Deno.test("Progress should handle download progress", () => {
	const progress = Progress({
		value: 256,
		max: 512,
	})([TextNode("256 MB of 512 MB downloaded")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 256)
	assertEquals(progress.attributes["max"], 512)
})

Deno.test("Progress should handle task completion", () => {
	const children = [
		{ tag: "Strong", attributes: {}, children: [TextNode("8")] },
		TextNode(" of "),
		{ tag: "Strong", attributes: {}, children: [TextNode("10")] },
		TextNode(" tasks completed"),
	]
	const progress = Progress({ value: 8, max: 10 })(children)

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.children.length, 4)
	assertEquals((progress.children[0] as any).tag, "Strong")
	assertEquals((progress.children[2] as any).tag, "Strong")
})

Deno.test("Progress should handle loading states", () => {
	const progress = Progress()([
		TextNode("Loading..."),
	])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], undefined)
	assertEquals(progress.attributes["max"], undefined)
})

Deno.test("Progress should handle special properties", () => {
	const progress = Progress({
		id: "sync-progress",
		value: 75,
		max: 100,
		calculation: "progressCalculation",
		dataset: { task: "synchronization", eta: "30s" },
		display: "block",
		scripts: ["progress-tracker.js"],
		stylesheets: ["progress.css"],
	})([])

	assertEquals(progress.tag, "Progress")
	assertEquals((progress as any).calculation, "progressCalculation")
	assertEquals((progress as any).dataset, {
		task: "synchronization",
		eta: "30s",
	})
	assertEquals((progress as any).display, "block")
	assertEquals((progress as any).scripts, ["progress-tracker.js"])
	assertEquals((progress as any).stylesheets, ["progress.css"])
})

Deno.test("Progress should handle ARIA attributes", () => {
	const progress = Progress({
		id: "accessible-progress",
		value: 60,
		max: 100,
		aria: {
			label: "File upload progress",
			describedby: "progress-description",
		},
	})([])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["aria-label"], "File upload progress")
	assertEquals(progress.attributes["aria-describedby"], "progress-description")
})

Deno.test("Progress should handle fractional values", () => {
	const progress = Progress({
		value: 33.5,
		max: 100,
	})([TextNode("33.5%")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 33.5)
	assertEquals(progress.attributes["max"], 100)
})

Deno.test("Progress should handle installation progress", () => {
	const children = [
		TextNode("Installing package "),
		{ tag: "Code", attributes: {}, children: [TextNode("@types/node")] },
		TextNode("..."),
	]
	const progress = Progress({ value: 2, max: 5 })(children)

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.children.length, 3)
	assertEquals((progress.children[1] as any).tag, "Code")
})

Deno.test("Progress should handle single child (not array)", () => {
	const text = TextNode("50%")
	const progress = Progress({ value: 50, max: 100 })(text)

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.children.length, 1)
	assertEquals(progress.children[0], text)
})

Deno.test("Progress should handle time-based progress", () => {
	const progress = Progress({
		value: 120,
		max: 300,
	})([TextNode("2:00 of 5:00")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 120)
	assertEquals(progress.attributes["max"], 300)
})

Deno.test("Progress should handle missing max (no max bound)", () => {
	const progress = Progress({
		value: 42,
	})([TextNode("42 items processed")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 42)
	assertEquals(progress.attributes["max"], undefined)
})

Deno.test("Progress should handle zero value", () => {
	const progress = Progress({
		value: 0,
		max: 100,
	})([TextNode("Starting...")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 0)
	assertEquals(progress.attributes["max"], 100)
})

Deno.test("Progress should handle completion (value equals max)", () => {
	const progress = Progress({
		value: 100,
		max: 100,
	})([TextNode("Complete!")])

	assertEquals(progress.tag, "Progress")
	assertEquals(progress.attributes["value"], 100)
	assertEquals(progress.attributes["max"], 100)
})

Deno.test("Progress should handle empty children array", () => {
	const progress = Progress({ id: "empty-progress", value: 50, max: 100 })([])
	assertEquals(progress.tag, "Progress")
	assertEquals(progress.children, [])
})
