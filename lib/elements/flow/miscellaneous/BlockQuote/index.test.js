// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import BlockQuote from "."

test("[BlockQuote] (constructors::flow::miscellaneous) returns a blank <blockquote> element with id", () => {
	render(document.body)(BlockQuote()())()

	const blockquote = document.body.querySelector("blockquote")

	expect(blockquote?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[BlockQuote] (constructors::flow::miscellaneous) returns <blockquote> element with supplied attributes and children", () => {
	render(document.body)(
		BlockQuote({
			cite: "cite",
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<blockquote id="id" cite="cite">Some text here</blockquote>`,
	)

	document.body.innerHTML = ""
})