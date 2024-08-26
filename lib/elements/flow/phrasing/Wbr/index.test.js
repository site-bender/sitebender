// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import Wbr from "."

test("[Wbr] (constructors::flow::miscellaneous) returns a blank <wbr> element with id", () => {
	render(document.body)(Wbr())()

	const wbr = document.body.querySelector("wbr")

	expect(wbr?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Wbr] (constructors::flow::miscellaneous) returns <wbr> element with supplied attributes and children", () => {
	render(document.body)(
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
