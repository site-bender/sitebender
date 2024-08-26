// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Li from "../Li"
import Ul from "."

test("[Ul] (constructors::flow::miscellaneous) returns a blank <ul> element with id", () => {
	render(document.body)(Ul()())()

	const ul = document.body.querySelector("ul")

	expect(ul?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Ul] (constructors::flow::miscellaneous) returns <ul> element with supplied attributes and children", () => {
	render(document.body)(
		Ul({
			grizmo: "gribbet",
			id: "id",
		})([
			Li({ id: "li-id1" })([TextNode("Some text here")]),
			Li({ id: "li-id2" })([TextNode("Some more text here")]),
		]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<ul id="id"><li id="li-id1">Some text here</li><li id="li-id2">Some more text here</li></ul>`,
	)

	document.body.innerHTML = ""
})
