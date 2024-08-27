// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import H4 from "."

test("[H4] (constructors::flow::heading) returns HeadingElement when supplied a string", () => {
	const content = "This is the heading!"

	renderTo(document.body)(H4()(content))()

	const h4 = document.body.querySelector("h4")

	expect(h4?.id).toBeDefined()
	expect(h4?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[H4] (constructors::flow::heading) returns HeadingElement with supplied children", () => {
	renderTo(document.body)(
		H4({
			id: "id",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h4 id="id">This is the heading!</h4>',
	)

	document.body.innerHTML = ""
})

test("[H4] (constructors::flow::heading) ignores incorrect attributes", () => {
	renderTo(document.body)(
		H4({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h4 id="id" data-gribbet="gribbet">This is the heading!</h4>',
	)

	document.body.innerHTML = ""
})
