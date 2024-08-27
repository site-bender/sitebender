// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import Wbr from "."

test("[Wbr] (constructors::flow::miscellaneous) returns a blank <wbr> element with id", () => {
	renderTo(document.body)(Wbr())()

	const wbr = document.body.querySelector("wbr")

	expect(wbr?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Wbr] (constructors::flow::miscellaneous) returns <wbr> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Wbr({
			dataset: {
				name: "Bob",
			},
			grizmo: "gribbet",
			id: "id",
		}),
	)()

	expect(document.body.innerHTML).toEqual(`<wbr id="id" data-name="Bob">`)

	document.body.innerHTML = ""
})
