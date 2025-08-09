import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import FilteredAllowText from "../../../../constructors/abstracted/FilteredAllowText/index.ts"

Deno.test("FilteredAllowText should create element with default tag Img and identity filter", () => {
	const createImg = FilteredAllowText()()()
	const result = createImg([])

	assertEquals(result.tag, "Img")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
	assertEquals(Array.isArray(result.children), true)
	assertEquals(result.children.length, 0)
})

Deno.test("FilteredAllowText should create element with custom tag", () => {
	const createButton = FilteredAllowText("Button")()()
	const result = createButton([])

	assertEquals(result.tag, "Button")
	assertEquals(typeof result.attributes, "object")
	assertExists(result.attributes["id"])
})

Deno.test("FilteredAllowText should handle array of children", () => {
	const createButton = FilteredAllowText("Button")()({ id: "test-id" })
	const result = createButton([
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.tag, "Button")
})

Deno.test("FilteredAllowText should handle single child (not array)", () => {
	const createButton = FilteredAllowText("Button")()({ id: "test-id" })
	const result = createButton({
		content: "This is the content.",
		tag: "TextNode",
	})

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.tag, "Button")
})

Deno.test("FilteredAllowText should convert plain text to TextNode", () => {
	const createButton = FilteredAllowText("Button")()({ id: "test-id" })
	const result = createButton("This is the content.")

	assertEquals(result.attributes["id"], "test-id")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.tag, "Button")
})

Deno.test("FilteredAllowText should apply custom attribute filter function", () => {
	// Filter that only allows button-specific attributes
	const filterButtonAttribs = (attrs: any) => {
		const { type, disabled, form, name, value, id, ...rest } = attrs
		const result: any = { id }
		if (type === "button" || type === "submit" || type === "reset") {
			result.type = type
		}
		if (typeof disabled === "boolean") {
			result.disabled = disabled
		}
		if (typeof form === "string") {
			result.form = form
		}
		if (typeof name === "string") {
			result.name = name
		}
		if (typeof value === "string") {
			result.value = value
		}
		return result
	}

	const createButton = FilteredAllowText("Button")(filterButtonAttribs)({
		id: "btn-id",
		type: "submit",
		disabled: true,
		form: "myForm",
		class: "should-be-filtered",
		onclick: "should-be-filtered",
	})
	const result = createButton("Submit")

	assertEquals(result.attributes["id"], "btn-id")
	assertEquals(result.attributes["type"], "submit")
	assertEquals(result.attributes["disabled"], true)
	assertEquals(result.attributes["form"], "myForm")
	assertEquals(result.attributes["class"], undefined)
	assertEquals((result.attributes as any).onclick, undefined)
	assertEquals(result.children, [{ content: "Submit", tag: "TextNode" }])
})

Deno.test("FilteredAllowText should handle ARIA attributes", () => {
	const createButton = FilteredAllowText("Button")()({
		aria: {
			hidden: "true",
			label: "Submit Button",
			describedby: "description",
		},
	})
	const result = createButton("Submit")

	assertEquals(result.attributes["aria-hidden"], "true")
	assertEquals(result.attributes["aria-label"], "Submit Button")
	assertEquals(result.attributes["aria-describedby"], "description")
})

Deno.test("FilteredAllowText should handle all special properties including format", () => {
	const createButton = FilteredAllowText("Button")()({
		calculation: "someCalculation",
		dataset: { type: "button", value: "test" },
		display: "inline-block",
		format: "uppercase",
		scripts: ["script1.js", "script2.js"],
		stylesheets: ["style1.css", "style2.css"],
	})
	const result = createButton("Submit")

	assertEquals(result.calculation, "someCalculation")
	assertEquals(result.dataset, { type: "button", value: "test" })
	assertEquals(result.display, "inline-block")
	assertEquals(result.format, "uppercase") // FilteredAllowText includes format
	assertEquals(result.scripts, ["script1.js", "script2.js"])
	assertEquals(result.stylesheets, ["style1.css", "style2.css"])
})

Deno.test("FilteredAllowText should work with complex validation and text", () => {
	// Custom filter for form elements
	const filterFormAttribs = (attrs: any) => {
		const { name, required, placeholder, maxlength, id, ...rest } = attrs
		const result: any = { id }
		if (typeof name === "string" && name.length > 0) {
			result.name = name
		}
		if (typeof required === "boolean") {
			result.required = required
		}
		if (typeof placeholder === "string") {
			result.placeholder = placeholder
		}
		if (typeof maxlength === "number" && maxlength > 0) {
			result.maxlength = maxlength
		}
		return result
	}

	const createField = FilteredAllowText("Label")(filterFormAttribs)({
		id: "field-label",
		name: "username",
		required: true,
		placeholder: "Enter username",
		maxlength: 50,
		onclick: "invalidAttribute",
		class: "invalidAttribute",
	})
	const result = createField("Username:")

	assertEquals(result.attributes["id"], "field-label")
	assertEquals(result.attributes["name"], "username")
	assertEquals(result.attributes["required"], true)
	assertEquals(result.attributes["placeholder"], "Enter username")
	assertEquals(result.attributes["maxlength"], 50)
	assertEquals(result.attributes["onclick"], undefined)
	assertEquals(result.attributes["class"], undefined)
	assertEquals(result.children, [{ content: "Username:", tag: "TextNode" }])
})

Deno.test("FilteredAllowText should handle identity filter with full attributes", () => {
	const createButton = FilteredAllowText("Button")((a: any) => a)({
		aria: { hidden: "true" },
		calculation: "calculation",
		class: "class",
		dataset: { value: "value" },
		display: "display",
		format: "format",
		scripts: ["scripts"],
		stylesheets: ["stylesheets"],
	})
	const result = createButton([
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])

	assertExists(result.attributes["id"])
	assertEquals(result.attributes["class"], "class")
	assertEquals(result.attributes["aria-hidden"], "true")
	assertEquals(result.children, [
		{
			content: "This is the content.",
			tag: "TextNode",
		},
	])
	assertEquals(result.calculation, "calculation")
	assertEquals(result.dataset, { value: "value" })
	assertEquals(result.display, "display")
	assertEquals(result.format, "format")
	assertEquals(result.scripts, ["scripts"])
	assertEquals(result.stylesheets, ["stylesheets"])
	assertEquals(result.tag, "Button")
})
