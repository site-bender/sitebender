// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import { FOOTER_ROLES } from "../../../constants"
import TextNode from "../../../TextNode"
import Footer from "."

test("[Footer] (constructors::flow::miscellaneous) returns a blank <footer> element with id", () => {
	render(document.body)(Footer()())()

	const footer = document.body.querySelector("footer")

	expect(footer?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Footer] (constructors::flow::miscellaneous) returns <footer> element with supplied attributes and children", () => {
	render(document.body)(
		Footer({
			grizmo: "gribbet",
			id: "id",
			role: FOOTER_ROLES[0],
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<footer id="id" role="group">Some text here</footer>`,
	)

	document.body.innerHTML = ""
})
