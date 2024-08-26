// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import TextNode from "../../../TextNode"
import Output from "./"

test("[Output] (elements::flow::forms) returns a <output> element", () => {
	render(document.body)(Output()())()

	const h1 = document.body.querySelector("output")

	expect(h1?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Output] (elements::flow::forms) returns a <output> with supplied children", () => {
	render(document.body)(
		Output({
			for: "for",
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			name: "name",
		})([TextNode("This is the output!")]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<output id="id" for="for" form="formId" name="name">This is the output!</output>`,
	)

	document.body.innerHTML = ""
})