// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Var from "."

test("[Var] (constructors::flow::miscellaneous) returns a blank <var> element with id", () => {
	renderTo(document.body)(Var()())()

	const v = document.body.querySelector("var")

	expect(v?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Var] (constructors::flow::miscellaneous) returns <var> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Var({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<var id="id">Some text here</var>`)

	document.body.innerHTML = ""
})
