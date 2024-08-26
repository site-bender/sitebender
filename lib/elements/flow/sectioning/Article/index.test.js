// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Article from "."

test("[Article] (constructors::flow::miscellaneous) returns a blank <article> element with id", () => {
	render(document.body)(Article()())()

	const article = document.body.querySelector("article")

	expect(article?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Article] (constructors::flow::miscellaneous) returns <article> element with supplied attributes and children", () => {
	render(document.body)(
		Article({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<article id="id" data-name="Bob">Some text here</article>`,
	)

	document.body.innerHTML = ""
})
