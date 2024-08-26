// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Sub from "."

test("[Sub] (constructors::flow::miscellaneous) returns a blank <sub> element with id", () => {
	render(document.body)(Sub()())()

	const sub = document.body.querySelector("sub")

	expect(sub?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Sub] (constructors::flow::miscellaneous) returns <sub> element with supplied attributes and children", () => {
	render(document.body)(
		Sub({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<sub id="id">Some text here</sub>`)

	document.body.innerHTML = ""
})
