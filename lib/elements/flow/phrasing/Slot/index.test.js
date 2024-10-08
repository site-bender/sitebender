// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Slot from "."

test("[Slot] (constructors::flow::miscellaneous) returns a blank <slot> element with id", () => {
	renderTo(document.body)(Slot()())()

	const slot = document.body.querySelector("slot")

	expect(slot?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Slot] (constructors::flow::miscellaneous) returns <slot> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Slot({
			dataset: {
				name: "Bob",
			},
			datetime: "Right now",
			grizmo: "gribbet",
			id: "id",
			name: "name",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<slot id="id" name="name" data-name="Bob">Some text here</slot>`,
	)

	document.body.innerHTML = ""
})
