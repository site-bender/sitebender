// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import H2 from "."

test("[H2] (constructors::flow::heading) returns HeadingElement when supplied a string", () => {
	const content = "This is the heading!"

	renderTo(document.body)(H2()(content))()

	const h2 = document.body.querySelector("h2")

	expect(h2?.id).toBeDefined()
	expect(h2?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[H2] (constructors::flow::heading) returns HeadingElement with supplied children", () => {
	renderTo(document.body)(
		H2({
			id: "id",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h2 id="id">This is the heading!</h2>',
	)

	document.body.innerHTML = ""
})

test("[H2] (constructors::flow::heading) ignores incorrect attributes", () => {
	renderTo(document.body)(
		H2({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([TextNode("This is the heading!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<h2 id="id" data-gribbet="gribbet">This is the heading!</h2>',
	)

	document.body.innerHTML = ""
})
