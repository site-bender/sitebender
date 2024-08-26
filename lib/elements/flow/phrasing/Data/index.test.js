// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Data from "."

test("[Data] (constructors::flow::miscellaneous) returns a blank <data> element with id", () => {
	render(document.body)(Data()())()

	const data = document.body.querySelector("data")

	expect(data?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Data] (constructors::flow::miscellaneous) returns <data> element with supplied attributes and children", () => {
	render(document.body)(
		Data({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
			value: "Hi, there!",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<data id="id" value="Hi, there!" data-name="Bob">Some text here</data>`,
	)

	document.body.innerHTML = ""
})
