// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import TextNode from "../../../TextNode"
import Fieldset from "./"
import Legend from "./Legend"

test("[Fieldset] (elements::flow::forms) returns a <fieldset> element", () => {
	renderTo(document.body)(Fieldset()())()

	const h1 = document.body.querySelector("fieldset")

	expect(h1?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Fieldset] (elements::flow::forms) returns a <fieldset> with supplied children", () => {
	renderTo(document.body)(
		Fieldset({
			disabled: true,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			name: "name",
		})([Legend({ id: "legend" })(TextNode("This is the legend!"))]),
	)()

	expect(document.body.innerHTML).toEqual(
		'<fieldset id="id" disabled="" form="formId" name="name"><legend id="legend">This is the legend!</legend></fieldset>',
	)

	document.body.innerHTML = ""
})
