import { assertEquals, assertExists } from "@std/assert"

import Fieldset from "../../../../../../constructors/elements/flow/forms/Fieldset/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Fieldset should create a basic fieldset element with no attributes or children", () => {
	const fieldset = Fieldset()([])
	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.children, [])
	assertExists(fieldset.attributes)
})

Deno.test("Fieldset should create a fieldset element with valid attributes", () => {
	const fieldset = Fieldset({
		id: "personal-info",
		name: "personal",
		disabled: false,
		form: "main-form",
	})([])

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.attributes["id"], "personal-info")
	assertEquals(fieldset.attributes["name"], "personal")
	assertEquals(fieldset.attributes["disabled"], false)
	assertEquals(fieldset.attributes["form"], "main-form")
})

Deno.test("Fieldset should filter out invalid attributes", () => {
	const fieldset = Fieldset({
		id: "info",
		href: "invalid-for-fieldset",
		src: "invalid-for-fieldset",
		alt: "invalid-for-fieldset",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.attributes["id"], "info")
	assertEquals(fieldset.attributes["href"], undefined)
	assertEquals(fieldset.attributes["src"], undefined)
	assertEquals(fieldset.attributes["alt"], undefined)
	assertEquals((fieldset.attributes as any).invalidAttr, undefined)
})

Deno.test("Fieldset should handle form controls as children", () => {
	const children = [
		{
			tag: "Legend",
			attributes: {},
			children: [TextNode("Personal Information")],
		},
		{
			tag: "Input",
			attributes: { type: "text", name: "firstName" },
			children: [],
		},
		{
			tag: "Input",
			attributes: { type: "text", name: "lastName" },
			children: [],
		},
	]
	const fieldset = Fieldset({ name: "personal" })(children)

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.children.length, 3)
	assertEquals((fieldset.children[0] as any).tag, "Legend")
	assertEquals((fieldset.children[1] as any).tag, "Input")
	assertEquals((fieldset.children[2] as any).tag, "Input")
})

Deno.test("Fieldset should handle disabled state", () => {
	const fieldset = Fieldset({
		name: "contact",
		disabled: true,
	})([])

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.attributes["disabled"], true)
})

Deno.test("Fieldset should handle form association", () => {
	const fieldset = Fieldset({
		name: "shipping",
		form: "checkout-form",
	})([])

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.attributes["form"], "checkout-form")
})

Deno.test("Fieldset should handle special properties", () => {
	const fieldset = Fieldset({
		id: "address-fieldset",
		name: "address",
		calculation: "fieldsetCalculation",
		dataset: { section: "shipping", required: "true" },
		display: "block",
		scripts: ["fieldset-validator.js"],
		stylesheets: ["fieldset.css"],
	})([])

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals((fieldset as any).calculation, "fieldsetCalculation")
	assertEquals((fieldset as any).dataset, {
		section: "shipping",
		required: "true",
	})
	assertEquals((fieldset as any).display, "block")
	assertEquals((fieldset as any).scripts, ["fieldset-validator.js"])
	assertEquals((fieldset as any).stylesheets, ["fieldset.css"])
})

Deno.test("Fieldset should handle ARIA attributes", () => {
	const fieldset = Fieldset({
		id: "accessible-fieldset",
		name: "user-info",
		aria: {
			label: "User information form",
			describedby: "fieldset-help",
		},
	})([])

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.attributes["aria-label"], "User information form")
	assertEquals(fieldset.attributes["aria-describedby"], "fieldset-help")
})

Deno.test("Fieldset should handle complex form structure", () => {
	const children = [
		{ tag: "Legend", attributes: {}, children: [TextNode("Contact Details")] },
		{
			tag: "Div",
			attributes: { class: "form-row" },
			children: [
				{
					tag: "Label",
					attributes: { for: "email" },
					children: [TextNode("Email")],
				},
				{
					tag: "Input",
					attributes: { type: "email", id: "email", name: "email" },
					children: [],
				},
			],
		},
		{
			tag: "Div",
			attributes: { class: "form-row" },
			children: [
				{
					tag: "Label",
					attributes: { for: "phone" },
					children: [TextNode("Phone")],
				},
				{
					tag: "Input",
					attributes: { type: "tel", id: "phone", name: "phone" },
					children: [],
				},
			],
		},
	]
	const fieldset = Fieldset({ name: "contact", class: "contact-fieldset" })(
		children,
	)

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.children.length, 3)
	assertEquals((fieldset.children[0] as any).tag, "Legend")
	assertEquals((fieldset.children[1] as any).tag, "Div")
	assertEquals((fieldset.children[2] as any).tag, "Div")
})

Deno.test("Fieldset should handle single child (not array)", () => {
	const legend = {
		tag: "Legend",
		attributes: {},
		children: [TextNode("Settings")],
	}
	const fieldset = Fieldset({ name: "settings" })(legend)

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.children.length, 1)
	assertEquals((fieldset.children[0] as any).tag, "Legend")
})

Deno.test("Fieldset should handle radio button groups", () => {
	const children = [
		{ tag: "Legend", attributes: {}, children: [TextNode("Choose your plan")] },
		{
			tag: "Input",
			attributes: { type: "radio", name: "plan", value: "basic", id: "basic" },
			children: [],
		},
		{
			tag: "Label",
			attributes: { for: "basic" },
			children: [TextNode("Basic Plan")],
		},
		{
			tag: "Input",
			attributes: {
				type: "radio",
				name: "plan",
				value: "premium",
				id: "premium",
			},
			children: [],
		},
		{
			tag: "Label",
			attributes: { for: "premium" },
			children: [TextNode("Premium Plan")],
		},
	]
	const fieldset = Fieldset({ name: "plan-selection" })(children)

	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.children.length, 5)
})

Deno.test("Fieldset should handle empty children array", () => {
	const fieldset = Fieldset({ id: "empty-fieldset", name: "empty" })([])
	assertEquals(fieldset.tag, "Fieldset")
	assertEquals(fieldset.children, [])
})
