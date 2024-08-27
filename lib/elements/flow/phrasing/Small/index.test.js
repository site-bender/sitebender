// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Small from "."

test("[Small] (constructors::flow::miscellaneous) returns a blank <small> element with id", () => {
	renderTo(document.body)(Small()())()

	const small = document.body.querySelector("small")

	expect(small?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Small] (constructors::flow::miscellaneous) returns <small> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Small({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<small id="id">Some text here</small>`,
	)

	document.body.innerHTML = ""
})
