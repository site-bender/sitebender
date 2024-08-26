// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import InputRadio from "./"

test(`[InputRadio] (constructors::flow::interactive::Input) returns a <input type="radio">`, () => {
	render(document.body)(InputRadio())()

	const radio = document.body.querySelector("input")

	expect(radio?.id).toBeDefined()
	expect(radio?.type).toEqual("radio")

	document.body.innerHTML = ""
})

test(`[InputRadio] (constructors::flow::interactive::Input) returns <input type="radio"> element with supplied attributes`, () => {
	render(document.body)(
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
