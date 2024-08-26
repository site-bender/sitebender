// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import H6 from "."

test("[H6] (constructors::flow::heading) returns HeadingElement when supplied a string", () => {
	const content = "This is the heading!"

	render(document.body)(H6()(content))()

	const h6 = document.body.querySelector("h6")

	expect(h6?.id).toBeDefined()
	expect(h6?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[H6] (constructors::flow::heading) returns HeadingElement with supplied children", () => {
	render(document.body)(
		H6({
			id: "id",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h6 id="id">This is the heading!</h6>',
	)

	document.body.innerHTML = ""
})

test("[H6] (constructors::flow::heading) ignores incorrect attributes", () => {
	render(document.body)(
		H6({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h6 id="id" data-gribbet="gribbet">This is the heading!</h6>',
	)

	document.body.innerHTML = ""
})
