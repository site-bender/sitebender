// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Li from "../Li"
import Ol from "."

test("[Ol] (constructors::flow::miscellaneous) returns a blank <ol> element with id", () => {
	render(document.body)(Ol()())()

	const ol = document.body.querySelector("ol")

	expect(ol?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Ol] (constructors::flow::miscellaneous) returns <ol> element with supplied attributes and children", () => {
	render(document.body)(
		Ol({
			grizmo: "gribbet",
			id: "id",
		})([
			Li({ id: "li-id1" })([TextNode("Some text here")]),
			Li({ id: "li-id2" })([TextNode("Some more text here")]),
		]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<ol id="id"><li id="li-id1">Some text here</li><li id="li-id2">Some more text here</li></ol>`,
	)

	document.body.innerHTML = ""
})
