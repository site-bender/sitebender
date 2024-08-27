// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import InputRadio from "./"

test(`[InputRadio] (constructors::flow::interactive::Input) returns a <input type="radio">`, () => {
	renderTo(document.body)(InputRadio())()

	const radio = document.body.querySelector("input")

	expect(radio?.id).toBeDefined()
	expect(radio?.type).toEqual("radio")

	document.body.innerHTML = ""
})

test(`[InputRadio] (constructors::flow::interactive::Input) returns <input type="radio"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputRadio({
			checked: true,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			name: "name",
			required: true,
			value: "radio",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" checked="" form="formId" name="name" required="" value="radio" type="radio">`,
	)

	document.body.innerHTML = ""
})
