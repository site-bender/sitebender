// @vitest-environment jsdom
import { expect, test } from "vitest"

import render from "../../../rendering"
import NumberField from "./"

const numberField = NumberField({
	label: "Age",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "Integer" },
	min: 0,
	name: "age",
	step: 1,
	tabIndex: -1,
	value: 0,
})

test("[NumberField] (components:FormField) returns correct config object", () => {
	expect(numberField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "form-field number-field",
		},
		children: [
			{
				attributes: {
					id: "id-label",
					for: "id",
				},
				children: [
					{
						content: "Age",
						tag: "TextNode",
					},
				],
				tag: "Label",
			},
			{
				attributes: {
					id: "id",
					min: 0,
					name: "age",
					step: 1,
					tabIndex: -1,
					type: "Number",
				},
				dataset: {
					type: "Integer",
				},
				tag: "Input",
			},
			{
				attributes: {
					id: "id-help",
					class: "help-box",
				},
				children: [
					{
						content: "Help!",
						tag: "TextNode",
					},
				],
				tag: "Output",
			},
		],
		tag: "Div",
	})
})

test("[NumberField] (components:FormField) renders properly", () => {
	render(document.body)(numberField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<div id="id-wrapper" class="form-field number-field">` +
			`<label id="id-label" for="id">Age</label>` +
			`<input id="id" tabindex="-1" min="0" name="age" step="1" value="0" type="Number" data-type="Integer">` +
			`<output id="id-help" class="help-box">Help!</output>` +
			`</div>`,
	)
})
