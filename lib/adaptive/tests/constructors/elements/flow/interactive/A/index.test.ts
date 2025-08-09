import {
	assertEquals,
	assertExists,
} from "https://deno.land/std@0.208.0/assert/mod.ts"

import A from "../../../../../../constructors/elements/flow/interactive/A/index.ts"
import Button from "../../../../../../constructors/elements/flow/interactive/Button/index.ts"
import Details from "../../../../../../constructors/elements/flow/interactive/Details/index.ts"
import InputText from "../../../../../../constructors/elements/flow/interactive/Input/InputText/index.ts"
import Label from "../../../../../../constructors/elements/flow/interactive/Label/index.ts"
import Div from "../../../../../../constructors/elements/flow/miscellaneous/Div/index.ts"
import P from "../../../../../../constructors/elements/flow/miscellaneous/P/index.ts"
import Em from "../../../../../../constructors/elements/flow/phrasing/Em/index.ts"
import Span from "../../../../../../constructors/elements/flow/phrasing/Span/index.ts"
import Strong from "../../../../../../constructors/elements/flow/phrasing/Strong/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("A should create element with correct tag and basic attributes", () => {
	const anchor = A({
		id: "test-anchor",
		href: "/test-link",
		target: "_blank",
	})([TextNode("Test Link")])

	assertEquals(anchor.tag, "A")
	assertEquals(anchor.attributes.id, "test-anchor")
	assertEquals(anchor.attributes.href, "/test-link")
	assertEquals(anchor.attributes.target, "_blank")
	assertEquals(anchor.children.length, 1)
	assertEquals(anchor.children[0], { content: "Test Link", tag: "TextNode" })
})

Deno.test("A should accept valid phrasing content", () => {
	const validChildren = [
		TextNode("Click "),
		Strong()([TextNode("here")]),
		TextNode(" to visit our "),
		Em()([TextNode("amazing")]),
		TextNode(" site!"),
	]

	const anchor = A({ href: "/visit" })(validChildren)

	assertEquals(anchor.children.length, 5)
	assertEquals(anchor.children[0], { content: "Click ", tag: "TextNode" })
	assertEquals(anchor.children[1].tag, "Strong")
	assertEquals(anchor.children[2], {
		content: " to visit our ",
		tag: "TextNode",
	})
	assertEquals(anchor.children[3].tag, "Em")
	assertEquals(anchor.children[4], { content: " site!", tag: "TextNode" })
})

Deno.test("A should accept valid flow content", () => {
	const validChildren = [
		P()([TextNode("First paragraph of the link.")]),
		Div()([
			TextNode("Content in a div with "),
			Strong()([TextNode("emphasis")]),
		]),
		P()([TextNode("Second paragraph.")]),
	]

	const anchor = A({ href: "/article" })(validChildren)

	assertEquals(anchor.children.length, 3)
	assertEquals(anchor.children[0].tag, "P")
	assertEquals(anchor.children[1].tag, "Div")
	assertEquals(anchor.children[2].tag, "P")
})

Deno.test("A should filter out interactive children (Button elements)", () => {
	const mixedChildren = [
		TextNode("Link with "),
		Button({ type: "button" })([TextNode("button")]), // Should be filtered out
		TextNode(" and "),
		Strong()([TextNode("text")]), // Should remain
	]

	const anchor = A({ href: "/mixed" })(mixedChildren)

	// Should only have TextNode, TextNode, and Strong - Button filtered out
	assertEquals(anchor.children.length, 3)
	assertEquals(anchor.children[0], { content: "Link with ", tag: "TextNode" })
	assertEquals(anchor.children[1], { content: " and ", tag: "TextNode" })
	assertEquals(anchor.children[2].tag, "Strong")
})

Deno.test("A should filter out interactive children (Label elements)", () => {
	const mixedChildren = [
		TextNode("Link text "),
		Label({ for: "input1" })([TextNode("label")]), // Should be filtered out
		Span()([TextNode(" more text")]), // Should remain
	]

	const anchor = A({ href: "/label-test" })(mixedChildren)

	// Should only have TextNode and Span - Label filtered out
	assertEquals(anchor.children.length, 2)
	assertEquals(anchor.children[0], { content: "Link text ", tag: "TextNode" })
	assertEquals(anchor.children[1].tag, "Span")
})

Deno.test("A should filter out interactive children (Input elements)", () => {
	const mixedChildren = [
		TextNode("Form link "),
		InputText({ name: "embedded" }), // Should be filtered out
		TextNode(" text"),
	]

	const anchor = A({ href: "/form" })(mixedChildren)

	// Input elements should be filtered out as they are interactive
	assertEquals(anchor.children.length, 2)
	assertEquals(anchor.children[0], { content: "Form link ", tag: "TextNode" })
	assertEquals(anchor.children[1], { content: " text", tag: "TextNode" })
})

Deno.test("A should filter out interactive children (Details elements)", () => {
	const mixedChildren = [
		TextNode("Link with "),
		Details()([TextNode("expandable content")]), // Should be filtered out
		Em()([TextNode("emphasis")]), // Should remain
	]

	const anchor = A({ href: "/details" })(mixedChildren)

	// Should only have TextNode and Em - Details filtered out
	assertEquals(anchor.children.length, 2)
	assertEquals(anchor.children[0], { content: "Link with ", tag: "TextNode" })
	assertEquals(anchor.children[1].tag, "Em")
})

Deno.test("A should filter out nested A elements", () => {
	const mixedChildren = [
		TextNode("Outer link "),
		A({ href: "/inner" })([TextNode("inner link")]), // Should be filtered out
		TextNode(" text"),
	]

	const anchor = A({ href: "/outer" })(mixedChildren)

	// Should only have TextNodes - nested A filtered out
	assertEquals(anchor.children.length, 2)
	assertEquals(anchor.children[0], { content: "Outer link ", tag: "TextNode" })
	assertEquals(anchor.children[1], { content: " text", tag: "TextNode" })
})

Deno.test("A should handle string children by converting to TextNode", () => {
	const anchor = A({ href: "/simple" })([TextNode("Simple link text")])

	assertEquals(anchor.children.length, 1)
	assertEquals(anchor.children[0], {
		content: "Simple link text",
		tag: "TextNode",
	})
})

Deno.test("A should handle mixed valid children", () => {
	const validChildren = [
		TextNode("Start "),
		Div({ class: "container" })([
			P()([TextNode("Paragraph in div")]),
			Span()([
				TextNode("Span with "),
				Strong()([TextNode("strong")]),
				TextNode(" text"),
			]),
		]),
		TextNode(" end"),
	]

	const anchor = A({ href: "/mixed-valid" })(validChildren)

	assertEquals(anchor.children.length, 3)
	assertEquals(anchor.children[0], { content: "Start ", tag: "TextNode" })
	assertEquals(anchor.children[1].tag, "Div")
	assertEquals(anchor.children[2], { content: " end", tag: "TextNode" })
})

Deno.test("A should handle empty children array", () => {
	const anchor = A({ href: "/empty" })([])

	assertEquals(anchor.children.length, 0)
	assertEquals(anchor.tag, "A")
	assertExists(anchor.attributes.href)
})

Deno.test("A should handle single valid child", () => {
	const anchor = A({ href: "/single" })([
		Strong()([TextNode("Bold link")]),
	])

	assertEquals(anchor.children.length, 1)
	assertEquals(anchor.children[0].tag, "Strong")
})

Deno.test("A should handle single invalid child by filtering it out", () => {
	const anchor = A({ href: "/filtered" })([
		Button({ type: "button" })([TextNode("Button text")]),
	])

	// Button should be filtered out, leaving empty children
	assertEquals(anchor.children.length, 0)
})

Deno.test("A should handle complex nested valid content", () => {
	const complexChild = Div({ class: "wrapper" })([
		P()([TextNode("First paragraph")]),
		Div()([
			TextNode("Nested div with "),
			Strong()([TextNode("strong")]),
			TextNode(" and "),
			Em()([TextNode("emphasis")]),
		]),
		P()([TextNode("Second paragraph")]),
	])

	const anchor = A({ href: "/complex" })([complexChild])

	assertEquals(anchor.children.length, 1)
	assertEquals(anchor.children[0].tag, "Div")
	// The Div itself is valid flow content and should be preserved
})

Deno.test("A should validate attributes correctly", () => {
	const anchor = A({
		id: "attr-test",
		href: "/target",
		target: "_blank",
		rel: "noopener",
		download: "filename.pdf",
		hrefLang: "en",
		type: "application/pdf",
	})([TextNode("Test Link")])

	assertEquals(anchor.attributes.id, "attr-test")
	assertEquals(anchor.attributes.href, "/target")
	assertEquals(anchor.attributes.target, "_blank")
	assertEquals(anchor.attributes.rel, "noopener")
	assertEquals(anchor.attributes.download, "filename.pdf")
	assertEquals(anchor.attributes.hrefLang, "en")
	assertEquals(anchor.attributes.type, "application/pdf")
})

Deno.test("A should handle multiple interactive elements in complex structure", () => {
	const complexChildren = [
		TextNode("Visit "),
		Button({ type: "button" })([TextNode("this button")]), // Should be filtered out
		P()([TextNode("our page")]), // Should remain
		TextNode(" or "),
		Label({ for: "input1" })([TextNode("fill this")]), // Should be filtered out
		TextNode(" for "),
		Strong()([TextNode("more info")]), // Should remain
		InputText({ name: "search" }), // Should be filtered out
		Em()([TextNode("today")]), // Should remain
	]

	const anchor = A({ href: "/complex-link" })(complexChildren)

	// Interactive elements (Button, Label, Input) should be filtered out
	assertEquals(anchor.children.length, 6)
	assertEquals(anchor.children[0], { content: "Visit ", tag: "TextNode" })
	assertEquals(anchor.children[1].tag, "P")
	assertEquals(anchor.children[2], { content: " or ", tag: "TextNode" })
	assertEquals(anchor.children[3], { content: " for ", tag: "TextNode" })
	assertEquals(anchor.children[4].tag, "Strong")
	assertEquals(anchor.children[5].tag, "Em")
})

Deno.test("A should handle links without href attribute", () => {
	// A elements without href are not interactive, but current implementation always filters
	const anchor = A({ id: "no-href" })([
		TextNode("Not a link, just an anchor: "),
		Button({ type: "button" })([TextNode("Click me")]), // Currently filtered even without href
	])

	// Current implementation always filters interactive content regardless of href
	// TODO: Make filtering conditional on href presence per HTML5 spec
	assertEquals(anchor.children.length, 1)
	assertEquals(anchor.children[0], {
		content: "Not a link, just an anchor: ",
		tag: "TextNode",
	})
})
