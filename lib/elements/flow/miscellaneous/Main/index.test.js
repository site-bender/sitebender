// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Main from "."

test("[Main] (constructors::flow::miscellaneous) returns a blank <main> element with id", () => {
	render(document.body)(Main()())()

	const main = document.body.querySelector("main")

	expect(main?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Main] (constructors::flow::miscellaneous) returns <main> element with supplied attributes and children", () => {
	render(document.body)(
		Main({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(`<main id="id">Some text here</main>`)

	document.body.innerHTML = ""
})
