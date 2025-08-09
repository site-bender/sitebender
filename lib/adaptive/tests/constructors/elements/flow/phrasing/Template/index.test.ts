import { assertEquals, assertExists } from "@std/assert"

import Template from "../../../../../../constructors/elements/flow/phrasing/Template/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Template should create a basic template with no attributes or children", () => {
	const template = Template()([])
	assertEquals(template.tag, "Template")
	assertEquals(template.children, [])
	assertExists(template.attributes)
})

Deno.test("Template should create a template with shadowrootmode attribute", () => {
	const template = Template({
		shadowrootmode: "open",
		id: "web-component-template",
	})([])

	assertEquals(template.tag, "Template")
	assertEquals(template.attributes["shadowrootmode"], "open")
	assertEquals(template.attributes["id"], "web-component-template")
})

Deno.test("Template should handle different shadowrootmode values", () => {
	const modes = ["open", "closed"]

	modes.forEach((mode) => {
		const template = Template({ shadowrootmode: mode })([])
		assertEquals(template.attributes["shadowrootmode"], mode)
	})
})

Deno.test("Template should create a template with shadowrootdelegatesfocus attribute", () => {
	const template = Template({
		shadowrootmode: "open",
		shadowrootdelegatesfocus: true,
	})([])

	assertEquals(template.tag, "Template")
	assertEquals(template.attributes["shadowrootdelegatesfocus"], true)
})

Deno.test("Template should create a template with valid global attributes", () => {
	const template = Template({
		id: "component-template",
		class: "template-container",
		title: "Component Template",
		lang: "en",
	})([])

	assertEquals(template.tag, "Template")
	assertEquals(template.attributes["id"], "component-template")
	assertEquals(template.attributes["class"], "template-container")
	assertEquals(template.attributes["title"], "Component Template")
	assertEquals(template.attributes["lang"], "en")
})

Deno.test("Template should filter out invalid attributes", () => {
	const template = Template({
		shadowrootmode: "open",
		href: "invalid-for-template",
		src: "invalid-for-template",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(template.tag, "Template")
	assertEquals(template.attributes["shadowrootmode"], "open")
	assertEquals(template.attributes["href"], undefined)
	assertEquals(template.attributes["src"], undefined)
	assertEquals((template.attributes as any).invalidAttr, undefined)
})

Deno.test("Template should accept template content", () => {
	const content = [
		{
			tag: "Div",
			attributes: { class: "component" },
			children: [TextNode("Template content")],
		},
	]
	const template = Template({ shadowrootmode: "open" })(content)

	assertEquals(template.tag, "Template")
	assertEquals(template.children.length, 1)
	assertEquals((template.children[0] as any).tag, "Div")
})

Deno.test("Template should handle complex template structure", () => {
	const children = [
		{
			tag: "Style",
			attributes: {},
			children: [TextNode(".component { color: red; }")],
		},
		{
			tag: "Div",
			attributes: { class: "component" },
			children: [
				{ tag: "H1", attributes: {}, children: [TextNode("Component Title")] },
				{ tag: "P", attributes: {}, children: [TextNode("Component content")] },
			],
		},
	]
	const template = Template({ shadowrootmode: "open" })(children)

	assertEquals(template.tag, "Template")
	assertEquals(template.children.length, 2)
	assertEquals((template.children[0] as any).tag, "Style")
	assertEquals((template.children[1] as any).tag, "Div")
})

Deno.test("Template should handle single child (not array)", () => {
	const content = {
		tag: "Div",
		attributes: {},
		children: [TextNode("Single content")],
	}
	const template = Template({ shadowrootmode: "open" })(content)

	assertEquals(template.tag, "Template")
	assertEquals(template.children.length, 1)
	assertEquals((template.children[0] as any).tag, "Div")
})

Deno.test("Template should handle special properties", () => {
	const template = Template({
		shadowrootmode: "open",
		calculation: "templateCalculation",
		dataset: { type: "web-component", framework: "vanilla" },
		display: "none",
		scripts: ["template-handler.js"],
		stylesheets: ["template.css"],
	})([])

	assertEquals(template.tag, "Template")
	assertEquals((template as any).calculation, "templateCalculation")
	assertEquals((template as any).dataset, {
		type: "web-component",
		framework: "vanilla",
	})
	assertEquals((template as any).display, "none")
	assertEquals((template as any).scripts, ["template-handler.js"])
	assertEquals((template as any).stylesheets, ["template.css"])
})

Deno.test("Template should handle ARIA attributes", () => {
	const template = Template({
		shadowrootmode: "open",
		aria: {
			label: "Component template",
			describedby: "template-description",
		},
	})([])

	assertEquals(template.tag, "Template")
	assertEquals(template.attributes["aria-label"], "Component template")
	assertEquals(template.attributes["aria-describedby"], "template-description")
})

Deno.test("Template should handle shadow DOM configuration", () => {
	const template = Template({
		shadowrootmode: "closed",
		shadowrootdelegatesfocus: true,
		class: "shadow-template",
	})([
		{
			tag: "Style",
			attributes: {},
			children: [TextNode(":host { display: block; }")],
		},
		{ tag: "Slot", attributes: {}, children: [] },
	])

	assertEquals(template.tag, "Template")
	assertEquals(template.attributes["shadowrootmode"], "closed")
	assertEquals(template.attributes["shadowrootdelegatesfocus"], true)
	assertEquals(template.attributes["class"], "shadow-template")
	assertEquals(template.children.length, 2)
})

Deno.test("Template should handle empty children array", () => {
	const template = Template({ shadowrootmode: "open" })([])
	assertEquals(template.tag, "Template")
	assertEquals(template.children, [])
})
