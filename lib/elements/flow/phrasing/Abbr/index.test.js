// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Abbr from "."

test("[Abbr] (constructors::flow::miscellaneous) returns a blank <abbr> element with id", () => {
	render(document.body)(Abbr()())()

	const abbr = document.body.querySelector("abbr")

	expect(abbr?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Abbr] (constructors::flow::miscellaneous) returns <abbr> element with supplied attributes and children", () => {
	render(document.body)(
		Abbr({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<abbr id="id">Some text here</abbr>`)

	document.body.innerHTML = ""
})