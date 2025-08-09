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

Deno.test("Label should create element with correct tag and basic attributes", () => {
	const label = Label({
		id: "test-label",
		for: "input-id",
	})([TextNode("Field Label")])

	assertEquals(label.tag, "Label")
	assertEquals(label.attributes.id, "test-label")
	assertEquals(label.attributes.for, "input-id")
	assertEquals(label.children.length, 1)
	assertEquals(label.children[0], { content: "Field Label", tag: "TextNode" })
})

Deno.test("Label should accept valid phrasing content", () => {
	const validChildren = [
		TextNode("Enter your "),
		Strong()([TextNode("full name")]),
		TextNode(" in the "),
		Em()([TextNode("required")]),
		TextNode(" field below"),
	]

	const label = Label({ for: "name-input" })(validChildren)

	assertEquals(label.children.length, 5)
	assertEquals(label.children[0], { content: "Enter your ", tag: "TextNode" })
	assertEquals(label.children[1].tag, "Strong")
	assertEquals(label.children[2], { content: " in the ", tag: "TextNode" })
	assertEquals(label.children[3].tag, "Em")
	assertEquals(label.children[4], { content: " field below", tag: "TextNode" })
})

Deno.test("Label should filter out interactive children (A elements)", () => {
	const mixedChildren = [
		TextNode("See "),
		A({ href: "/help" })([TextNode("help page")]), // Should be filtered out
		TextNode(" for details about "),
		Strong()([TextNode("this field")]), // Should remain
	]

	const label = Label({ for: "help-input" })(mixedChildren)

	// Should only have TextNode, TextNode, and Strong - A element filtered out
	assertEquals(label.children.length, 3)
	assertEquals(label.children[0], { content: "See ", tag: "TextNode" })
	assertEquals(label.children[1], {
		content: " for details about ",
		tag: "TextNode",
	})
	assertEquals(label.children[2].tag, "Strong")
})

Deno.test("Label should filter out interactive children (Button elements)", () => {
	const mixedChildren = [
		TextNode("Label text "),
		Button({ type: "button" })([TextNode("Click me")]), // Should be filtered out
		Span()([TextNode(" more text")]), // Should remain
	]

	const label = Label({ for: "button-input" })(mixedChildren)

	// Should only have TextNode and Span - Button filtered out
	assertEquals(label.children.length, 2)
	assertEquals(label.children[0], { content: "Label text ", tag: "TextNode" })
	assertEquals(label.children[1].tag, "Span")
})

Deno.test("Label should filter out interactive children (Input elements)", () => {
	const mixedChildren = [
		TextNode("Input label "),
		InputText({ name: "embedded" }), // Should be filtered out
		TextNode(" text"),
	]

	const label = Label({ for: "main-input" })(mixedChildren)

	// Should only have TextNodes - Input filtered out
	assertEquals(label.children.length, 2)
	assertEquals(label.children[0], { content: "Input label ", tag: "TextNode" })
	assertEquals(label.children[1], { content: " text", tag: "TextNode" })
})

Deno.test("Label should filter out interactive children (Details elements)", () => {
	const mixedChildren = [
		TextNode("Label with "),
		Details()([TextNode("expandable content")]), // Should be filtered out
		Em()([TextNode("emphasis")]), // Should remain
	]

	const label = Label({ for: "details-input" })(mixedChildren)

	// Should only have TextNode and Em - Details filtered out
	assertEquals(label.children.length, 2)
	assertEquals(label.children[0], { content: "Label with ", tag: "TextNode" })
	assertEquals(label.children[1].tag, "Em")
})

Deno.test("Label should filter out nested Label elements", () => {
	const mixedChildren = [
		TextNode("Outer label "),
		Label({ for: "inner-input" })([TextNode("inner label")]), // Should be filtered out
		TextNode(" text"),
	]

	const label = Label({ for: "outer-input" })(mixedChildren)

	// Should only have TextNodes - nested Label filtered out
	assertEquals(label.children.length, 2)
	assertEquals(label.children[0], { content: "Outer label ", tag: "TextNode" })
	assertEquals(label.children[1], { content: " text", tag: "TextNode" })
})

Deno.test("Label should handle string children by converting to TextNode", () => {
	const label = Label({ for: "string-input" })("Simple label text")

	assertEquals(label.children.length, 1)
	assertEquals(label.children[0], {
		content: "Simple label text",
		tag: "TextNode",
	})
})

Deno.test("Label should handle mixed valid children", () => {
	const validChildren = [
		TextNode("Start "),
		Span({ class: "highlight" })([
			TextNode("highlighted "),
			Strong()([TextNode("important")]),
			TextNode(" text"),
		]),
		TextNode(" end"),
	]

	const label = Label({ for: "mixed-input" })(validChildren)

	assertEquals(label.children.length, 3)
	assertEquals(label.children[0], { content: "Start ", tag: "TextNode" })
	assertEquals(label.children[1].tag, "Span")
	assertEquals(label.children[2], { content: " end", tag: "TextNode" })
})

Deno.test("Label should handle empty children array", () => {
	const label = Label({ for: "empty-input" })([])

	assertEquals(label.children.length, 0)
	assertEquals(label.tag, "Label")
	assertExists(label.attributes.for)
})

Deno.test("Label should handle single valid child", () => {
	const label = Label({ for: "single-input" })(
		Strong()([TextNode("Bold label")]),
	)

	assertEquals(label.children.length, 1)
	assertEquals(label.children[0].tag, "Strong")
})

Deno.test("Label should handle single invalid child by filtering it out", () => {
	const label = Label({ for: "filtered-input" })(
		A({ href: "/link" })([TextNode("Link text")]),
	)

	// A element should be filtered out, leaving empty children
	assertEquals(label.children.length, 0)
})

Deno.test("Label should handle complex nested valid content", () => {
	const complexChild = Span({ class: "wrapper" })([
		TextNode("Prefix "),
		Strong()([
			TextNode("Bold "),
			Em()([TextNode("and italic")]),
		]),
		TextNode(" suffix"),
	])

	const label = Label({ for: "complex-input" })([complexChild])

	assertEquals(label.children.length, 1)
	assertEquals(label.children[0].tag, "Span")
	// The Span itself is valid phrasing content and should be preserved
})

Deno.test("Label should validate attributes correctly", () => {
	const label = Label({
		id: "attr-test",
		for: "target-input",
		form: "test-form",
	})([TextNode("Test Label")])

	assertEquals(label.attributes.id, "attr-test")
	assertEquals(label.attributes.for, "target-input")
	assertEquals(label.attributes.form, "test-form")
})

Deno.test("Label should handle multiple interactive elements in complex structure", () => {
	const complexChildren = [
		TextNode("Choose "),
		A({ href: "/options" })([TextNode("options")]), // Should be filtered out
		TextNode(" or "),
		Button({ type: "button" })([TextNode("click here")]), // Should be filtered out
		TextNode(" for "),
		Strong()([TextNode("help")]), // Should remain
		TextNode(" with "),
		InputText({ name: "helper" }), // Should be filtered out
		Em()([TextNode("this field")]), // Should remain
	]

	const label = Label({ for: "complex-field" })(complexChildren)

	// Should only have TextNodes, Strong, and Em - all interactive elements filtered out
	assertEquals(label.children.length, 6)
	assertEquals(label.children[0], { content: "Choose ", tag: "TextNode" })
	assertEquals(label.children[1], { content: " or ", tag: "TextNode" })
	assertEquals(label.children[2], { content: " for ", tag: "TextNode" })
	assertEquals(label.children[3].tag, "Strong")
	assertEquals(label.children[4], { content: " with ", tag: "TextNode" })
	assertEquals(label.children[5].tag, "Em")
})
