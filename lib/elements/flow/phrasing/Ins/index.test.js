// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Ins from "."

test("[Ins] (constructors::flow::miscellaneous) returns a blank <ins> element with id", () => {
	renderTo(document.body)(Ins()())()

	const ins = document.body.querySelector("ins")

	expect(ins?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Ins] (constructors::flow::miscellaneous) returns <ins> element with supplied attributes and children", () => {
	renderTo(document.body)(
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
