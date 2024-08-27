// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import DataList from "."

test("[DataList] (constructors::flow::miscellaneous) returns a blank <datalist> element with id", () => {
	renderTo(document.body)(DataList()())()

	const datalist = document.body.querySelector("datalist")

	expect(datalist?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[DataList] (constructors::flow::miscellaneous) returns <datalist> element with supplied attributes and children", () => {
	renderTo(document.body)(
		DataList({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<datalist id="id">Some text here</datalist>`,
	)

	document.body.innerHTML = ""
})
