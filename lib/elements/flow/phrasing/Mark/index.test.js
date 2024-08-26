// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Mark from "."

test("[Mark] (constructors::flow::miscellaneous) returns a blank <mark> element with id", () => {
	render(document.body)(Mark()())()

	const mark = document.body.querySelector("mark")

	expect(mark?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Mark] (constructors::flow::miscellaneous) returns <mark> element with supplied attributes and children", () => {
	render(document.body)(
		Mark({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<mark id="id">Some text here</mark>`)

	document.body.innerHTML = ""
})
