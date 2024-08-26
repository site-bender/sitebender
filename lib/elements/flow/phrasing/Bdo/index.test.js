// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Bdo from "."

test("[Bdo] (constructors::flow::miscellaneous) returns a blank <bdo> element with id", () => {
	render(document.body)(Bdo()())()

	const bdo = document.body.querySelector("bdo")

	expect(bdo?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Bdo] (constructors::flow::miscellaneous) returns <bdo> element with supplied attributes and children", () => {
	render(document.body)(
		Bdo({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<bdo id="id">Some text here</bdo>`)

	document.body.innerHTML = ""
})