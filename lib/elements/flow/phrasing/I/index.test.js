// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import I from "."

test("[I] (constructors::flow::miscellaneous) returns a blank <i> element with id", () => {
	render(document.body)(I()())()

	const i = document.body.querySelector("i")

	expect(i?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[I] (constructors::flow::miscellaneous) returns <i> element with supplied attributes and children", () => {
	render(document.body)(
		I({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<i id="id">Some text here</i>`)

	document.body.innerHTML = ""
})
