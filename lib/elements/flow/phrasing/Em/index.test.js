// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Em from "."

test("[Em] (constructors::flow::miscellaneous) returns a blank <em> element with id", () => {
	render(document.body)(Em()())()

	const em = document.body.querySelector("em")

	expect(em?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Em] (constructors::flow::miscellaneous) returns <em> element with supplied attributes and children", () => {
	render(document.body)(
		Em({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<em id="id">Some text here</em>`)

	document.body.innerHTML = ""
})
