// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import InputFile from "./"

test(`[InputFile] (constructors::flow::interactive::Input) returns a <input type="file">`, () => {
	renderTo(document.body)(InputFile())()

	const file = document.body.querySelector("input")

	expect(file?.id).toBeDefined()
	expect(file?.type).toEqual("file")

	document.body.innerHTML = ""
})

test(`[InputFile] (constructors::flow::interactive::Input) returns <input type="file"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputFile({
			accept: "accept",
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			multiple: true,
			name: "name",
			required: true,
			value: "file",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" accept="accept" form="formId" list="list" ` +
			`multiple="" name="name" required="" value="file" type="file">`,
	)

	document.body.innerHTML = ""
})
