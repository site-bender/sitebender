// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Menu from "."

test("[Menu] (constructors::flow::miscellaneous) returns a blank <menu> element with id", () => {
	renderTo(document.body)(Menu()())()

	const menu = document.body.querySelector("menu")

	expect(menu?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Menu] (constructors::flow::miscellaneous) returns <menu> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Menu({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<menu id="id">Some text here</menu>`)

	document.body.innerHTML = ""
})
