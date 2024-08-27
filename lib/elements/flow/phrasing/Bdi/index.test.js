// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Bdi from "."

test("[Bdi] (constructors::flow::miscellaneous) returns a blank <bdi> element with id", () => {
	renderTo(document.body)(Bdi()())()

	const bdi = document.body.querySelector("bdi")

	expect(bdi?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Bdi] (constructors::flow::miscellaneous) returns <bdi> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Bdi({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<bdi id="id">Some text here</bdi>`)

	document.body.innerHTML = ""
})
