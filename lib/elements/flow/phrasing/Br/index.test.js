// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import Br from "."

test("[Br] (constructors::flow::miscellaneous) returns a blank <br> element with id", () => {
	renderTo(document.body)(Br())()

	const br = document.body.querySelector("br")

	expect(br?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Br] (constructors::flow::miscellaneous) returns <br> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Br({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		}),
	)()

	expect(document.body.innerHTML).toEqual(`<br id="id" data-name="Bob">`)

	document.body.innerHTML = ""
})
