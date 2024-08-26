// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import Br from "."

test("[Br] (constructors::flow::miscellaneous) returns a blank <br> element with id", () => {
	render(document.body)(Br())()

	const br = document.body.querySelector("br")

	expect(br?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Br] (constructors::flow::miscellaneous) returns <br> element with supplied attributes and children", () => {
	render(document.body)(
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
