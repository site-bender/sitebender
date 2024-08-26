// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputColor from "./"

test(`[InputColor] (constructors::flow::interactive::Input) returns a <input type="color">`, () => {
	render(document.body)(InputColor())()

	const color = document.body.querySelector("input")

	expect(color?.id).toBeDefined()
	expect(color?.type).toEqual("color")

	document.body.innerHTML = ""
})

test(`[InputColor] (constructors::flow::interactive::Input) returns <input type="color"> element with supplied attributes`, () => {
	render(document.body)(
		InputColor({
			autocomplete: AUTOCOMPLETE.postalCode,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			name: "name",
			value: "color",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="postal-code" form="formId" ` +
			`list="list" name="name" value="color" type="color">`,
	)

	document.body.innerHTML = ""
})
