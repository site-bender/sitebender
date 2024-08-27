// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import U from "."

test("[U] (constructors::flow::miscellaneous) returns a blank <u> element with id", () => {
	renderTo(document.body)(U()())()

	const u = document.body.querySelector("u")

	expect(u?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[U] (constructors::flow::miscellaneous) returns <u> element with supplied attributes and children", () => {
	renderTo(document.body)(
		U({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<u id="id">Some text here</u>`)

	document.body.innerHTML = ""
})
