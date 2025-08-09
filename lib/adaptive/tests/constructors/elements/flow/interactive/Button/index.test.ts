import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import A from "../../../../../../constructors/elements/flow/interactive/A/index.ts"
import Button from "../../../../../../constructors/elements/flow/interactive/Button/index.ts"
import Details from "../../../../../../constructors/elements/flow/interactive/Details/index.ts"
import InputText from "../../../../../../constructors/elements/flow/interactive/Input/InputText/index.ts"
import Label from "../../../../../../constructors/elements/flow/interactive/Label/index.ts"
import Em from "../../../../../../constructors/elements/flow/phrasing/Em/index.ts"
import Span from "../../../../../../constructors/elements/flow/phrasing/Span/index.ts"
import Strong from "../../../../../../constructors/elements/flow/phrasing/Strong/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Button should create element with correct tag and basic attributes", () => {
	const button = Button({
		id: "test-button",
		type: "submit",
		disabled: false,
	})([TextNode("Submit")])

	assertEquals(button.tag, "Button")
	assertEquals(button.attributes.id, "test-button")
	assertEquals(button.attributes.type, "submit")
	assertEquals(button.attributes.disabled, false)
	assertEquals(button.children.length, 1)
	assertEquals(button.children[0], { content: "Submit", tag: "TextNode" })
})

Deno.test("Button should accept valid phrasing content", () => {
	const validChildren = [
		TextNode("Click "),
		Strong()([TextNode("here")]),
		TextNode(" to "),
		Em()([TextNode("submit")]),
		TextNode("!"),
	]

	const button = Button({ id: "complex-button" })(validChildren)

	assertEquals(button.children.length, 5)
	assertEquals(button.children[0], { content: "Click ", tag: "TextNode" })
	assertEquals(button.children[1].tag, "Strong")
	assertEquals(button.children[2], { content: " to ", tag: "TextNode" })
	assertEquals(button.children[3].tag, "Em")
	assertEquals(button.children[4], { content: "!", tag: "TextNode" })
})

Deno.test("Button should filter out interactive children (A elements)", () => {
	const mixedChildren = [
		TextNode("Click "),
		A({ href: "/link" })([TextNode("this link")]), // Should be filtered out
		TextNode(" or "),
		Strong()([TextNode("this text")]), // Should remain
	]

	const button = Button({ id: "filtered-button" })(mixedChildren)

	// Should only have TextNode, TextNode, and Strong - A element filtered out
	assertEquals(button.children.length, 3)
	assertEquals(button.children[0], { content: "Click ", tag: "TextNode" })
	assertEquals(button.children[1], { content: " or ", tag: "TextNode" })
	assertEquals(button.children[2].tag, "Strong")
})

Deno.test("Button should filter out interactive children (Label elements)", () => {
	const mixedChildren = [
		TextNode("Submit "),
		Label({ for: "input1" })([TextNode("form")]), // Should be filtered out
		Span()([TextNode(" now")]), // Should remain
	]

	const button = Button({ id: "label-filtered" })(mixedChildren)

	// Should only have TextNode and Span - Label filtered out
	assertEquals(button.children.length, 2)
	assertEquals(button.children[0], { content: "Submit ", tag: "TextNode" })
	assertEquals(button.children[1].tag, "Span")
})

Deno.test("Button should filter out interactive children (Input elements)", () => {
	const mixedChildren = [
		TextNode("Text "),
		InputText({ name: "field" }), // Should be filtered out
		TextNode(" more text"),
	]

	const button = Button({ id: "input-filtered" })(mixedChildren)

	// Should only have TextNodes - Input filtered out
	assertEquals(button.children.length, 2)
	assertEquals(button.children[0], { content: "Text ", tag: "TextNode" })
	assertEquals(button.children[1], { content: " more text", tag: "TextNode" })
})

Deno.test("Button should filter out interactive children (Details elements)", () => {
	const mixedChildren = [
		TextNode("Click "),
		Details()([TextNode("details content")]), // Should be filtered out
		Em()([TextNode("here")]), // Should remain
	]

	const button = Button({ id: "details-filtered" })(mixedChildren)

	// Should only have TextNode and Em - Details filtered out
	assertEquals(button.children.length, 2)
	assertEquals(button.children[0], { content: "Click ", tag: "TextNode" })
	assertEquals(button.children[1].tag, "Em")
})

Deno.test("Button should handle string children by converting to TextNode", () => {
	const button = Button({ id: "string-button" })("Simple text")

	assertEquals(button.children.length, 1)
	assertEquals(button.children[0], { content: "Simple text", tag: "TextNode" })
})

Deno.test("Button should handle mixed valid children", () => {
	const validChildren = [
		TextNode("Start "),
		Span({ class: "highlight" })([
			TextNode("highlighted "),
			Strong()([TextNode("strong")]),
			TextNode(" text"),
		]),
		TextNode(" end"),
	]

	const button = Button({ id: "mixed-button" })(validChildren)

	assertEquals(button.children.length, 3)
	assertEquals(button.children[0], { content: "Start ", tag: "TextNode" })
	assertEquals(button.children[1].tag, "Span")
	assertEquals(button.children[2], { content: " end", tag: "TextNode" })
})

Deno.test("Button should handle empty children array", () => {
	const button = Button({ id: "empty-button" })([])

	assertEquals(button.children.length, 0)
	assertEquals(button.tag, "Button")
	assertExists(button.attributes.id)
})

Deno.test("Button should handle single valid child", () => {
	const button = Button({ id: "single-child" })(
		Strong()([TextNode("Bold text")]),
	)

	assertEquals(button.children.length, 1)
	assertEquals(button.children[0].tag, "Strong")
})

Deno.test("Button should handle single invalid child by filtering it out", () => {
	const button = Button({ id: "filtered-single" })(
		A({ href: "/link" })([TextNode("Link text")]),
	)

	// A element should be filtered out, leaving empty children
	assertEquals(button.children.length, 0)
})

Deno.test("Button should handle complex nested valid content", () => {
	const complexChild = Span({ class: "wrapper" })([
		TextNode("Prefix "),
		Strong()([
			TextNode("Bold "),
			Em()([TextNode("and italic")]),
		]),
		TextNode(" suffix"),
	])

	const button = Button({ id: "complex-nested" })([complexChild])

	assertEquals(button.children.length, 1)
	assertEquals(button.children[0].tag, "Span")
	// The Span itself is valid phrasing content and should be preserved
})

Deno.test("Button should validate attributes correctly", () => {
	const button = Button({
		id: "attr-test",
		type: "button",
		disabled: true,
		name: "test-button",
		value: "test-value",
		autofocus: true,
		form: "test-form",
	})([TextNode("Test")])

	assertEquals(button.attributes.id, "attr-test")
	assertEquals(button.attributes.type, "button")
	assertEquals(button.attributes.disabled, true)
	assertEquals(button.attributes.name, "test-button")
	assertEquals(button.attributes.value, "test-value")
	assertEquals(button.attributes.autofocus, true)
	assertEquals(button.attributes.form, "test-form")
})
