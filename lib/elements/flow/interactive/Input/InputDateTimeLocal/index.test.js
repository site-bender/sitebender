// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputDateTimeLocal from "./"

test(`[InputDateTimeLocal] (constructors::flow::interactive::Input) returns a <input type="datetime-local">`, () => {
	renderTo(document.body)(InputDateTimeLocal())()

	const dateTimeLocal = document.body.querySelector("input")

	expect(dateTimeLocal?.id).toBeDefined()
	expect(dateTimeLocal?.type).toEqual("datetime-local")

	document.body.innerHTML = ""
})

test(`[InputDateTimeLocal] (constructors::flow::interactive::Input) returns <input type="datetime-local"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputDateTimeLocal({
			autocomplete: AUTOCOMPLETE.birthday,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			max: "2100-12-31T23:59:59",
			min: "2001-01-01T00:00:00",
			name: "name",
			readOnly: true,
			required: true,
			step: 1,
			value: "datetime-local",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="bday" form="formId" list="list" max="2100-12-31T23:59:59" ` +
			`min="2001-01-01T00:00:00" name="name" readonly="" required="" step="1" ` +
			`value="datetime-local" type="datetime-local">`,
	)

	document.body.innerHTML = ""
})
