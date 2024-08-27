// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Mark from "."

test("[Mark] (constructors::flow::miscellaneous) returns a blank <mark> element with id", () => {
	renderTo(document.body)(Mark()())()

	const mark = document.body.querySelector("mark")

	expect(mark?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Mark] (constructors::flow::miscellaneous) returns <mark> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Mark({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<mark id="id">Some text here</mark>`)

	document.body.innerHTML = ""
})
