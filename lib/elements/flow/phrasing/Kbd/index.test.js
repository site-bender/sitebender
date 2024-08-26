// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Kbd from "."

test("[Kbd] (constructors::flow::miscellaneous) returns a blank <kbd> element with id", () => {
	render(document.body)(Kbd()())()

	const kbd = document.body.querySelector("kbd")

	expect(kbd?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Kbd] (constructors::flow::miscellaneous) returns <kbd> element with supplied attributes and children", () => {
	render(document.body)(
		Kbd({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<kbd id="id">Some text here</kbd>`)

	document.body.innerHTML = ""
})
