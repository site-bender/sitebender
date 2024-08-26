// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputMonth from "./"

test(`[InputMonth] (constructors::flow::interactive::Input) returns a <input type="month">`, () => {
	render(document.body)(InputMonth())()

	const month = document.body.querySelector("input")

	expect(month?.id).toBeDefined()
	expect(month?.type).toEqual("month")

	document.body.innerHTML = ""
})

test(`[InputMonth] (constructors::flow::interactive::Input) returns <input type="month"> element with supplied attributes`, () => {
	render(document.body)(
		InputMonth({
			autocomplete: AUTOCOMPLETE.birthday,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			max: "9",
			min: "3",
			name: "name",
			readOnly: true,
			required: true,
			step: 1,
			value: "month",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="bday" form="formId" list="list" ` +
			`max="9" min="3" name="name" readonly="" required="" step="1" ` +
			`value="month" type="month">`,
	)

	document.body.innerHTML = ""
})
