// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Q from "."

test("[Q] (constructors::flow::miscellaneous) returns a blank <q> element with id", () => {
	render(document.body)(Q()())()

	const q = document.body.querySelector("q")

	expect(q?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Q] (constructors::flow::miscellaneous) returns <q> element with supplied attributes and children", () => {
	render(document.body)(
		Q({
			cite: "cite",
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<q id="id" cite="cite" data-name="Bob">Some text here</q>`,
	)

	document.body.innerHTML = ""
})
