// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import S from "."

test("[S] (constructors::flow::miscellaneous) returns a blank <s> element with id", () => {
	renderTo(document.body)(S()())()

	const s = document.body.querySelector("s")

	expect(s?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[S] (constructors::flow::miscellaneous) returns <s> element with supplied attributes and children", () => {
	renderTo(document.body)(
		S({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<s id="id">Some text here</s>`)

	document.body.innerHTML = ""
})
