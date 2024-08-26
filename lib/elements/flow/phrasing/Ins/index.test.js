// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Ins from "."

test("[Ins] (constructors::flow::miscellaneous) returns a blank <ins> element with id", () => {
	render(document.body)(Ins()())()

	const ins = document.body.querySelector("ins")

	expect(ins?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Ins] (constructors::flow::miscellaneous) returns <ins> element with supplied attributes and children", () => {
	render(document.body)(
		Ins({
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
		`<ins id="id" cite="cite" datetime="Right now" data-name="Bob">Some text here</ins>`,
	)

	document.body.innerHTML = ""
})
