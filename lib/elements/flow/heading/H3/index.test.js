// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import H3 from "."

test("[H3] (constructors::flow::heading) returns HeadingElement when supplied a string", () => {
	const content = "This is the heading!"

	render(document.body)(H3()(content))()

	const h3 = document.body.querySelector("h3")

	expect(h3?.id).toBeDefined()
	expect(h3?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[H3] (constructors::flow::heading) returns HeadingElement with supplied children", () => {
	render(document.body)(
		H3({
			id: "id",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h3 id="id">This is the heading!</h3>',
	)

	document.body.innerHTML = ""
})

test("[H3] (constructors::flow::heading) ignores incorrect attributes", () => {
	render(document.body)(
		H3({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h3 id="id" data-gribbet="gribbet">This is the heading!</h3>',
	)

	document.body.innerHTML = ""
})
