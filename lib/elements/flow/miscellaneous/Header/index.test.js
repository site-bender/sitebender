// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import { FOOTER_ROLES } from "../../../constants"
import TextNode from "../../../TextNode"
import Header from "."

test("[Header] (constructors::flow::miscellaneous) returns a blank <header> element with id", () => {
	render(document.body)(Header()())()

	const header = document.body.querySelector("header")

	expect(header?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Header] (constructors::flow::miscellaneous) returns <header> element with supplied attributes and children", () => {
	render(document.body)(
		Header({
			grizmo: "gribbet",
			id: "id",
			role: FOOTER_ROLES[0],
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<header id="id" role="group">Some text here</header>`,
	)

	document.body.innerHTML = ""
})