// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Pre from "."

test("[Pre] (constructors::flow::miscellaneous) returns a blank <pre> element with id", () => {
	renderTo(document.body)(Pre()())()

	const pre = document.body.querySelector("pre")

	expect(pre?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Pre] (constructors::flow::miscellaneous) returns <pre> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Pre({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<pre id="id">Some text here</pre>`)

	document.body.innerHTML = ""
})
