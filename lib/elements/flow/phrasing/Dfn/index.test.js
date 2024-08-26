// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Dfn from "."

test("[Dfn] (constructors::flow::miscellaneous) returns a blank <dfn> element with id", () => {
	render(document.body)(Dfn()())()

	const dfn = document.body.querySelector("dfn")

	expect(dfn?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Dfn] (constructors::flow::miscellaneous) returns <dfn> element with supplied attributes and children", () => {
	render(document.body)(
		Dfn({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<dfn id="id">Some text here</dfn>`)

	document.body.innerHTML = ""
})
