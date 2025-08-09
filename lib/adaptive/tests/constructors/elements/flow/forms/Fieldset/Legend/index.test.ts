import { assertEquals, assertExists } from "@std/assert"

import Legend from "../../../../../../../constructors/elements/flow/forms/Fieldset/Legend/index.ts"
import TextNode from "../../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Legend should create a basic legend element with no attributes or children", () => {
	const legend = Legend()([])
	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children, [])
	assertExists(legend.attributes)
})

Deno.test("Legend should create a legend element with valid global attributes", () => {
	const legend = Legend({
		id: "form-legend",
		class: "fieldset-title",
		title: "Form section title",
	})([])

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.attributes["id"], "form-legend")
	assertEquals(legend.attributes["class"], "fieldset-title")
	assertEquals(legend.attributes["title"], "Form section title")
})

Deno.test("Legend should filter out non-global attributes", () => {
	const legend = Legend({
		id: "legend",
		src: "invalid-for-legend",
		href: "invalid-for-legend",
		alt: "invalid-for-legend",
		name: "invalid-for-legend",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.attributes["id"], "legend")
	assertEquals(legend.attributes["src"], undefined)
	assertEquals(legend.attributes["href"], undefined)
	assertEquals(legend.attributes["alt"], undefined)
	assertEquals(legend.attributes["name"], undefined)
	assertEquals((legend.attributes as any).invalidAttr, undefined)
})

Deno.test("Legend should accept text content", () => {
	const text = TextNode("Personal Information")
	const legend = Legend({ id: "personal-legend" })([text])

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 1)
	assertEquals(legend.children[0], text)
})

Deno.test("Legend should handle phrasing content", () => {
	const children = [
		{ tag: "Strong", attributes: {}, children: [TextNode("Required")] },
		TextNode(" Personal Information"),
	]
	const legend = Legend({ class: "required-legend" })(children)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 2)
	assertEquals((legend.children[0] as any).tag, "Strong")
	assertEquals((legend.children[1] as any).tag, "TextNode")
})

Deno.test("Legend should handle heading content", () => {
	const children = [
		{ tag: "H3", attributes: {}, children: [TextNode("Contact Details")] },
	]
	const legend = Legend({ id: "contact-legend" })(children)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 1)
	assertEquals((legend.children[0] as any).tag, "H3")
})

Deno.test("Legend should handle complex phrasing content", () => {
	const children = [
		{ tag: "Em", attributes: {}, children: [TextNode("Step 1:")] },
		TextNode(" "),
		{
			tag: "Strong",
			attributes: {},
			children: [TextNode("Basic Information")],
		},
		TextNode(" "),
		{ tag: "Small", attributes: {}, children: [TextNode("(required)")] },
	]
	const legend = Legend({ class: "step-legend" })(children)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 5)
	assertEquals((legend.children[0] as any).tag, "Em")
	assertEquals((legend.children[2] as any).tag, "Strong")
	assertEquals((legend.children[4] as any).tag, "Small")
})

Deno.test("Legend should handle ARIA attributes", () => {
	const legend = Legend({
		id: "accessible-legend",
		aria: {
			label: "Form section",
			describedby: "legend-help",
		},
	})([])

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.attributes["aria-label"], "Form section")
	assertEquals(legend.attributes["aria-describedby"], "legend-help")
})

Deno.test("Legend should handle icons and formatted text", () => {
	const children = [
		{ tag: "Span", attributes: { class: "icon icon-user" }, children: [] },
		TextNode(" User Account Settings"),
	]
	const legend = Legend({ class: "icon-legend" })(children)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 2)
	assertEquals((legend.children[0] as any).tag, "Span")
	assertEquals((legend.children[1] as any).tag, "TextNode")
})

Deno.test("Legend should handle links within text", () => {
	const children = [
		TextNode("Payment Information "),
		{
			tag: "A",
			attributes: { href: "#help" },
			children: [TextNode("(Need help?)")],
		},
	]
	const legend = Legend({ id: "payment-legend" })(children)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 2)
	assertEquals((legend.children[0] as any).tag, "TextNode")
	assertEquals((legend.children[1] as any).tag, "A")
})

Deno.test("Legend should handle single child (not array)", () => {
	const text = TextNode("Settings")
	const legend = Legend({ id: "settings-legend" })(text)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 1)
	assertEquals(legend.children[0], text)
})

Deno.test("Legend should handle code elements", () => {
	const children = [
		TextNode("API Configuration for "),
		{ tag: "Code", attributes: {}, children: [TextNode("config.json")] },
	]
	const legend = Legend({ class: "code-legend" })(children)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 2)
	assertEquals((legend.children[1] as any).tag, "Code")
})

Deno.test("Legend should handle definition terms", () => {
	const children = [
		{ tag: "Dfn", attributes: {}, children: [TextNode("Personal Data")] },
		TextNode(" Collection"),
	]
	const legend = Legend({ id: "definition-legend" })(children)

	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children.length, 2)
	assertEquals((legend.children[0] as any).tag, "Dfn")
})

Deno.test("Legend should handle empty children array", () => {
	const legend = Legend({ id: "empty-legend" })([])
	assertEquals(legend.tag, "Legend")
	assertEquals(legend.children, [])
})
