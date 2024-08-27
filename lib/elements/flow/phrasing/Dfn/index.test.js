// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Dfn from "."

test("[Dfn] (constructors::flow::miscellaneous) returns a blank <dfn> element with id", () => {
	renderTo(document.body)(Dfn()())()

	const dfn = document.body.querySelector("dfn")

	expect(dfn?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Dfn] (constructors::flow::miscellaneous) returns <dfn> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Dfn({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<dfn id="id">Some text here</dfn>`)

	document.body.innerHTML = ""
})
