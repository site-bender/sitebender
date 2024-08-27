// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../rendering/constants"
import Select from "."
import Option from "./Option"

test("[Select] (constructors::flow::interactive) returns a <select> with text content", () => {
	renderTo(document.body)(Select()())()

	const select = document.body.querySelector("select")

	expect(select?.id).toBeDefined()

	document.body.innerHTML = ""
})

test("[Select] (constructors::flow::interactive) returns <select> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Select({
			autocomplete: AUTOCOMPLETE.birthdayMonth,
			calculation: "",
			dataset: {
				name: "Bob",
			},
			disabled: true,
			display: "display",
			form: "formId",
			format: "",
			grizmo: "gribbet",
			id: "id",
			multiple: true,
			name: "name",
			required: true,
			scripts: "scripts",
			size: 3,
			stylesheets: "stylesheets",
			validation: "validation",
			value: "value",
		})([
			Option()(),
			Option({ value: "#f00" })("Red"),
			Option({ selected: true, value: "#0f0" })("Green"),
			Option({ value: "#00f" })("Blue"),
		]),
	)()

	expect(document.body.innerHTML).toEqual(
		`<select id="id" autocomplete="bday-month" disabled="" form="formId" ` +
			`multiple="" name="name" required="" size="3" value="value" data-name="Bob">` +
			`<option></option>` +
			`<option value="#f00">Red</option>` +
			`<option selected="" value="#0f0">Green</option>` +
			`<option value="#00f">Blue</option>` +
			`</select>`,
	)

	document.body.innerHTML = ""
})
