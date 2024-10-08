// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Aside from "."

test("[Aside] (constructors::flow::miscellaneous) returns a blank <aside> element with id", () => {
	renderTo(document.body)(Aside()())()

	const aside = document.body.querySelector("aside")

	expect(aside?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Aside] (constructors::flow::miscellaneous) returns <aside> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Aside({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<aside id="id" data-name="Bob">Some text here</aside>`,
	)

	document.body.innerHTML = ""
})
