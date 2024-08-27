// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Span from "."

test("[Span] (constructors::flow::miscellaneous) returns a blank <span> element with id", () => {
	renderTo(document.body)(Span()())()

	const span = document.body.querySelector("span")

	expect(span?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Span] (constructors::flow::miscellaneous) returns <span> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Span({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<span id="id">Some text here</span>`)

	document.body.innerHTML = ""
})
