// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Samp from "."

test("[Samp] (constructors::flow::miscellaneous) returns a blank <samp> element with id", () => {
	renderTo(document.body)(Samp()())()

	const samp = document.body.querySelector("samp")

	expect(samp?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Samp] (constructors::flow::miscellaneous) returns <samp> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Samp({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<samp id="id">Some text here</samp>`)

	document.body.innerHTML = ""
})
