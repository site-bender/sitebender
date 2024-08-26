// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Div from "."

test("[Div] (constructors::flow::miscellaneous) returns a blank <div> element with id", () => {
	render(document.body)(Div()())()

	const div = document.body.querySelector("div")

	expect(div?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Div] (constructors::flow::miscellaneous) returns <div> element with supplied attributes and children", () => {
	render(document.body)(
		Div({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<div id="id">Some text here</div>`)

	document.body.innerHTML = ""
})
