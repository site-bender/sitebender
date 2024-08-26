// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Sup from "."

test("[Sup] (constructors::flow::miscellaneous) returns a blank <sup> element with id", () => {
	render(document.body)(Sup()())()

	const sup = document.body.querySelector("sup")

	expect(sup?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Sup] (constructors::flow::miscellaneous) returns <sup> element with supplied attributes and children", () => {
	render(document.body)(
		Sup({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<sup id="id">Some text here</sup>`)

	document.body.innerHTML = ""
})
