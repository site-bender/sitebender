// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Bdi from "."

test("[Bdi] (constructors::flow::miscellaneous) returns a blank <bdi> element with id", () => {
	render(document.body)(Bdi()())()

	const bdi = document.body.querySelector("bdi")

	expect(bdi?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Bdi] (constructors::flow::miscellaneous) returns <bdi> element with supplied attributes and children", () => {
	render(document.body)(
		Bdi({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<bdi id="id">Some text here</bdi>`)

	document.body.innerHTML = ""
})
