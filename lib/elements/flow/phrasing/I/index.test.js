// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import I from "."

test("[I] (constructors::flow::miscellaneous) returns a blank <i> element with id", () => {
	renderTo(document.body)(I()())()

	const i = document.body.querySelector("i")

	expect(i?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[I] (constructors::flow::miscellaneous) returns <i> element with supplied attributes and children", () => {
	renderTo(document.body)(
		I({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<i id="id">Some text here</i>`)

	document.body.innerHTML = ""
})
