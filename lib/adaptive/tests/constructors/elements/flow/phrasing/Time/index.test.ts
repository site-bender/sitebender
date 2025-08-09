import { assertEquals, assertExists } from "@std/assert"

import Time from "../../../../../../constructors/elements/flow/phrasing/Time/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Time should create a basic time with no attributes or children", () => {
	const time = Time()([])
	assertEquals(time.tag, "Time")
	assertEquals(time.children, [])
	assertExists(time.attributes)
})

Deno.test("Time should create a time with datetime attribute", () => {
	const time = Time({
		datetime: "2023-12-25T09:00:00Z",
		id: "christmas-time",
	})([])

	assertEquals(time.tag, "Time")
	assertEquals(time.attributes["datetime"], "2023-12-25T09:00:00Z")
	assertEquals(time.attributes["id"], "christmas-time")
})

Deno.test("Time should create a time with valid global attributes", () => {
	const time = Time({
		id: "event-time",
		class: "timestamp",
		title: "Event Time",
		lang: "en",
	})([])

	assertEquals(time.tag, "Time")
	assertEquals(time.attributes["id"], "event-time")
	assertEquals(time.attributes["class"], "timestamp")
	assertEquals(time.attributes["title"], "Event Time")
	assertEquals(time.attributes["lang"], "en")
})

Deno.test("Time should filter out invalid attributes", () => {
	const time = Time({
		datetime: "2023-12-25",
		href: "invalid-for-time",
		src: "invalid-for-time",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(time.tag, "Time")
	assertEquals(time.attributes["datetime"], "2023-12-25")
	assertEquals(time.attributes["href"], undefined)
	assertEquals(time.attributes["src"], undefined)
	assertEquals((time.attributes as any).invalidAttr, undefined)
})

Deno.test("Time should accept text content for time display", () => {
	const text = TextNode("December 25, 2023")
	const time = Time({ datetime: "2023-12-25" })([text])

	assertEquals(time.tag, "Time")
	assertEquals(time.children.length, 1)
	assertEquals(time.children[0], text)
})

Deno.test("Time should handle phrasing content children", () => {
	const children = [
		TextNode("Posted on "),
		{ tag: "Strong", attributes: {}, children: [TextNode("Christmas Day")] },
		TextNode(" at 9:00 AM"),
	]
	const time = Time({ datetime: "2023-12-25T09:00:00Z" })(children)

	assertEquals(time.tag, "Time")
	assertEquals(time.children.length, 3)
	assertEquals((time.children[0] as any).tag, "TextNode")
	assertEquals((time.children[1] as any).tag, "Strong")
	assertEquals((time.children[2] as any).tag, "TextNode")
})

Deno.test("Time should handle different datetime formats", () => {
	const formats = [
		"2023-12-25",
		"2023-12-25T09:00:00",
		"2023-12-25T09:00:00Z",
		"2023-12-25T09:00:00-05:00",
		"09:00:00",
		"P1D",
		"PT1H30M",
	]

	formats.forEach((datetime) => {
		const time = Time({ datetime })([TextNode("Test")])
		assertEquals(time.attributes["datetime"], datetime)
	})
})

Deno.test("Time should handle special properties", () => {
	const time = Time({
		datetime: "2023-12-25T09:00:00Z",
		calculation: "timeCalculation",
		dataset: { type: "event-time", timezone: "UTC" },
		display: "inline",
		scripts: ["time-formatter.js"],
		stylesheets: ["time.css"],
	})([])

	assertEquals(time.tag, "Time")
	assertEquals((time as any).calculation, "timeCalculation")
	assertEquals((time as any).dataset, { type: "event-time", timezone: "UTC" })
	assertEquals((time as any).display, "inline")
	assertEquals((time as any).scripts, ["time-formatter.js"])
	assertEquals((time as any).stylesheets, ["time.css"])
})

Deno.test("Time should handle ARIA attributes", () => {
	const time = Time({
		datetime: "2023-12-25T09:00:00Z",
		aria: {
			label: "Event timestamp",
			describedby: "timezone-info",
		},
	})([])

	assertEquals(time.tag, "Time")
	assertEquals(time.attributes["aria-label"], "Event timestamp")
	assertEquals(time.attributes["aria-describedby"], "timezone-info")
})

Deno.test("Time should handle duration format", () => {
	const duration = TextNode("1 hour 30 minutes")
	const time = Time({ datetime: "PT1H30M", class: "duration" })([duration])

	assertEquals(time.tag, "Time")
	assertEquals(time.children.length, 1)
	assertEquals(time.attributes["datetime"], "PT1H30M")
	assertEquals(time.attributes["class"], "duration")
})

Deno.test("Time should handle relative time without datetime", () => {
	const relativeTime = TextNode("3 hours ago")
	const time = Time({ class: "relative-time" })([relativeTime])

	assertEquals(time.tag, "Time")
	assertEquals(time.children.length, 1)
	assertEquals(time.attributes["class"], "relative-time")
	assertEquals(time.attributes["datetime"], undefined)
})
