// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import H1 from "."

test("[H1] (constructors::flow::heading) returns HeadingElement when supplied a string", () => {
	const content = "This is the heading!"

	renderTo(document.body)(H1()(content))()

	const h1 = document.body.querySelector("h1")

	expect(h1?.id).toBeDefined()
	expect(h1?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[H1] (constructors::flow::heading) returns HeadingElement with supplied children", () => {
	renderTo(document.body)(
		H1({
			id: "id",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h1 id="id">This is the heading!</h1>',
	)

	document.body.innerHTML = ""
})

test("[H1] (constructors::flow::heading) ignores incorrect attributes", () => {
	renderTo(document.body)(
		H1({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h1 id="id" data-gribbet="gribbet">This is the heading!</h1>',
	)

	document.body.innerHTML = ""
})
