// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../rendering"
import { AUTOCOMPLETE, WRAP } from "../../../../rendering/constants"
import TextArea from "."

test("[TextArea] (constructors::flow::interactive) returns a <textarea> with content", () => {
	const content = "The content!"

	render(document.body)(TextArea()(content))()

	const textarea = document.body.querySelector("textarea")

	expect(textarea?.id).toBeDefined()
	expect(textarea?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[TextArea] (constructors::flow::interactive) returns a <textarea> element with attributes", () => {
	render(document.body)(
		TextArea({
			grizmo: "gribbet",
			id: "id",
			autocomplete: AUTOCOMPLETE.organization,
			cols: 50,
			dirname: "dirname",
			disabled: true,
			form: "formId",
			maxLength: 5000,
			minLength: 0,
			name: "name",
			placeholder: "placeholder",
			readOnly: true,
			required: true,
			rows: 6,
			wrap: WRAP.soft,
			calculation: "",
			dataset: { name: "Bob" },
			display: "",
			format: "",
			scripts: "scripts",
			stylesheets: "stylesheets",
			validation: "",
		})(),
	)()

	expect(document.body.innerHTML).toEqual(
		`<textarea id="id" autocomplete="organization" cols="50" dirname="dirname" ` +
			`disabled="" form="formId" maxlength="5000" minlength="0" name="name" ` +
			`placeholder="placeholder" readonly="" required="" rows="6" wrap="soft" ` +
			`data-name="Bob"></textarea>`,
	)

	document.body.innerHTML = ""
})
