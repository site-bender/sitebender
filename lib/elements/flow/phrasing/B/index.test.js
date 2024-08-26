// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import B from "."

test("[B] (constructors::flow::miscellaneous) returns a blank <b> element with id", () => {
	render(document.body)(B()())()

	const b = document.body.querySelector("b")

	expect(b?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[B] (constructors::flow::miscellaneous) returns <b> element with supplied attributes and children", () => {
	render(document.body)(
		B({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<b id="id">Some text here</b>`)

	document.body.innerHTML = ""
})
