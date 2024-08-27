// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import Title from "."

const content = "This is the title!"

test("[Title] (constructors::flow::metadata) returns empty <title>, ignores non-text content", () => {
	renderTo(document.body)(Title()(666))()

	const title = document.body.querySelector("title")

	expect(title?.id).toBeDefined()
	expect(title.innerHTML).toEqual("")

	document.body.innerHTML = ""
})

test("[Title] (constructors::flow::metadata) returns <title> with supplied children", () => {
	renderTo(document.body)(
		Title({
			dataset: {
				name: "Bob",
			},
			id: "id",
			grizmo: "grizmo",
		})(content),
	)()

	expect(document.body.innerHTML).toEqual(
		'<title id="id" data-name="Bob">This is the title!</title>',
	)

	document.body.innerHTML = ""
})
