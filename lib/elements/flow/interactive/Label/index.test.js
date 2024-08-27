// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Label from "."

test("[Label] (constructors::flow::interactive) returns a <label> with text content", () => {
	const content = "Checking the content!"

	renderTo(document.body)(Label()(content))()

	const label = document.body.querySelector("label")

	expect(label?.id).toBeDefined()
	expect(label?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[Label] (constructors::flow::interactive) returns <label> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Label({
			for: "for",
			form: "formId",
			grizmo: "gribbet",
			id: "id",
		})([TextNode("Label me")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<label id="id" for="for" form="formId">Label me</label>`,
	)

	document.body.innerHTML = ""
})
