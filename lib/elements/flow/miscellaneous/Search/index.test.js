// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Search from "."

test("[Search] (constructors::flow::miscellaneous) returns a blank <search> element with id", () => {
	render(document.body)(Search()())()

	const search = document.body.querySelector("search")

	expect(search?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Search] (constructors::flow::miscellaneous) returns <search> element with supplied attributes and children", () => {
	render(document.body)(
		Search({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<search id="id">Some text here</search>`,
	)

	document.body.innerHTML = ""
})
