// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Cite from "."

test("[Cite] (constructors::flow::miscellaneous) returns a blank <cite> element with id", () => {
	renderTo(document.body)(Cite()())()

	const cite = document.body.querySelector("cite")

	expect(cite?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Cite] (constructors::flow::miscellaneous) returns <cite> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Cite({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<cite id="id">Some text here</cite>`)

	document.body.innerHTML = ""
})
