import { assertEquals } from "@std/assert"

import H1 from "../../../../../../constructors/elements/flow/heading/H1/index.ts"
import H2 from "../../../../../../constructors/elements/flow/heading/H2/index.ts"
import A from "../../../../../../constructors/elements/flow/interactive/A/index.ts"
import Button from "../../../../../../constructors/elements/flow/interactive/Button/index.ts"
import Details from "../../../../../../constructors/elements/flow/interactive/Details/index.ts"
import Summary from "../../../../../../constructors/elements/flow/interactive/Details/Summary/index.ts"
import InputText from "../../../../../../constructors/elements/flow/interactive/Input/InputText/index.ts"
import Label from "../../../../../../constructors/elements/flow/interactive/Label/index.ts"
import Select from "../../../../../../constructors/elements/flow/interactive/Select/index.ts"
import TextArea from "../../../../../../constructors/elements/flow/interactive/TextArea/index.ts"
import Div from "../../../../../../constructors/elements/flow/miscellaneous/Div/index.ts"
import P from "../../../../../../constructors/elements/flow/miscellaneous/P/index.ts"
import Em from "../../../../../../constructors/elements/flow/phrasing/Em/index.ts"
import Span from "../../../../../../constructors/elements/flow/phrasing/Span/index.ts"
import Strong from "../../../../../../constructors/elements/flow/phrasing/Strong/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Details element comprehensive behavioral tests", async (t) => {
	await t.step(
		"should create element with correct tag and basic attributes",
		() => {
			const result = Details({
				id: "test-details",
				name: "section1",
				open: true,
				class: "collapsible",
				tabindex: "0",
			})([])

			assertEquals(result.tag, "Details")
			assertEquals(result.attributes.id, "test-details")
			assertEquals(result.attributes.name, "section1")
			assertEquals(result.attributes.open, true)
			assertEquals(result.attributes.class, "collapsible")
			assertEquals(result.attributes.tabindex, "0")
		},
	)

	await t.step("should allow Summary as first child", () => {
		const summary = Summary()([TextNode("Click to expand")])
		const result = Details({})([summary])

		assertEquals(result.tag, "Details")
		assertEquals(result.children.length, 1)
		assertEquals(result.children[0].tag, "Summary")
	})

	await t.step("should allow flow content after Summary", () => {
		const summary = Summary()([TextNode("Details")])
		const p = P()([TextNode("Content paragraph")])
		const div = Div()([TextNode("Content div")])
		const h1 = H1()([TextNode("Heading")])

		const result = Details({})([summary, p, div, h1])

		assertEquals(result.tag, "Details")
		assertEquals(result.children.length, 4)
		assertEquals(result.children[0].tag, "Summary")
		assertEquals(result.children[1].tag, "P")
		assertEquals(result.children[2].tag, "Div")
		assertEquals(result.children[3].tag, "H1")
	})

	await t.step("should filter out interactive children after Summary", () => {
		const summary = Summary()([TextNode("Details")])
		const p = P()([TextNode("Valid content")])
		const button = Button()([TextNode("Interactive button")])
		const label = Label()([TextNode("Interactive label")])
		const input = InputText({})
		const div = Div()([TextNode("Valid div")])

		const result = Details({})([summary, p, button, label, input, div])

		assertEquals(result.tag, "Details")
		assertEquals(result.children.length, 3) // Summary, P, Div (interactive elements filtered out)
		assertEquals(result.children[0].tag, "Summary")
		assertEquals(result.children[1].tag, "P")
		assertEquals(result.children[2].tag, "Div")
	})

	await t.step(
		"should move Summary to first position and preserve valid flow content",
		() => {
			const p = P()([TextNode("Valid paragraph")])
			const button = Button()([TextNode("Should be filtered")])
			const div = Div()([TextNode("Valid div")])
			const summary = Summary()([TextNode("Should be moved to first")])

			const result = Details({})([p, button, div, summary])

			assertEquals(result.tag, "Details")
			assertEquals(result.children.length, 3) // Summary (moved to first) + P + Div (button filtered out)
			assertEquals(result.children[0].tag, "Summary")
			assertEquals(result.children[1].tag, "P")
			assertEquals(result.children[2].tag, "Div")
		},
	)

	await t.step(
		"should handle multiple Summary elements (only first allowed)",
		() => {
			const summary1 = Summary()([TextNode("First summary")])
			const summary2 = Summary()([TextNode("Second summary")])
			const summary3 = Summary()([TextNode("Third summary")])
			const p = P()([TextNode("Content")])

			const result = Details({})([summary1, summary2, summary3, p])

			assertEquals(result.tag, "Details")
			assertEquals(result.children.length, 2) // First Summary + P (other Summaries filtered out)
			assertEquals(result.children[0].tag, "Summary")
			assertEquals(result.children[1].tag, "P")
		},
	)

	await t.step("should allow text nodes and strings in any position", () => {
		const summary = Summary()([TextNode("Summary")])
		const result = Details({})([summary, "Text string", TextNode("Text node")])

		assertEquals(result.tag, "Details")
		assertEquals(result.children.length, 3)
		assertEquals(result.children[0].tag, "Summary")
		assertEquals(result.children[1], "Text string")
		assertEquals(result.children[2].tag, "TextNode")
	})

	await t.step("should handle empty children array", () => {
		const result = Details({})([])

		assertEquals(result.tag, "Details")
		assertEquals(result.children.length, 0)
	})

	await t.step("should handle single non-array child", () => {
		const summary = Summary()([TextNode("Single child")])
		const result = Details({})([summary])

		assertEquals(result.tag, "Details")
		assertEquals(result.children.length, 1)
		assertEquals(result.children[0].tag, "Summary")
	})

	await t.step(
		"should handle single non-Summary child by preserving valid flow content",
		() => {
			const p = P()([TextNode("Valid flow content")])
			const result = Details({})([p])

			assertEquals(result.tag, "Details")
			assertEquals(result.children.length, 1) // P preserved as valid flow content
			assertEquals(result.children[0].tag, "P")
		},
	)

	await t.step("should handle complex nested valid content", () => {
		const summary = Summary()([
			TextNode("Details: "),
			Strong()([TextNode("Important")]),
		])
		const div = Div()([
			P()([TextNode("First paragraph")]),
			P()([
				TextNode("Second paragraph with "),
				Em()([TextNode("emphasis")]),
			]),
		])
		const result = Details({})([summary, div])

		assertEquals(result.tag, "Details")
		assertEquals(result.children.length, 2)
		assertEquals(result.children[0].tag, "Summary")
		assertEquals(result.children[1].tag, "Div")
	})

	await t.step(
		"should filter out interactive elements from nested content",
		() => {
			const summary = Summary()([TextNode("Summary")])
			const validDiv = Div()([
				P()([TextNode("Valid paragraph")]),
				Span()([TextNode("Valid span")]),
			])
			const button = Button()([TextNode("Interactive button")])
			const a = A({ href: "#" })([TextNode("Interactive link")])

			const result = Details({})([summary, validDiv, button, a])

			assertEquals(result.tag, "Details")
			assertEquals(result.children.length, 2) // Summary + valid Div (interactive elements filtered out)
			assertEquals(result.children[0].tag, "Summary")
			assertEquals(result.children[1].tag, "Div")
		},
	)

	await t.step("should validate attributes correctly", () => {
		const validAttrs = {
			id: "details-id",
			name: "section",
			open: true,
			class: "collapsible",
			tabindex: "0",
		}
		const result = Details(validAttrs)([])

		assertEquals(result.tag, "Details")
		assertEquals(result.attributes.id, "details-id")
		assertEquals(result.attributes.name, "section")
		assertEquals(result.attributes.open, true)
		assertEquals(result.attributes.class, "collapsible")
		assertEquals(result.attributes.tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attrs = {
			name: "valid",
			open: true,
			invalidAttr: "should be removed",
			onclick: "handleClick()",
		} as any
		const result = Details(attrs)([])

		assertEquals(result.tag, "Details")
		assertEquals(result.attributes.name, "valid")
		assertEquals(result.attributes.open, true)
		assertEquals("invalidAttr" in result.attributes, false)
		assertEquals("onclick" in result.attributes, false)
	})

	await t.step("should handle special properties correctly", () => {
		const attrs = {
			id: "special-details",
			calculation: "detailsCalculation",
			dataset: { expanded: "false" },
			display: "block",
			format: "detailsFormat",
			scripts: ["details.js"],
			stylesheets: ["details.css"],
			validation: "detailsValidation",
		}
		const result = Details(attrs)([])

		assertEquals(result.tag, "Details")
		assertEquals(result.calculation, "detailsCalculation")
		assertEquals(result.dataset, { expanded: "false" })
		assertEquals(result.display, "block")
		assertEquals(result.format, "detailsFormat")
		assertEquals(result.scripts, ["details.js"])
		assertEquals(result.stylesheets, ["details.css"])
		assertEquals(result.validation, "detailsValidation")
	})

	await t.step(
		"should handle complex multi-interactive filtering scenario",
		() => {
			const summary = Summary()([TextNode("Expandable Section")])
			const p1 = P()([TextNode("Valid paragraph 1")])
			const button = Button()([TextNode("Should be filtered")])
			const div = Div()([TextNode("Valid div")])
			const label = Label()([TextNode("Should be filtered")])
			const textarea = TextArea()("Should be filtered")
			const p2 = P()([TextNode("Valid paragraph 2")])
			const select = Select()([])
			const h2 = H2()([TextNode("Valid heading")])

			const result = Details({})([
				summary,
				p1,
				button,
				div,
				label,
				textarea,
				p2,
				select,
				h2,
			])

			assertEquals(result.tag, "Details")
			assertEquals(result.children.length, 5) // Summary + 4 valid non-interactive elements
			assertEquals(result.children[0].tag, "Summary")
			assertEquals(result.children[1].tag, "P")
			assertEquals(result.children[2].tag, "Div")
			assertEquals(result.children[3].tag, "P")
			assertEquals(result.children[4].tag, "H2")
		},
	)

	await t.step("should handle aria attributes correctly", () => {
		const attrs = {
			id: "aria-details",
			aria: {
				label: "Expandable details",
				expanded: "false",
			},
		}
		const result = Details(attrs)([])

		assertEquals(result.tag, "Details")
		assertEquals(result.attributes.id, "aria-details")
		assertEquals(result.attributes["aria-label"], "Expandable details")
		assertEquals(result.attributes["aria-expanded"], "false")
	})
})
