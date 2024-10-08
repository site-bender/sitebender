// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Strong from "."

test("[Strong] (constructors::flow::miscellaneous) returns a blank <strong> element with id", () => {
	renderTo(document.body)(Strong()())()

	const strong = document.body.querySelector("strong")

	expect(strong?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Strong] (constructors::flow::miscellaneous) returns <strong> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Strong({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<strong id="id">Some text here</strong>`,
	)

	document.body.innerHTML = ""
})
