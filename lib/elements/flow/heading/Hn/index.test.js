// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Hn from "."

test("[Hn] (constructors::flow::heading) returns HeadingElement when supplied a string", () => {
	const content = "This is the heading!"

	renderTo(document.body)(Hn()(content))({
		level: 3,
	})

	const h3 = document.body.querySelector("h3")

	expect(h3?.id).toBeDefined()
	expect(h3?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[Hn] (constructors::flow::heading) returns HeadingElement with supplied children", () => {
	renderTo(document.body)(
		Hn({
			id: "id",
		})([TextNode("This is the heading!")]),
	)({
		level: 1,
	})

	expect(document.body.innerHTML).toEqual(
		'<h1 id="id">This is the heading!</h1>',
	)

	document.body.innerHTML = ""
})

test("[Hn] (constructors::flow::heading) ignores incorrect attributes", () => {
	renderTo(document.body)(
		Hn({
			dataset: {
				gribbet: "gribbet",
			},
			id: "id",
			grizmo: "grizmo",
		})([TextNode("This is the heading!")]),
	)({
		level: 1,
	})

	expect(document.body.innerHTML).toEqual(
		'<h1 id="id" data-gribbet="gribbet">This is the heading!</h1>',
	)

	document.body.innerHTML = ""
})
