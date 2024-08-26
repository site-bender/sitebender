// @vitest-environment jsdom
import { expect, test } from "vitest"

import render from "../../../rendering"
import CheckboxField from "."

const checkboxField = CheckboxField({
	label: "Is it true?",
	help: "Help!",
})({
	id: "id",
	dataset: { type: "Boolean" },
	name: "isItTrue",
	tabIndex: -1,
	value: "yes",
})

test("[CheckboxField] (components::FormField) returns correct config object", () => {
	expect(checkboxField).toMatchObject({
		attributes: {
			id: "id-wrapper",
			class: "form-field checkbox-field",
		},
		children: [
			{
				attributes: {
					id: "id-label",
					for: "id",
				},
				children: [
					{
						content: "Is it true?",
						tag: "TextNode",
					},
				],
				tag: "Label",
			},
			{
				attributes: {
					id: "id",
					name: "isItTrue",
					tabIndex: -1,
					type: "checkbox",
					value: "yes",
				},
				dataset: {
					type: "Boolean",
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

test("[CheckboxField] (components::FormField) renders properly", () => {
	render(document.body)(checkboxField)()

	expect(document.body.innerHTML).toStrictEqual(
		`<div id="id-wrapper" class="form-field checkbox-field">` +
			`<label id="id-label" for="id">Is it true?</label>` +
			`<input id="id" tabindex="-1" name="isItTrue" value="yes" type="checkbox" data-type="Boolean">` +
			`<output id="id-help" class="help-box">Help!</output>` +
			`</div>`,
	)
})
