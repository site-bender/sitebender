// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Code from "."

test("[Code] (constructors::flow::miscellaneous) returns a blank <code> element with id", () => {
	render(document.body)(Code()())()

	const code = document.body.querySelector("code")

	expect(code?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Code] (constructors::flow::miscellaneous) returns <code> element with supplied attributes and children", () => {
	render(document.body)(
		Code({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<code id="id">Some text here</code>`)

	document.body.innerHTML = ""
})