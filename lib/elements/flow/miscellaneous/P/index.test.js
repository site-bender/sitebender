// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import P from "."

test("[P] (constructors::flow::miscellaneous) returns a blank <p> element with id", () => {
	renderTo(document.body)(P()())()

	const p = document.body.querySelector("p")

	expect(p?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[P] (constructors::flow::miscellaneous) returns <p> element with supplied attributes and children", () => {
	renderTo(document.body)(
		P({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<p id="id">Some text here</p>`)

	document.body.innerHTML = ""
})
