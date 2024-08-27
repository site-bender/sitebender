// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Kbd from "."

test("[Kbd] (constructors::flow::miscellaneous) returns a blank <kbd> element with id", () => {
	renderTo(document.body)(Kbd()())()

	const kbd = document.body.querySelector("kbd")

	expect(kbd?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Kbd] (constructors::flow::miscellaneous) returns <kbd> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Kbd({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<kbd id="id">Some text here</kbd>`)

	document.body.innerHTML = ""
})
