// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import U from "."

test("[U] (constructors::flow::miscellaneous) returns a blank <u> element with id", () => {
	render(document.body)(U()())()

	const u = document.body.querySelector("u")

	expect(u?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[U] (constructors::flow::miscellaneous) returns <u> element with supplied attributes and children", () => {
	render(document.body)(
		U({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<u id="id">Some text here</u>`)

	document.body.innerHTML = ""
})
