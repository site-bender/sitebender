// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Del from "."

test("[Del] (constructors::flow::miscellaneous) returns a blank <del> element with id", () => {
	render(document.body)(Del()())()

	const del = document.body.querySelector("del")

	expect(del?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Del] (constructors::flow::miscellaneous) returns <del> element with supplied attributes and children", () => {
	render(document.body)(
		Del({
			cite: "cite",
			dataset: {
				name: "Bob",
			},
			datetime: "Right now",
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<del id="id" cite="cite" datetime="Right now" data-name="Bob">Some text here</del>`,
	)

	document.body.innerHTML = ""
})