// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import H5 from "."

test("[H5] (constructors::flow::heading) returns HeadingElement when supplied a string", () => {
	const content = "This is the heading!"

	render(document.body)(H5()(content))()

	const h5 = document.body.querySelector("h5")

	expect(h5?.id).toBeDefined()
	expect(h5?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[H5] (constructors::flow::heading) returns HeadingElement with supplied children", () => {
	render(document.body)(
		H5({
			id: "id",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h5 id="id">This is the heading!</h5>',
	)

	document.body.innerHTML = ""
})

test("[H5] (constructors::flow::heading) ignores incorrect attributes", () => {
	render(document.body)(
		H5({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h5 id="id" data-gribbet="gribbet">This is the heading!</h5>',
	)

	document.body.innerHTML = ""
})
