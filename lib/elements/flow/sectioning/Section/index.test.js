// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Section from "."

test("[Section] (constructors::flow::miscellaneous) returns a blank <section> element with id", () => {
	renderTo(document.body)(Section()())()

	const section = document.body.querySelector("section")

	expect(section?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Section] (constructors::flow::miscellaneous) returns <section> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Section({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<section id="id" data-name="Bob">Some text here</section>`,
	)

	document.body.innerHTML = ""
})
