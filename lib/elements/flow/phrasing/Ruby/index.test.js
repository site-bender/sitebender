// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Ruby from "."

test("[Ruby] (constructors::flow::miscellaneous) returns a blank <ruby> element with id", () => {
	renderTo(document.body)(Ruby()())()

	const ruby = document.body.querySelector("ruby")

	expect(ruby?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Ruby] (constructors::flow::miscellaneous) returns <ruby> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Ruby({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<ruby id="id">Some text here</ruby>`)

	document.body.innerHTML = ""
})
