// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Dialog from "."

test("[Dialog] (constructors::flow::miscellaneous) returns a blank <dialog> element with id", () => {
	render(document.body)(Dialog()())()

	const dialog = document.body.querySelector("dialog")

	expect(dialog?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Dialog] (constructors::flow::miscellaneous) returns <dialog> element with supplied attributes and children", () => {
	render(document.body)(
		Dialog({
			open: true,
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Some text here")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<dialog id="id" open="">Some text here</dialog>`,
	)

	document.body.innerHTML = ""
})
