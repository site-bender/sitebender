// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import DataList from "."

test("[DataList] (constructors::flow::miscellaneous) returns a blank <datalist> element with id", () => {
	render(document.body)(DataList()())()

	const datalist = document.body.querySelector("datalist")

	expect(datalist?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[DataList] (constructors::flow::miscellaneous) returns <datalist> element with supplied attributes and children", () => {
	render(document.body)(
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
