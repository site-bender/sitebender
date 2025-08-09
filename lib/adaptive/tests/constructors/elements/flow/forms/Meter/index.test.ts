import { assertEquals, assertExists } from "@std/assert"

import Meter from "../../../../../../constructors/elements/flow/forms/Meter/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Meter should create a basic meter element with no attributes or children", () => {
	const meter = Meter()([])
	assertEquals(meter.tag, "Meter")
	assertEquals(meter.children, [])
	assertExists(meter.attributes)
})

Deno.test("Meter should create a meter element with valid attributes", () => {
	const meter = Meter({
		id: "disk-usage",
		value: 6,
		min: 0,
		max: 10,
		low: 2,
		high: 8,
		optimum: 9,
		form: "settings-form",
	})([])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["id"], "disk-usage")
	assertEquals(meter.attributes["value"], 6)
	assertEquals(meter.attributes["min"], 0)
	assertEquals(meter.attributes["max"], 10)
	assertEquals(meter.attributes["low"], 2)
	assertEquals(meter.attributes["high"], 8)
	assertEquals(meter.attributes["optimum"], 9)
	assertEquals(meter.attributes["form"], "settings-form")
})

Deno.test("Meter should filter out invalid attributes", () => {
	const meter = Meter({
		id: "progress",
		href: "invalid-for-meter",
		src: "invalid-for-meter",
		alt: "invalid-for-meter",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["id"], "progress")
	assertEquals(meter.attributes["href"], undefined)
	assertEquals(meter.attributes["src"], undefined)
	assertEquals(meter.attributes["alt"], undefined)
	assertEquals((meter.attributes as any).invalidAttr, undefined)
})

Deno.test("Meter should handle disk usage measurement", () => {
	const meter = Meter({
		value: 75,
		min: 0,
		max: 100,
		low: 20,
		high: 80,
		optimum: 50,
	})([TextNode("75% used")])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["value"], 75)
	assertEquals(meter.attributes["min"], 0)
	assertEquals(meter.attributes["max"], 100)
	assertEquals(meter.children.length, 1)
	assertEquals((meter.children[0] as any).tag, "TextNode")
})

Deno.test("Meter should handle temperature measurement", () => {
	const meter = Meter({
		value: 25,
		min: -10,
		max: 40,
		low: 10,
		high: 30,
		optimum: 22,
	})([TextNode("25°C")])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["value"], 25)
	assertEquals(meter.attributes["min"], -10)
	assertEquals(meter.attributes["max"], 40)
})

Deno.test("Meter should handle score measurement", () => {
	const meter = Meter({
		value: 8.5,
		min: 0,
		max: 10,
		optimum: 10,
	})([TextNode("8.5 out of 10")])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["value"], 8.5)
	assertEquals(meter.attributes["optimum"], 10)
})

Deno.test("Meter should handle battery level", () => {
	const meter = Meter({
		value: 42,
		min: 0,
		max: 100,
		low: 20,
		high: 80,
		optimum: 90,
	})([TextNode("Battery: 42%")])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["value"], 42)
	assertEquals(meter.attributes["low"], 20)
	assertEquals(meter.attributes["high"], 80)
})

Deno.test("Meter should handle special properties", () => {
	const meter = Meter({
		id: "performance-meter",
		value: 85,
		max: 100,
		calculation: "meterCalculation",
		dataset: { metric: "performance", unit: "percent" },
		display: "inline-block",
		scripts: ["meter-visualizer.js"],
		stylesheets: ["meter.css"],
	})([])

	assertEquals(meter.tag, "Meter")
	assertEquals((meter as any).calculation, "meterCalculation")
	assertEquals((meter as any).dataset, {
		metric: "performance",
		unit: "percent",
	})
	assertEquals((meter as any).display, "inline-block")
	assertEquals((meter as any).scripts, ["meter-visualizer.js"])
	assertEquals((meter as any).stylesheets, ["meter.css"])
})

Deno.test("Meter should handle ARIA attributes", () => {
	const meter = Meter({
		id: "accessible-meter",
		value: 7,
		max: 10,
		aria: {
			label: "User rating",
			describedby: "meter-description",
		},
	})([])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["aria-label"], "User rating")
	assertEquals(meter.attributes["aria-describedby"], "meter-description")
})

Deno.test("Meter should handle fallback content", () => {
	const children = [
		TextNode("Score: "),
		{ tag: "Strong", attributes: {}, children: [TextNode("8/10")] },
	]
	const meter = Meter({ value: 8, max: 10 })(children)

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.children.length, 2)
	assertEquals((meter.children[0] as any).tag, "TextNode")
	assertEquals((meter.children[1] as any).tag, "Strong")
})

Deno.test("Meter should handle single child (not array)", () => {
	const text = TextNode("50%")
	const meter = Meter({ value: 50, max: 100 })(text)

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.children.length, 1)
	assertEquals(meter.children[0], text)
})

Deno.test("Meter should handle fractional values", () => {
	const meter = Meter({
		value: 3.7,
		min: 0,
		max: 5,
		optimum: 5,
	})([TextNode("3.7/5 stars")])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["value"], 3.7)
	assertEquals(meter.attributes["max"], 5)
})

Deno.test("Meter should handle missing min (defaults to 0)", () => {
	const meter = Meter({
		value: 60,
		max: 100,
	})([TextNode("60%")])

	assertEquals(meter.tag, "Meter")
	assertEquals(meter.attributes["value"], 60)
	assertEquals(meter.attributes["max"], 100)
	assertEquals(meter.attributes["min"], undefined)
})

Deno.test("Meter should handle empty children array", () => {
	const meter = Meter({ id: "empty-meter", value: 50, max: 100 })([])
	assertEquals(meter.tag, "Meter")
	assertEquals(meter.children, [])
})
