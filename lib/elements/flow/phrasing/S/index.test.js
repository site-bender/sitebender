// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import S from "."

test("[S] (constructors::flow::miscellaneous) returns a blank <s> element with id", () => {
	render(document.body)(S()())()

	const s = document.body.querySelector("s")

	expect(s?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[S] (constructors::flow::miscellaneous) returns <s> element with supplied attributes and children", () => {
	render(document.body)(
		S({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<s id="id">Some text here</s>`)

	document.body.innerHTML = ""
})
