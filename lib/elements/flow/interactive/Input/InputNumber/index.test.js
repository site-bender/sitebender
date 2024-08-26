// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputNumber from "./"

test(`[InputNumber] (constructors::flow::interactive::Input) returns a <input type="number">`, () => {
	render(document.body)(InputNumber())()

	const number = document.body.querySelector("input")

	expect(number?.id).toBeDefined()
	expect(number?.type).toEqual("number")
	expect(number?.getAttribute("step")).toEqual("any")

	document.body.innerHTML = ""
})

test(`[InputNumber] (constructors::flow::interactive::Input) returns <input type="number"> element with supplied attributes`, () => {
	render(document.body)(
		InputNumber({
			autocomplete: AUTOCOMPLETE.creditCardSecurityCode,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			max: 100,
			min: 0,
			name: "name",
			placeholder: "placeholder",
			readOnly: true,
			required: true,
			step: 1,
			value: "number",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="cc-csc" form="formId" list="list" ` +
			`max="100" min="0" name="name" placeholder="placeholder" ` +
			`readonly="" required="" step="1" value="number" inputmode="numeric" type="number">`,
	)

	document.body.innerHTML = ""
})
