// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Address from "."

test("[Address] (constructors::flow::miscellaneous) returns a blank <address> element with id", () => {
	render(document.body)(Address()())()

	const address = document.body.querySelector("address")

	expect(address?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Address] (constructors::flow::miscellaneous) returns <address> element with supplied attributes and children", () => {
	render(document.body)(
		Address({
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<address id="id">Some text here</address>`,
	)

	document.body.innerHTML = ""
})
