// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import Hr from "."

test("[Hr] (constructors::flow::miscellaneous) returns a blank <hr> element with id", () => {
	renderTo(document.body)(Hr())()

	const hr = document.body.querySelector("hr")

	expect(hr?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Hr] (constructors::flow::miscellaneous) returns <hr> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Hr({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		}),
	)()

	expect(document.body.innerHTML).toEqual(`<hr id="id" data-name="Bob">`)

	document.body.innerHTML = ""
})
