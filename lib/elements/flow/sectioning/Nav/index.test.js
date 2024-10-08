// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Nav from "."

test("[Nav] (constructors::flow::miscellaneous) returns a blank <nav> element with id", () => {
	renderTo(document.body)(Nav()())()

	const nav = document.body.querySelector("nav")

	expect(nav?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Nav] (constructors::flow::miscellaneous) returns <nav> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Nav({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<nav id="id" data-name="Bob">Some text here</nav>`,
	)

	document.body.innerHTML = ""
})
